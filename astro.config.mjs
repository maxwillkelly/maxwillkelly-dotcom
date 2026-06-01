import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  site: "https://maxwillkelly.com",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        min: 1,
      }),
      SEND_EMAIL: envField.string({
        context: "server",
        access: "secret",
        min: 1,
      }),
      UPSTASH_REDIS_REST_URL: envField.string({
        context: "server",
        access: "secret",
        min: 1,
        url: true,
      }),
      UPSTASH_REDIS_REST_TOKEN: envField.string({
        context: "server",
        access: "secret",
        min: 1,
      }),
      NODE_ENV: envField.enum({
        context: "server",
        access: "public",
        values: ["development", "test", "production"],
        default: "development",
      }),
    },
    validateSecrets: true,
  },
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
