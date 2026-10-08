import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";

import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import {
  contactMetadataSchema,
  heroMetadataSchema,
  timelineDate,
  timelineMetadataSchema,
  timelineSectionSchema,
} from "../src/schemas/content.ts";

// Use the same compiler shipped with the site's MDX loader.
const require = createRequire(import.meta.url);
const loaderRequire = createRequire(require.resolve("@mdx-js/loader"));
const { evaluate } = await import(loaderRequire.resolve("@mdx-js/mdx"));
const contentRoot = new URL("../src/content/", import.meta.url);

const load = async (file) =>
  evaluate(
    { path: file, value: await readFile(new URL(file, contentRoot), "utf8") },
    {
      ...runtime,
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    },
  );

async function markdownFiles(directory) {
  const entries = await readdir(new URL(directory, contentRoot), {
    withFileTypes: true,
  });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? markdownFiles(join(directory, entry.name) + "/")
        : [join(directory, entry.name)],
    ),
  );
  return files.flat().filter((file) => file.endsWith(".md"));
}

test("all Markdown compiles and renders without leaking frontmatter", async () => {
  for (const file of await markdownFiles("")) {
    const { default: Content } = await load(file);
    const html = renderToStaticMarkup(runtime.jsx(Content, {}));
    assert.ok(html.includes("<p>") || html.includes("<h1>"), file);
    assert.ok(!html.includes("organisation:"), file);
    assert.ok(!html.includes("socialLinks:"), file);
  }
});

test("section manifests load every timeline file once, in declared order", async () => {
  for (const section of ["experience", "education", "projects"]) {
    const { frontmatter } = await load(`${section}.md`);
    const { entries } = timelineSectionSchema.parse(frontmatter);
    const files = (await markdownFiles(`${section}/`)).filter(
      (file) => !file.includes("/summaries/"),
    );
    assert.deepEqual(
      entries.map((slug) => `${section}/${slug}.md`).toSorted(),
      files.toSorted(),
    );
    await Promise.all(
      entries.map(async (slug) => {
        const { frontmatter: metadata } = await load(`${section}/${slug}.md`);
        const entry = timelineMetadataSchema.parse(metadata);
        if (entry.summary)
          await load(`${section}/summaries/${entry.summary}.md`);
      }),
    );
  }
});

test("site and contact metadata are valid", async () => {
  const hero = heroMetadataSchema.parse((await load("hero.md")).frontmatter);
  const contact = contactMetadataSchema.parse(
    (await load("contact.md")).frontmatter,
  );
  assert.equal(hero.socialLinks[0].download, "Max Kelly - CV.pdf");
  assert.equal(contact.form.submit, "Send message");
});

function restoreTimeZone(zone) {
  if (zone === undefined) {
    delete process.env.TZ;
    return;
  }
  process.env.TZ = zone;
}

test("timeline dates remain local calendar dates in different time zones", () => {
  const originalZone = process.env.TZ;
  try {
    ["Europe/London", "America/Los_Angeles", "Pacific/Auckland"].forEach(
      (zone) => {
        process.env.TZ = zone;
        const date = timelineDate("2022-06-28");
        assert.deepEqual(
          [date.getFullYear(), date.getMonth(), date.getDate()],
          [2022, 5, 28],
        );
      },
    );
    assert.equal(timelineDate(undefined), undefined);
  } finally {
    restoreTimeZone(originalZone);
  }
});

test("invalid dates, reversed ranges, unknown icons and duplicate entries fail", () => {
  const base = { organisation: "Example" };
  for (const fields of [
    { start: "2022-02-30" },
    { end: "2022-06-28" },
    { start: "2022-06-28", end: "2021-06-28" },
    { chips: [{ label: "Example", icon: "Missing" }] },
  ]) {
    assert.equal(
      timelineMetadataSchema.safeParse({ ...base, ...fields }).success,
      false,
    );
  }
  assert.equal(timelineMetadataSchema.safeParse(base).success, true);
  assert.equal(
    timelineSectionSchema.safeParse({ entries: ["../private"] }).success,
    false,
  );
  assert.equal(
    timelineSectionSchema.safeParse({ entries: ["example", "example"] })
      .success,
    false,
  );
});

test("organisation summaries resolve from Markdown and keep their links", async () => {
  const metadata = timelineMetadataSchema.parse(
    (await load("experience/the-key-group.md")).frontmatter,
  );
  const { default: Summary } = await load(
    `experience/summaries/${metadata.summary}.md`,
  );
  const html = renderToStaticMarkup(runtime.jsx(Summary, {}));
  assert.match(html, /trades as The Key Support Services Ltd/);
  assert.match(html, /href="https:\/\/thekeygroup.com\/"/);
  assert.ok(!html.includes("I work as a Software Engineer"));
});
