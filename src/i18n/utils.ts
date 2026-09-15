import { defaultLocale, locales, localePaths, type Locale } from "./config";
import { ui, type UiKey } from "./ui";

/** Narrows `Astro.currentLocale` (a plain `string | undefined`) to a known `Locale`. */
export function resolveLocale(value: string | undefined): Locale {
  return (locales as readonly string[]).includes(value ?? "")
    ? (value as Locale)
    : defaultLocale;
}

/** `t(key)` — looks up the string for the given locale, falling back to English. */
export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key];
  };
}

/**
 * Routes that currently have a real page in every locale, keyed by their
 * locale-agnostic (English) path. As more pages get translated, add their
 * path here — the language switcher and hreflang tags use this map to link
 * to the exact equivalent page instead of falling back to the homepage, and
 * `localizeHref` uses it to rewrite hardcoded English hrefs found in nav /
 * data / components to the current locale.
 */
export const translatedRoutes: Record<string, Record<Locale, string>> = {
  "/": { en: "/", ja: "/jp/" },
  "/services/": { en: "/services/", ja: "/jp/services/" },
  "/services/ai-agent-development/": {
    en: "/services/ai-agent-development/",
    ja: "/jp/services/ai-agent-development/",
  },
  "/services/data-engineering/": {
    en: "/services/data-engineering/",
    ja: "/jp/services/data-engineering/",
  },
  "/services/full-stack-development/": {
    en: "/services/full-stack-development/",
    ja: "/jp/services/full-stack-development/",
  },
  "/services/it-consulting-staffing/": {
    en: "/services/it-consulting-staffing/",
    ja: "/jp/services/it-consulting-staffing/",
  },
  "/engineers/": { en: "/engineers/", ja: "/jp/engineers/" },
  "/contact/": { en: "/contact/", ja: "/jp/contact/" },
};

/**
 * Rewrites a hardcoded (English) internal href to its equivalent in `lang`,
 * for links embedded in nav/data/components rather than derived from the
 * current URL. Falls through unchanged for routes with no translation yet
 * (e.g. still-untranslated pages), so `lang === "en"` is always a no-op.
 */
export function localizeHref(href: string, lang: Locale): string {
  return translatedRoutes[href]?.[lang] ?? href;
}

/**
 * Strips a known locale prefix off a pathname, returning the bare (English)
 * path. Matches against `localePaths` (the URL segment) rather than the
 * `Locale` code directly, since they can differ — e.g. Japanese is coded
 * "ja" but lives under the "/jp/" URL prefix.
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/");
  const maybeSegment = segments[1];
  const match = (Object.entries(localePaths) as [Locale, string][]).find(
    ([loc, urlPath]) => loc !== defaultLocale && urlPath !== "" && urlPath === maybeSegment
  );
  if (match) {
    const rest = "/" + segments.slice(2).join("/");
    return { locale: match[0], path: rest === "//" ? "/" : rest };
  }
  return { locale: defaultLocale, path: pathname };
}

/**
 * Where should a link to `target` locale go from the current `pathname`?
 * Returns the exact translated page if we have one; otherwise falls back to
 * that locale's homepage (safer than linking to a route that doesn't exist yet).
 */
export function getAlternateUrl(pathname: string, target: Locale): string {
  const { path } = stripLocale(pathname);
  return translatedRoutes[path]?.[target] ?? translatedRoutes["/"][target];
}
