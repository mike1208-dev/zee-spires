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
  integrations: [sitemap()],
  vite: {
    // Type mismatch between @tailwindcss/vite's Vite and Astro's bundled Vite
    // is cosmetic — the plugin runs correctly at build time.
    // @ts-expect-error - Vite version type mismatch
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
