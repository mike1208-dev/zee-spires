/**
 * Cloudflare Pages middleware — runs before every request.
 *
 * Redirects to /jp/... when a visitor lands on the bare English root ("/")
 * from a Japan-geolocated connection (`request.cf.country`). No cookie or
 * stored state — every other path, including /jp/ itself, already
 * declares its own locale via the URL and is left alone.
 *
 * The header's EN switcher on the Japanese homepage links to "/", the one
 * path this redirect watches, so its links carry a one-shot `fromSwitch`
 * query param that skips the geo-check for that single request.
 *
 * Also serves the Japanese 404 page (with a real 404 status) for unmatched
 * /jp/* paths, via the ASSETS binding — Cloudflare Pages' _redirects only
 * accepts 200/301/302/303/307/308 as rewrite status codes, so a 404 rule
 * isn't possible there.
 */

interface Env {
  ASSETS: Fetcher;
}

const SWITCH_PARAM = "fromSwitch";

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

  // The bare English root is the one ambiguous entry point — everywhere
  // else already declares its own locale via the URL itself. Skip the
  // geo-check when arriving via an explicit switcher click (see doc
  // comment above) — that's a deliberate choice, not an ambiguous landing.
  if (path === "/" && !url.searchParams.has(SWITCH_PARAM)) {
    const country = (request as unknown as { cf?: { country?: string } }).cf?.country;
    if (country === "JP") {
      return Response.redirect(new URL("/jp/", request.url).toString(), 302);
    }
  }

  const isJpPath = path === "/jp" || path.startsWith("/jp/");
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

  return response;
};
