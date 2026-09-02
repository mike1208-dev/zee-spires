// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Update this to the production domain before launch.
const SITE = "https://zeespires.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
    routing: {
      // English stays unprefixed at the root; Japanese lives under /ja/.
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
