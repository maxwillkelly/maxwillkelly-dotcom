import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer";

import { atCvStage } from "./cv-error";

const renderTimeout = 45_000;

function printUrl(requestUrl: string) {
  if (process.env.VERCEL_URL)
    return new URL("/cv/print", `https://${process.env.VERCEL_URL}`);
  const url = new URL("http://localhost/cv/print");

  url.port = new URL(requestUrl).port;

  return url;
}

async function closeBrowser(browser: Browser) {
  const kill = setTimeout(() => browser.process()?.kill("SIGKILL"), 3_000);
  try {
    await browser.close();
  } finally {
    clearTimeout(kill);
  }
}

async function launchBrowser() {
  const options = { timeout: 10_000, protocolTimeout: 15_000 };
  if (!process.env.VERCEL)
    return puppeteer.launch({
      ...options,
      headless: true,
    });
  return puppeteer.launch({
    ...options,
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: "shell",
  });
}

export async function renderCv(requestUrl: string) {
  const url = await atCvStage("print-url", () => printUrl(requestUrl));
  const browser = await atCvStage("browser-launch", launchBrowser);
  const deadline = setTimeout(
    () => browser.process()?.kill("SIGKILL"),
    renderTimeout,
  );
  try {
    return await atCvStage("print-page", () => renderPage(browser, url));
  } finally {
    clearTimeout(deadline);
    await atCvStage("browser-close", () => closeBrowser(browser));
  }
}

async function renderPage(browser: Browser, url: URL) {
  const page = await browser.newPage();
  page.setDefaultTimeout(10_000);
  await page.emulateMediaType("print");
  await page.setRequestInterception(true);
  // Only the deployment itself receives the protection secret. External assets
  // and analytics are unnecessary for this document and are not requested.
  page.on("request", (request) => {
    const requestUrl = new URL(request.url());
    if (requestUrl.origin !== url.origin) {
      void request.abort();
      return;
    }
    const headers = { ...request.headers() };
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers["x-vercel-protection-bypass"] =
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    }
    void request.continue({ headers });
  });
  const response = await page.goto(url.href, {
    waitUntil: "load",
    timeout: 15_000,
  });
  if (!response?.ok() || new URL(page.url()).origin !== url.origin)
    throw new Error("CV print page unavailable");
  await atCvStage("assets", async () => {
    await page.waitForFunction(
      () =>
        document.fonts.status === "loaded" &&
        [...document.images].every((image) => image.complete),
    );
    const assetsReady = await page.evaluate(
      () =>
        [...document.images].every((image) => image.naturalWidth > 0) &&
        [...document.fonts].every((font) => font.status !== "error"),
    );
    if (!assetsReady) throw new Error("CV assets failed to load");
  });
  return await atCvStage("pdf-render", () =>
    page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      timeout: 15_000,
    }),
  );
}
