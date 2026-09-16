/**
 * Cloudflare Pages middleware — runs on every request before static assets
 * are served.
 *
 * Defaults visitors to the Japanese site (/jp/...) when Cloudflare's edge
 * geolocation (`request.cf.country`) resolves to Japan, and to English
 * otherwise. Uses a `pref_locale` cookie so this only happens once per
 * visitor: the FIRST request with no cookie yet makes the geo-based
 * decision and sets the cookie; every request after that is left alone.
 *
 * Crucially, the cookie is only ever changed by an *explicit* click on the
 * header's EN/日本語 switcher (marked with the `setLocale` query param) —
 * never as a side effect of whichever URL happens to be loaded. An earlier
 * version re-synced the cookie to match "whatever locale this response
 * happens to serve," which silently overwrote a visitor's real preference
 * the moment they landed on the "other" locale's URL for any unrelated
 * reason (a bookmark to the bare domain, a shared link, a second tab) —
 * exactly backwards from what a "sticky preference" should do.
 *
 * Also serves the Japanese 404 page (with an actual 404 status) for
 * unmatched /jp/* paths. This used to be a public/_redirects rule
 * (`/jp/* /jp/404/ 404`), but Cloudflare Pages' _redirects only accepts
 * 200/301/302/303/307/308 as rewrite status codes — 404 is invalid and
 * wrangler flags it at build time (`Found 1 invalid redirect rule`), so
 * that rule was silently never doing anything. Rewriting via the ASSETS
 * binding here actually works, since a Function can return any status.
 */

interface Env {
  ASSETS: Fetcher;
}

const COOKIE_NAME = "pref_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SWITCH_PARAM = "setLocale";

function getCookieLocale(request: Request): "en" | "ja" | undefined {
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)pref_locale=(en|ja)/);
  return match?.[1] as "en" | "ja" | undefined;
}

function setLocaleCookie(headers: Headers, locale: "en" | "ja") {
  headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
  );
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Only ever act on real page navigations — never the contact API or
  // static assets (sitemap, robots.txt, images, fonts, videos, etc.).
  const isAsset = /\.[a-zA-Z0-9]+$/.test(path);
  if (isAsset || path.startsWith("/api/")) {
    return next();
  }

  const isJpPath = path === "/jp" || path.startsWith("/jp/");
  const currentLocale: "en" | "ja" = isJpPath ? "ja" : "en";

  // Explicit switcher click: the link already points at the target
  // locale's page, so just record that choice and strip the marker.
  if (url.searchParams.has(SWITCH_PARAM)) {
    url.searchParams.delete(SWITCH_PARAM);
    const response = new Response(null, {
      status: 302,
      headers: { Location: url.toString() },
    });
    setLocaleCookie(response.headers, currentLocale);
    return response;
  }

  const cookieLocale = getCookieLocale(request);

  // First-ever visit (no stored preference): send Japan-geolocated visitors
  // straight to the equivalent /jp/ page. Every route has a full /jp/
  // counterpart, so a plain prefix join is exact.
  if (!cookieLocale && !isJpPath) {
    const country = (request as unknown as { cf?: { country?: string } }).cf?.country;
    if (country === "JP") {
      const dest = new URL(request.url);
      dest.pathname = `/jp${path}`;
      const response = new Response(null, {
        status: 302,
        headers: { Location: dest.toString() },
      });
      setLocaleCookie(response.headers, "ja");
      return response;
    }
  }

  let response = await next();

  // Cloudflare's own 404 fallback (triggered inside next() for a genuinely
  // unmatched path) only knows the root English 404.html. Swap in the
  // Japanese 404 page's content for unmatched /jp/* paths, keeping a real
  // 404 status.
  if (response.status === 404 && isJpPath) {
    const jp404Url = new URL(request.url);
    jp404Url.pathname = "/jp/404/";
    const jp404 = await env.ASSETS.fetch(new Request(jp404Url.toString(), request));
    response = new Response(jp404.body, { status: 404, headers: jp404.headers });
  }

  // Record the first-visit determination so we never geo-check this visitor
  // again — but only if no preference is stored yet. An existing cookie is
  // never touched here; only an explicit switcher click (above) changes it.
  if (!cookieLocale) {
    const updated = new Response(response.body, response);
    setLocaleCookie(updated.headers, currentLocale);
    return updated;
  }

  return response;
};
