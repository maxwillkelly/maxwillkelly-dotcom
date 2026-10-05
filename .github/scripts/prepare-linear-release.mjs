import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const tagPrefix = "production/v";
const reservationPrefix = "production-reserved/v";

export function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function readTags(prefix, runGit) {
  return runGit("tag", "--list", `${prefix}*`, "--sort=-version:refname")
    .split("\n")
    .filter(Boolean)
    .map((tag) => ({
      version: tag.slice(prefix.length),
      sha: runGit("rev-parse", `${tag}^{commit}`),
    }));
}

function pendingReservation(tags, head, runGit) {
  const pending = readTags(reservationPrefix, runGit).filter(
    (reserved) =>
      !tags.some(
        (tag) => tag.version === reserved.version && tag.sha === reserved.sha,
      ),
  );
  if (pending.length > 1 || pending.some((tag) => tag.sha !== head)) {
    throw new Error(
      "An earlier release is unfinished. Rerun its promotion workflow before releasing another commit.",
    );
  }
  return pending[0];
}

function previousRelease(tags, head, fallback) {
  const index = tags.findIndex((tag) => tag.sha === head);
  const previous = index >= 0 ? tags[index + 1] : tags[0];
  return previous ?? fallback;
}

function recoveredVersion(existing, pending) {
  if (existing) return existing.version;
  if (pending) return pending.version;
  return "";
}

export function planRelease({ initialSha, initialVersion, runGit = git }) {
  const head = runGit("rev-parse", "HEAD");
  const tags = readTags(tagPrefix, runGit);
  const pending = pendingReservation(tags, head, runGit);
  const previous = previousRelease(tags, head, {
    sha: initialSha,
    version: initialVersion,
  });
  const existing = tags.find((tag) => tag.sha === head);
  runGit("merge-base", "--is-ancestor", previous.sha, head);
  const hasChanges =
    Number(runGit("rev-list", "--count", `${previous.sha}..${head}`)) > 0;
  return {
    sha: head,
    base: previous.sha,
    previous_version: previous.version,
    version: recoveredVersion(existing, pending),
    publish: hasChanges && !existing,
    reserve: !pending,
  };
}

function main() {
  const initialSha = process.env.LINEAR_RELEASE_INITIAL_SHA;
  if (!initialSha) throw new Error("LINEAR_RELEASE_INITIAL_SHA is required");
  const initialVersion = JSON.parse(
    readFileSync("package.json", "utf8"),
  ).version;
  const plan = planRelease({ initialSha, initialVersion });
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    Object.entries(plan)
      .map(([key, value]) => `${key}=${value}\n`)
      .join(""),
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
