/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the contact form, validates it, and emails the inquiry to the
 * ZeeSpires inbox via Resend (https://resend.com).
 *
 * Required environment variables (set in the Cloudflare Pages dashboard →
 * Settings → Environment variables, or in a local `.dev.vars` file):
 *
 *   RESEND_API_KEY   API key from your Resend account.
 *   CONTACT_TO       Destination inbox (e.g. admin@zeespires.com).
 *   CONTACT_FROM     Verified sender, e.g. "ZeeSpires <website@zeespires.com>".
 *
 * If RESEND_API_KEY is not set, the function logs the inquiry and returns
 * success — handy for local/preview builds before email is wired up. Swap the
 * Resend call for any provider (Postmark, SendGrid, MailChannels, …) as needed.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  company_website?: string;
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 5000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Honeypot: silently accept bots so they think it worked.
  if (clean(payload.company_website)) {
    return json({ ok: true });
  }

  const name = clean(payload.name, 200);
  const email = clean(payload.email, 320);
  const company = clean(payload.company, 200);
  const service = clean(payload.service, 200);
  const message = clean(payload.message, 5000);

  if (!name || !email || !message) {
    return json({ error: "Please fill in your name, email, and message." }, 400);
  }
  if (!isEmail(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const to = env.CONTACT_TO || "admin@zeespires.com";
  const from = env.CONTACT_FROM || "ZeeSpires Website <onboarding@resend.dev>";

  const subject = `New inquiry from ${name}${company ? ` (${company})` : ""}`;
  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    service && `Service: ${service}`,
    "",
    "Message:",
    message,
  ].filter(Boolean);
  const text = textLines.join("\n");
  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  // No provider key configured — log and succeed (useful in preview).
  if (!env.RESEND_API_KEY) {
    console.log("[contact] (no RESEND_API_KEY set) inquiry:", text);
    return json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error:", res.status, detail);
      return json(
        { error: "We couldn't send your message. Please email us directly." },
        502
      );
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return json(
      { error: "We couldn't send your message. Please email us directly." },
      500
    );
  }
};
