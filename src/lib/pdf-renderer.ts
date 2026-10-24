import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser, type Page } from "puppeteer";

import { env } from "./env";

export const generatePdf = async (requestUrl: string) => {
  const url = printUrl(requestUrl);
  const browser = await launchBrowser();

  const deadline = setTimeout(
    () => browser.process()?.kill("SIGKILL"),
    env.PDF_RENDER_TIMEOUT_MS,
  );

  try {
    return await renderPage(browser, url);
  } finally {
    clearTimeout(deadline);

    await closeBrowser(browser);
  }
};

const printUrl = (requestUrl: string) => {
  if (process.env.VERCEL_URL) {
    return new URL("/print", `https://${process.env.VERCEL_URL}`);
  }

  const { port } = new URL(requestUrl);

  return new URL("/print", `http://localhost${port ? `:${port}` : ""}`);
};

const launchBrowser = async () => {
  const options = {
    timeout: env.PDF_OPERATION_TIMEOUT_MS,
    protocolTimeout: env.PDF_OPERATION_TIMEOUT_MS,
  };

  return puppeteer.launch({
    ...options,
    ...(process.env.VERCEL
      ? {
          executablePath: await chromium.executablePath(),
          args: chromium.args,
          headless: "shell" as const,
        }
      : { headless: true }),
  });
};

const closeBrowser = async (browser: Browser) => {
  const kill = setTimeout(
    () => browser.process()?.kill("SIGKILL"),
    env.PDF_BROWSER_CLOSE_TIMEOUT,
  );

  try {
    await browser.close();
  } catch {
    console.error("PDF generation failed", { stage: "browser-close" });
    browser.process()?.kill("SIGKILL");
  } finally {
    clearTimeout(kill);
  }
};

const renderPage = async (browser: Browser, url: URL) => {
  const page = await preparePage(browser, url);

  await waitForAssets(page);

  return page.pdf({
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    timeout: env.PDF_OPERATION_TIMEOUT_MS,
  });
};

const preparePage = async (browser: Browser, url: URL) => {
  const page = await browser.newPage();

  page.setDefaultTimeout(env.PDF_OPERATION_TIMEOUT_MS);

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

    const headers = {
      ...request.headers(),
      ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET
        ? {
            "x-vercel-protection-bypass":
              process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
          }
        : {}),
    };

    void request.continue({ headers });
  });

  const response = await page.goto(url.href, {
    waitUntil: "load",
    timeout: env.PDF_OPERATION_TIMEOUT_MS,
  });

  if (!response?.ok() || new URL(page.url()).origin !== url.origin) {
    throw new Error("Print page unavailable");
  }

  return page;
};

const waitForAssets = async (page: Page) => {
  await page.waitForFunction(
    () =>
      document.fonts.status === "loaded" &&
      [...document.images].every((image) => image.complete),
  );

  const isAssetsReady = await page.evaluate(
    () =>
      [...document.images].every((image) => image.naturalWidth > 0) &&
      [...document.fonts].every((font) => font.status !== "error"),
  );

  if (!isAssetsReady) {
    throw new Error("PDF assets failed to load");
  }
};
