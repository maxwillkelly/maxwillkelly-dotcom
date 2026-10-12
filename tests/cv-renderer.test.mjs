import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";

import { renderCv } from "../src/lib/cv-renderer.ts";

test(
  "CV renderer validates assets, isolates requests and recovers after failure",
  {
    skip: !process.env.CV_CHROMIUM_EXECUTABLE_PATH,
  },
  async (t) => {
    const previous = { ...process.env };
    let brokenImage = false;
    let status = 200;
    let externalRequests = 0;
    const external = createServer((_request, response) => {
      externalRequests++;
      response.end("external");
    }).listen(0, "127.0.0.1");
    await once(external, "listening");
    const externalUrl = `http://127.0.0.1:${external.address().port}`;
    const server = createServer((request, response) => {
      if (request.url !== "/cv/print") {
        response.writeHead(404).end();
        return;
      }
      assert.equal(
        request.headers["x-vercel-protection-bypass"],
        "test-secret",
      );
      response.writeHead(status, { "Content-Type": "text/html" });
      response.end(`<html><head><style>@page { size: A4; } @font-face { font-family: unused; src: url('/unused.woff2'); }</style></head><body>
      <main data-cv-ready>CV test content</main>
      <script src="${externalUrl}/script.js"></script>
      ${brokenImage ? '<img src="/missing.png" alt="Missing">' : ""}
    </body></html>`);
    }).listen(0, "127.0.0.1");
    await once(server, "listening");
    const origin = `http://127.0.0.1:${server.address().port}`;
    delete process.env.VERCEL;
    delete process.env.VERCEL_URL;
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "test-secret";
    process.env.CV_LOCAL_ORIGIN = origin;
    t.after(() => {
      server.close();
      external.close();
      [
        "VERCEL",
        "VERCEL_URL",
        "VERCEL_AUTOMATION_BYPASS_SECRET",
        "CV_LOCAL_ORIGIN",
      ].forEach((key) => {
        if (previous[key] === undefined) delete process.env[key];
        else process.env[key] = previous[key];
      });
    });

    await t.test(
      "rejects an arbitrary render origin before launching",
      async () => {
        process.env.CV_LOCAL_ORIGIN = "https://example.com";
        await assert.rejects(renderCv(), /loopback/);
        process.env.CV_LOCAL_ORIGIN = origin;
      },
    );
    await t.test(
      "renders PDF with unused font faces and blocks external requests",
      async () => {
        const pdf = await renderCv();
        assert.equal(Buffer.from(pdf.subarray(0, 5)).toString(), "%PDF-");
        assert.equal(externalRequests, 0);
      },
    );
    await t.test(
      "rejects missing images and permits a subsequent successful render",
      async () => {
        brokenImage = true;
        await assert.rejects(renderCv(), /assets failed/);
        brokenImage = false;
        assert.ok((await renderCv()).length > 1000);
      },
    );
    await t.test("rejects an unsuccessful print response", async () => {
      status = 503;
      await assert.rejects(renderCv(), /print page unavailable/);
    });
  },
);
