import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import "./src/lib/env";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: {
    "/": ["./src/content/**/*"],
    "/cv/print": ["./src/content/**/*"],
    "/api/cv": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withMDX(nextConfig);
