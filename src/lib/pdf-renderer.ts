import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer";

import { env } from "./env";

export const generatePdf = async (requestUrl: string) => {
  const url = await handleError("print-url", () => printUrl(requestUrl));
  const browser = await handleError("browser-launch", launchBrowser);

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

const handleError = async <T>(
  stage: string,
  operation: () => T | Promise<T>,
) => {
  try {
    return await operation();
  } catch (error) {
    // Log fixed labels only: third-party errors may contain credentials or URLs.
    console.error("PDF generation failed", { stage });

    throw error;
  }
};

const launchBrowser = async () => {
  const options = {
    timeout: env.PDF_OPERATION_TIMEOUT_MS,
    protocolTimeout: env.PDF_OPERATION_TIMEOUT_MS,
  };

  if (!process.env.VERCEL) {
    return puppeteer.launch({
      ...options,
      headless: true,
    });
  }

  return puppeteer.launch({
    ...options,
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: "shell",
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
  const page = await handleError("print-page", () => preparePage(browser, url));

  await handleError("assets", () => waitForAssets(page));

  return handleError("pdf-render", () =>
    page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      timeout: env.PDF_OPERATION_TIMEOUT_MS,
    }),
  );
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

const waitForAssets = async (page: Awaited<ReturnType<typeof preparePage>>) => {
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

  if (!assetsReady) {
    throw new Error("PDF assets failed to load");
  }
};
