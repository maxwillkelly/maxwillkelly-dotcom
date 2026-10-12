import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";

const renderTimeout = 45_000;

function printUrl() {
  if (process.env.VERCEL_URL)
    return new URL("/cv/print", `https://${process.env.VERCEL_URL}`);
  return localPrintUrl();
}

function localPrintUrl() {
  const origin = new URL(
    process.env.CV_LOCAL_ORIGIN ?? "http://localhost:3000",
  );
  if (
    !["localhost", "127.0.0.1"].includes(origin.hostname) ||
    origin.protocol !== "http:"
  ) {
    throw new Error("CV_LOCAL_ORIGIN must be an HTTP loopback URL");
  }
  return new URL("/cv/print", origin);
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
  const localExecutable =
    !process.env.VERCEL && process.env.CV_CHROMIUM_EXECUTABLE_PATH;
  const options = { timeout: 10_000, protocolTimeout: 15_000 };
  if (localExecutable)
    return puppeteer.launch({
      ...options,
      executablePath: localExecutable,
      headless: true,
    });
  return puppeteer.launch({
    ...options,
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: "shell",
  });
}

export async function renderCv() {
  const url = printUrl();
  const browser = await launchBrowser();
  const deadline = setTimeout(
    () => browser.process()?.kill("SIGKILL"),
    renderTimeout,
  );
  try {
    return await renderPage(browser, url);
  } finally {
    clearTimeout(deadline);
    await closeBrowser(browser);
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
  await page.waitForSelector("[data-cv-ready]");
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
  return await page.pdf({
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    timeout: 15_000,
  });
}
