/**
 * Cloudflare Pages middleware — runs on every request before static assets
 * are served.
 *
 * Defaults visitors to the Japanese site (/jp/...) when Cloudflare's edge
 * geolocation (`request.cf.country`) resolves to Japan, and to English
 * otherwise, then remembers the decision in a `pref_locale` cookie
 * ("en" | "jp", matching the URL prefix) and actively enforces it for the
 * rest of the browsing session — landing on a URL that doesn't match the
 * stored preference redirects to the equivalent page in the preferred
 * locale. The cookie is session-only (no Max-Age): closing the browser
 * clears it, so a genuinely new session re-checks IP geolocation rather
 * than replaying a decision from days or months ago.
 *
 * The one exception is an *explicit* click on the header's EN/日本語
 * switcher, marked with the `setLocale` query param: that always wins,
 * updates the cookie to the newly-chosen locale, and is never immediately
 * redirected back by the enforcement above.
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

type LocaleCookie = "en" | "jp";

const COOKIE_NAME = "pref_locale";
const SWITCH_PARAM = "setLocale";

function getCookieLocale(request: Request): LocaleCookie | undefined {
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)pref_locale=(en|jp)/);
  return match?.[1] as LocaleCookie | undefined;
}

function setLocaleCookie(headers: Headers, locale: LocaleCookie) {
  // Deliberately no Max-Age/Expires: a session cookie, cleared when the
  // browser fully closes. A sticky preference should last the browsing
  // session (switching tabs, reloading, following links), but a genuinely
  // new session re-checks IP geolocation rather than remembering a stale
  // decision for up to a year.
  headers.append("Set-Cookie", `${COOKIE_NAME}=${locale}; Path=/; SameSite=Lax`);
}

function redirectTo(url: URL, locale: LocaleCookie): Response {
  const response = new Response(null, { status: 302, headers: { Location: url.toString() } });
  setLocaleCookie(response.headers, locale);
  return response;
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
  const currentLocale: LocaleCookie = isJpPath ? "jp" : "en";

  // Explicit switcher click: the link already points at the target
  // locale's page, so just record that choice and strip the marker. This
  // always wins — it must not be immediately bounced by the enforcement
  // below.
  if (url.searchParams.has(SWITCH_PARAM)) {
    url.searchParams.delete(SWITCH_PARAM);
    return redirectTo(url, currentLocale);
  }

  const cookieLocale = getCookieLocale(request);

  if (cookieLocale) {
    // Returning visitor with a stored preference: enforce it. Landing on
    // the "other" locale's URL for any reason (a bookmark, a shared link,
    // a fresh tab) redirects to the equivalent page in their locale.
    if (cookieLocale !== currentLocale) {
      const dest = new URL(request.url);
      dest.pathname = cookieLocale === "jp" ? `/jp${path}` : path.replace(/^\/jp/, "") || "/";
      return redirectTo(dest, cookieLocale);
    }
  } else {
    // First-ever visit (no stored preference yet): decide from Cloudflare's
    // edge geolocation. Every route has a full /jp/ counterpart, so a plain
    // prefix join is exact.
    const country = (request as unknown as { cf?: { country?: string } }).cf?.country;
    if (country === "JP" && !isJpPath) {
      const dest = new URL(request.url);
      dest.pathname = `/jp${path}`;
      return redirectTo(dest, "jp");
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

  // Record the first-visit determination so we never geo-check this
  // visitor again. A cookie that already matches the served locale is
  // left untouched (no need to keep rewriting it every request).
  if (!cookieLocale) {
    const updated = new Response(response.body, response);
    setLocaleCookie(updated.headers, currentLocale);
    return updated;
  }

  return response;
};
