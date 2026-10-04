import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const tagPrefix = "production/v";
const reservationPrefix = "production-reserved/v";

export function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function parseVersion(version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`Invalid release version: ${version}`);
  }
  return version.split(".").map(Number);
}

function compareVersions(left, right) {
  const parts = parseVersion(left.version);
  const other = parseVersion(right.version);
  return parts[0] - other[0] || parts[1] - other[1] || parts[2] - other[2];
}

function readTags(prefix, runGit) {
  return runGit("tag", "--list", `${prefix}*`)
    .split("\n")
    .filter(Boolean)
    .map((tag) => ({
      tag,
      version: tag.slice(prefix.length),
      sha: runGit("rev-parse", `${tag}^{commit}`),
    }))
    .sort(compareVersions);
}

function pendingReservations(tags, head, runGit) {
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
  return pending;
}

function previousRelease(tags, head, fallback) {
  const index = tags.findIndex((tag) => tag.sha === head);
  const previous = index >= 0 ? tags[index - 1] : tags.at(-1);
  return previous ?? fallback;
}

function nextVersion(version) {
  const [major, minor, patch] = parseVersion(version);
  return `${major}.${minor}.${patch + 1}`;
}

function checkReservedVersion(pending, version) {
  if (pending.length > 0 && pending[0].version !== version) {
    throw new Error(
      "Reserved release version does not match the next production version.",
    );
  }
}

function commitsSince(base, head, runGit) {
  // Fail on missing or divergent history instead of silently omitting changes.
  runGit("merge-base", "--is-ancestor", base, head);
  const log = runGit(
    "log",
    "--reverse",
    "--format=%H%x00%s",
    `${base}..${head}`,
  );
  return log
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [sha, subject] = line.split("\0");
      return { sha, subject };
    });
}

export function planRelease({ initialSha, initialVersion, runGit = git }) {
  const head = runGit("rev-parse", "HEAD");
  const tags = readTags(tagPrefix, runGit);
  const pending = pendingReservations(tags, head, runGit);
  const previous = previousRelease(tags, head, {
    sha: initialSha,
    version: initialVersion,
  });
  const existing = tags.find((tag) => tag.sha === head);
  const version = existing?.version ?? nextVersion(previous.version);
  checkReservedVersion(pending, version);
  const commits = commitsSince(previous.sha, head, runGit);
  return {
    head,
    base: previous.sha,
    version,
    tag: `${tagPrefix}${version}`,
    reservationTag: `${reservationPrefix}${version}`,
    needsReservation: pending.length === 0,
    alreadyReleased: Boolean(existing),
    hasChanges: commits.length > 0,
    commits,
  };
}

function escapeMarkdown(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(/[\\`*_{}[\]()#!|]/g, "\\$&");
}

export function releaseNotes(plan, repository, pullRequests) {
  const url = `https://github.com/${repository}`;
  const prs = [
    ...new Map(
      pullRequests
        .filter((pr) => pr.merged_at && pr.base.ref === "main")
        .map((pr) => [pr.number, pr]),
    ).values(),
  ];
  return [
    `# Release v${plan.version}`,
    "",
    `[Compare changes](${url}/compare/${plan.base}...${plan.head})`,
    "",
    "## Merged pull requests",
    "",
    ...prs.map(
      (pr) =>
        `- ${escapeMarkdown(pr.title)} ([#${pr.number}](${url}/pull/${pr.number}))`,
    ),
    ...(prs.length === 0 ? ["No merged pull requests in this release."] : []),
    "",
    "## Commits",
    "",
    ...plan.commits.map(
      ({ sha, subject }) =>
        `- ${escapeMarkdown(subject)} ([${sha.slice(0, 7)}](${url}/commit/${sha}))`,
    ),
    "",
  ].join("\n");
}

function associatedPullRequests(repository, sha) {
  const pages = execFileSync(
    "gh",
    [
      "api",
      "--paginate",
      "--slurp",
      `repos/${repository}/commits/${sha}/pulls?per_page=100`,
    ],
    { encoding: "utf8" },
  );
  return JSON.parse(pages).flat();
}

function configuration() {
  const repository = process.env.GITHUB_REPOSITORY;
  const initialSha = process.env.LINEAR_RELEASE_INITIAL_SHA;
  if (!repository || !initialSha) {
    throw new Error(
      "GITHUB_REPOSITORY and LINEAR_RELEASE_INITIAL_SHA are required",
    );
  }
  return { repository, initialSha };
}

function workflowOutputs(plan) {
  const publish = plan.hasChanges && !plan.alreadyReleased;
  return {
    version: `v${plan.version}`,
    tag: plan.tag,
    reservation_tag: plan.reservationTag,
    reserve: publish && plan.needsReservation,
    sha: plan.head,
    base: plan.base,
    publish,
  };
}

function main() {
  const { repository, initialSha } = configuration();
  const initialVersion = JSON.parse(
    readFileSync("package.json", "utf8"),
  ).version;
  const plan = planRelease({ initialSha, initialVersion });
  const pullRequests = plan.commits.flatMap(({ sha }) =>
    associatedPullRequests(repository, sha),
  );
  const notes = releaseNotes(plan, repository, pullRequests);
  writeFileSync("linear-release-notes.md", notes);
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, notes);
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    Object.entries(workflowOutputs(plan))
      .map(([key, value]) => `${key}=${value}\n`)
      .join(""),
  );
  console.log(
    `Release v${plan.version}: ${plan.commits.length} commits; already released: ${plan.alreadyReleased}`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
