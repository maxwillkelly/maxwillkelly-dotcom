/** @type {import("puppeteer").Configuration} */
module.exports = {
  // Vercel uses @sparticuz/chromium instead of a downloaded desktop browser.
  skipDownload: Boolean(process.env.VERCEL),
  firefox: { skipDownload: true },
  "chrome-headless-shell": { skipDownload: true },
};
