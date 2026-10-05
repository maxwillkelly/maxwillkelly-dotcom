import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { planRelease } from "./prepare-linear-release.mjs";

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
  return {
    cwd,
    runGit,
    commit,
    options: { initialSha, initialVersion: "0.1.0", runGit },
  };
}

test("first release supplies the existing Linear baseline to the versioning action", (t) => {
  const { commit, options } = fixture(t);
  commit("New change");
  const plan = planRelease(options);
  assert.equal(plan.base, options.initialSha);
  assert.equal(plan.previous_version, "0.1.0");
  assert.equal(plan.version, "");
  assert.equal(plan.publish, true);
});

test("baseline uses Git version ordering and ignores unrelated tags", (t) => {
  const { runGit, commit, options } = fixture(t);
  runGit("tag", "production/v0.1.9");
  const base = commit("Next release");
  runGit("tag", "production/v0.1.10");
  runGit("tag", "v99.0.0");
  commit("Next change");
  const plan = planRelease(options);
  assert.equal(plan.base, base);
  assert.equal(plan.previous_version, "0.1.10");
});

test("duplicate promotions skip publishing and retain the original baseline", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Released change");
  runGit("tag", "production/v0.1.1");
  const plan = planRelease(options);
  assert.equal(plan.publish, false);
  assert.equal(plan.version, "0.1.1");
  assert.equal(plan.base, options.initialSha);
});

test("no changes do not request a release", (t) => {
  const { options } = fixture(t);
  assert.equal(planRelease(options).publish, false);
});

test("reserved version can be retried only for the same commit", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Pending release");
  runGit("tag", "production-reserved/v0.1.1");
  const plan = planRelease(options);
  assert.equal(plan.version, "0.1.1");
  assert.equal(plan.reserve, false);
  assert.equal(plan.publish, true);
  commit("Later promotion");
  assert.throws(() => planRelease(options), /earlier release is unfinished/);
});

test("completing a reserved release unblocks the next promotion", (t) => {
  const { runGit, commit, options } = fixture(t);
  commit("Release");
  runGit("tag", "production-reserved/v0.1.1");
  runGit("tag", "production/v0.1.1");
  commit("Next release");
  const plan = planRelease(options);
  assert.equal(plan.version, "");
  assert.equal(plan.previous_version, "0.1.1");
  assert.equal(plan.reserve, true);
});

test("missing or divergent baselines fail instead of omitting changes", (t) => {
  const { runGit, commit, options } = fixture(t);
  assert.throws(() => planRelease({ ...options, initialSha: "missing" }));
  runGit("checkout", "--orphan", "other");
  commit("Unrelated history");
  assert.throws(() => planRelease(options));
});

test("untagged rollback cannot advance the release baseline", (t) => {
  const { runGit, commit, options } = fixture(t);
  const rollback = commit("Intermediate commit");
  commit("Released commit");
  runGit("tag", "production/v0.1.1");
  runGit("checkout", rollback);
  assert.throws(() => planRelease(options));
});

test("prepare command is read-only and leaves version calculation to the action", (t) => {
  const { cwd, runGit, commit, options } = fixture(t);
  commit("Direct change");
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify({ version: "0.1.0" }),
  );
  const output = join(cwd, "output");
  execFileSync(
    process.execPath,
    [new URL("./prepare-linear-release.mjs", import.meta.url).pathname],
    {
      cwd,
      env: {
        ...process.env,
        LINEAR_RELEASE_INITIAL_SHA: options.initialSha,
        GITHUB_OUTPUT: output,
        GITHUB_STEP_SUMMARY: join(cwd, "summary"),
      },
    },
  );
  assert.equal(runGit("tag", "--list"), "");
  assert.match(readFileSync(output, "utf8"), /previous_version=0\.1\.0\n/);
  assert.match(readFileSync(output, "utf8"), /version=\n/);
  assert.match(readFileSync(output, "utf8"), /publish=true\n/);
});
