import { defaultLocale, locales, type Locale } from "./config";
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
 * to the exact equivalent page instead of falling back to the homepage.
 */
export const translatedRoutes: Record<string, Record<Locale, string>> = {
  "/": { en: "/", ja: "/ja/" },
};

/** Strips a known locale prefix off a pathname, returning the bare (English) path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (locales.includes(maybeLocale as Locale) && maybeLocale !== defaultLocale) {
    const rest = "/" + segments.slice(2).join("/");
    return { locale: maybeLocale as Locale, path: rest === "//" ? "/" : rest };
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
