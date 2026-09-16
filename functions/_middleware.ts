/**
 * Cloudflare Pages middleware — runs on every request before static assets
 * are served.
 *
 * Defaults visitors to the Japanese site (/jp/...) when Cloudflare's edge
 * geolocation (`request.cf.country`) resolves to Japan, and to English
 * otherwise. Uses a `pref_locale` cookie so this only happens once per
 * visitor: after the first visit (whether auto-detected or reached via the
 * header's EN/日本語 switcher), the cookie is authoritative and the
 * geolocation check is skipped — so manually switching language always
 * sticks, instead of being redirected back on the next page load.
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

  // Only ever redirect real page navigations — never the contact API or
  // static assets (sitemap, robots.txt, images, fonts, videos, etc.).
  const isAsset = /\.[a-zA-Z0-9]+$/.test(path);
  if (isAsset || path.startsWith("/api/")) {
    return next();
  }

  const isJpPath = path === "/jp" || path.startsWith("/jp/");
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

  const currentLocale = isJpPath ? "ja" : "en";

  // Keep the cookie in sync with whatever locale this response actually
  // serves, so a manual EN/日本語 switcher click overrides the stored
  // preference for all future visits.
  if (cookieLocale !== currentLocale) {
    const updated = new Response(response.body, response);
    setLocaleCookie(updated.headers, currentLocale);
    return updated;
  }

  return response;
};
