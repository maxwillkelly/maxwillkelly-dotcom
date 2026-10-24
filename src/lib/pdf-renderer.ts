import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer";

const renderTimeout = 45_000;

const printUrl = (requestUrl: string) => {
  if (process.env.VERCEL_URL) {
    return new URL("/print", `https://${process.env.VERCEL_URL}`);
  }

  const url = new URL("http://localhost/print");

  url.port = new URL(requestUrl).port;

  return url;
};

const closeBrowser = async (browser: Browser) => {
  const kill = setTimeout(() => browser.process()?.kill("SIGKILL"), 3_000);

  try {
    await browser.close();
  } catch {
    console.error("PDF generation failed", { stage: "browser-close" });
    browser.process()?.kill("SIGKILL");
  } finally {
    clearTimeout(kill);
  }
};

const launchBrowser = async () => {
  const options = { timeout: 10_000, protocolTimeout: 15_000 };

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

export const generatePdf = async (requestUrl: string) => {
  let stage = "print-url";
  let url: URL;
  let browser: Browser;

  try {
    url = printUrl(requestUrl);
    stage = "browser-launch";
    browser = await launchBrowser();
  } catch (error) {
    // Log fixed labels only: third-party errors may contain credentials or URLs.
    console.error("PDF generation failed", { stage });

    throw error;
  }

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
};

const preparePage = async (browser: Browser, url: URL) => {
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

const renderPage = async (browser: Browser, url: URL) => {
  let stage = "print-page";

  try {
    const page = await preparePage(browser, url);
    stage = "assets";
    await waitForAssets(page);
    stage = "pdf-render";

    return await page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      timeout: 15_000,
    });
  } catch (error) {
    console.error("PDF generation failed", { stage });

    throw error;
  }
};
