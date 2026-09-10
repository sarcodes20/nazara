import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  email: z.string().min(1, "We need this one.").email("Check the address."),
});

/**
 * The footer sign-up posts here from every page. It was previously a dead
 * endpoint, which meant the form failed silently site-wide.
 *
 * Accepts a native form POST as well as JSON so the footer keeps working with
 * JavaScript disabled — the one form on the site that has to.
 */
export async function POST(request: Request) {
  const type = request.headers.get("content-type") ?? "";

  let email: unknown;
  if (type.includes("application/json")) {
    email = ((await request.json().catch(() => ({}))) as { email?: unknown })
      .email;
  } else {
    email = (await request.formData()).get("email");
  }

  const parsed = schema.safeParse({ email });
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the address.";
    return type.includes("application/json")
      ? NextResponse.json({ error: message }, { status: 422 })
      : NextResponse.redirect(new URL("/journal?subscribed=0", request.url), 303);
  }

  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;

  if (!key || !audience) {
    console.info("[journal] no mail provider configured", parsed.data.email);
  } else {
    await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: parsed.data.email, unsubscribed: false }),
    }).catch(() => {
      /* a failed sign-up must not throw an error page at the reader */
    });
  }

  // A native form post lands back on the Journal with a confirmation; a fetch
  // gets JSON and the footer swaps its own label.
  return type.includes("application/json")
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/journal?subscribed=1", request.url), 303);
}
