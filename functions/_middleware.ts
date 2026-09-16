/**
 * Cloudflare Pages middleware — runs on every request before static assets
 * are served.
 *
 * Sends visitors to the Japanese site (/jp/...) when they land on the bare
 * English root ("/") from a Japan-geolocated connection (Cloudflare's edge
 * `request.cf.country`). No cookie, localStorage, or any other stored
 * state is involved — every other path, including /jp/ itself, already
 * declares its own locale via the URL and is never second-guessed here.
 *
 * The one wrinkle: the header's EN switcher on the Japanese *home* page
 * links to "/" — exactly the one path this redirect watches. Without a
 * way to tell "an explicit switcher click landed on /" apart from "a fresh,
 * ambiguous arrival at /", a Japan-geolocated visitor could never reach the
 * English homepage at all — clicking EN would just bounce straight back to
 * /jp/. The switcher link carries a one-shot `fromSwitch` query param for
 * exactly this case: present only for that single request (never stored,
 * never sent again on the next navigation), it skips the geo-check once.
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
