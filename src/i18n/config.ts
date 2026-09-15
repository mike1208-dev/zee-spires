/**
 * i18n locale definitions. Keep this in sync with `i18n` in astro.config.mjs.
 */

export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * URL path segment for each locale (must match the `path` used in
 * astro.config.mjs's `i18n.locales`). This is intentionally separate from
 * the `Locale` code itself: the Japanese route lives under /jp/, but the
 * actual language code stays "ja" everywhere else (html lang, hreflang,
 * og:locale, and every ui.ts/translations.ts key).
 */
export const localePaths: Record<Locale, string> = {
  en: "",
  ja: "jp",
};

/** Each language's name in its own script, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
};

/** BCP 47 / og:locale values. */
export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
};
