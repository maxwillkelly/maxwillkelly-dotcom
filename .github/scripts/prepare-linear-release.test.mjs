import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { planRelease, releaseNotes } from "./prepare-linear-release.mjs";

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), "linear-release-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const runGit = (...args) =>
    execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  runGit("init", "-b", "main");
  runGit("config", "user.email", "test@example.com");
  runGit("config", "user.name", "Release test");
  function commit(subject) {
    runGit("commit", "--allow-empty", "-m", subject);
    return runGit("rev-parse", "HEAD");
  }
  const initialSha = commit("Already shipped");
  const options = { initialSha, initialVersion: "0.1.0", runGit };
  return { cwd, runGit, commit, options };
}

test("first release includes every commit since the existing Linear baseline", (t) => {
  const { commit, options } = fixture(t);
  const first = commit("MAX-164: Add release notes (#31)");
  const second = commit("Direct push without an issue");
  const plan = planRelease(options);
  assert.equal(plan.version, "0.1.1");
  assert.equal(plan.tag, "production/v0.1.1");
  assert.equal(plan.alreadyReleased, false);
  assert.deepEqual(
    plan.commits.map((c) => c.sha),
    [first, second],
  );
});

test("subsequent release increments the patch and excludes shipped commits", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Previous release");
  runGit("tag", "production/v0.1.9");
  const base = runGit("rev-parse", "HEAD");
  const sha = commit("Next change");
  const plan = planRelease(options);
  assert.equal(plan.version, "0.1.10");
  assert.equal(plan.base, base);
  assert.deepEqual(
    plan.commits.map((c) => c.sha),
    [sha],
  );
});

test("retries before recording a successful release keep the same version", (t) => {
  const { commit, options } = fixture(t);
  commit("New change");
  assert.deepEqual(planRelease(options), planRelease(options));
});

test("duplicate promotions reuse version and original notes range", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("New change");
  const before = planRelease(options);
  runGit("tag", before.tag);
  const after = planRelease(options);
  assert.equal(after.alreadyReleased, true);
  assert.equal(after.version, before.version);
  assert.equal(after.base, before.base);
  assert.deepEqual(after.commits, before.commits);
});

test("no changes do not request a new release", (t) => {
  const { options } = fixture(t);
  assert.equal(planRelease(options).hasChanges, false);
});

test("a reserved version can be retried only for the same commit", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Pending release");
  const first = planRelease(options);
  runGit("tag", first.reservationTag);
  const retry = planRelease(options);
  assert.equal(retry.version, first.version);
  assert.equal(retry.needsReservation, false);
  assert.deepEqual(retry.commits, first.commits);
  commit("Later promotion");
  assert.throws(() => planRelease(options), /earlier release is unfinished/);
});

test("completing a reserved version permits the next increment", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Pending release");
  const first = planRelease(options);
  runGit("tag", first.reservationTag);
  runGit("tag", first.tag);
  commit("Next release");
  assert.equal(planRelease(options).version, "0.1.2");
  assert.equal(planRelease(options).needsReservation, true);
});

test("unrelated tags do not affect production versions", (t) => {
  const { runGit, commit, options } = fixture(t);
  runGit("tag", "v99.0.0");
  commit("New change");
  assert.equal(planRelease(options).version, "0.1.1");
});

test("missing and divergent baselines fail instead of losing commits", (t) => {
  const { runGit, commit, options } = fixture(t);
  assert.throws(() => planRelease({ ...options, initialSha: "missing" }));
  runGit("checkout", "--orphan", "other");
  commit("Unrelated history");
  assert.throws(() => planRelease(options));
});

test("an untagged rollback cannot advance the release baseline", (t) => {
  const { runGit, commit, options } = fixture(t);
  const rollback = commit("Intermediate commit");
  commit("Released commit");
  runGit("tag", "production/v0.1.1");
  runGit("checkout", rollback);
  assert.throws(() => planRelease(options));
});

test("notes deduplicate merged PRs, exclude open/other branch PRs, and include direct commits", () => {
  const plan = {
    version: "0.1.1",
    base: "a".repeat(40),
    head: "b".repeat(40),
    commits: [{ sha: "b".repeat(40), subject: "Direct *change* <script>" }],
  };
  const pr = {
    number: 31,
    title: "Fix [contact]",
    merged_at: "2026-10-04",
    base: { ref: "main" },
  };
  const notes = releaseNotes(plan, "maxwillkelly/maxwillkelly-dotcom", [
    pr,
    pr,
    { ...pr, number: 32, merged_at: null },
    { ...pr, number: 33, base: { ref: "feature" } },
  ]);
  assert.equal(notes.match(/\/pull\/31/g).length, 1);
  assert.doesNotMatch(notes, /\/pull\/(32|33)/);
  assert.match(notes, /Direct \\\*change\\\* &lt;script&gt;/);
  assert.match(notes, /Fix \\\[contact\\\]/);
  assert.match(notes, /\/commit\/bbbb/);
});

test("prepare command creates preview artifacts and never records a tag", (t) => {
  const { cwd, runGit, commit, options } = fixture(t);
  commit("Direct change");
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify({ version: "0.1.0" }),
  );
  // A local gh stub supplies two API pages without network access or credentials.
  const bin = join(cwd, "gh");
  writeFileSync(bin, '#!/bin/sh\nprintf "[[],[]]"\n', { mode: 0o755 });
  const output = join(cwd, "output");
  execFileSync(
    process.execPath,
    [new URL("./prepare-linear-release.mjs", import.meta.url).pathname],
    {
      cwd,
      env: {
        ...process.env,
        PATH: `${cwd}:${process.env.PATH}`,
        GITHUB_REPOSITORY: "owner/repo",
        LINEAR_RELEASE_INITIAL_SHA: options.initialSha,
        GITHUB_OUTPUT: output,
        GITHUB_STEP_SUMMARY: join(cwd, "summary"),
      },
    },
  );
  assert.equal(runGit("tag", "--list"), "");
  assert.match(readFileSync(output, "utf8"), /version=v0\.1\.1\n/);
  assert.match(readFileSync(output, "utf8"), /publish=true\n/);
  assert.match(readFileSync(output, "utf8"), /reserve=true\n/);
  assert.equal(
    runGit("status", "--porcelain").includes("linear-release-notes.md"),
    true,
  );
});
