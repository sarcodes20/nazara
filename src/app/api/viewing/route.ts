import { NextResponse } from "next/server";
import { viewingSchema } from "@/lib/viewing-schema";

export const runtime = "edge";

/**
 * Validates with the same Zod schema the client uses, so a hand-crafted POST
 * cannot bypass the rules the form enforces.
 *
 * With no RESEND_API_KEY set the handler logs and succeeds, which keeps the
 * form fully exercisable in development and in a preview deployment.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = viewingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields need attention.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const now = new Date();
  const reference = `NZ-V-${now.getFullYear()}-${String(
    Math.floor(Math.random() * 9999),
  ).padStart(4, "0")} · ${String(now.getDate()).padStart(2, "0")}.${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}.${String(now.getFullYear()).slice(2)}`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[viewing] no mail provider configured", parsed.data);
    return NextResponse.json({ reference });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Nazara <viewings@nazara.in>",
      to: process.env.VIEWING_INBOX ?? "viewings@nazara.in",
      reply_to: parsed.data.email,
      subject: `Viewing request — ${parsed.data.location} — ${reference}`,
      text: [
        `Reference   ${reference}`,
        `Name        ${parsed.data.name}`,
        `Email       ${parsed.data.email}`,
        `Practice    ${parsed.data.practice ?? "—"}`,
        `Location    ${parsed.data.location}`,
        `Type        ${parsed.data.type}`,
        `Area        ${parsed.data.area} m²`,
        `Stones      ${parsed.data.stones?.join(", ") || "—"}`,
        "",
        parsed.data.notes ?? "",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ reference });
}
