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
    // The Japanese page lives under /jp/ (business convention), but its
    // actual language code stays "ja" — Astro.currentLocale, <html lang>,
    // hreflang, and og:locale all still correctly resolve to "ja".
    locales: ["en", { path: "jp", codes: ["ja"] }],
    routing: {
      // English stays unprefixed at the root; Japanese lives under /jp/.
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
