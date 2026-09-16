interface Env {
  ASSETS: Fetcher;
}

type LocaleCookie = "en" | "jp";

const COOKIE_NAME = "pref_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SWITCH_PARAM = "setLocale";

function getCookieLocale(request: Request): LocaleCookie | undefined {
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)pref_locale=(en|jp)/);
  return match?.[1] as LocaleCookie | undefined;
}

function setLocaleCookie(headers: Headers, locale: LocaleCookie) {
  headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
  );
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
