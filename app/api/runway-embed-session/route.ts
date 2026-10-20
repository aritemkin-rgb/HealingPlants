import { NextResponse } from "next/server";

const API = "https://api.dev.runwayml.com";
const PUB_KEY =
  process.env.NEXT_PUBLIC_RUNWAY_WIDGET_PUB_KEY ??
  "pub_c881bc2620f4e134ed3f9f21099196000bb0aa16387acb1d87a92d0e34c1aaf4";

export const maxDuration = 60;

type EmbedSession = {
  id?: string;
  avatarId?: string;
  status?: string;
  sessionKey?: string;
  error?: string;
  failure?: string;
};

function runwayHeaders(origin: string) {
  return {
    Authorization: `Bearer ${PUB_KEY}`,
    "Content-Type": "application/json",
    "X-Runway-Version": "2024-11-06",
    Origin: origin,
    Referer: `${origin}/`,
  };
}

function failCode(status: number, text: string) {
  const lower = text.toLowerCase();
  if (status === 403 || lower.includes("origin") || lower.includes("allow")) {
    return "origin";
  }
  if (status === 401) return "key";
  if (status === 429) return "busy";
  return "connect";
}

export async function POST(request: Request) {
  const incomingOrigin = request.headers.get("origin") || "";
  let bodyOrigin = "";
  try {
    const payload = (await request.json()) as { origin?: string };
    bodyOrigin = payload.origin ?? "";
  } catch {
    bodyOrigin = "";
  }
  const origin = incomingOrigin || bodyOrigin || "http://127.0.0.1:3000";

  const created = await fetch(`${API}/v1/embeds/sessions`, {
    method: "POST",
    headers: runwayHeaders(origin),
    body: "{}",
  });
  const createdText = await created.text();

  if (!created.ok) {
    return NextResponse.json(
      { error: failCode(created.status, createdText), origin },
      { status: created.status === 403 ? 403 : 502 },
    );
  }

  const session = JSON.parse(createdText) as EmbedSession;
  if (!session.id) {
    return NextResponse.json({ error: "connect", origin }, { status: 502 });
  }

  for (let attempt = 0; attempt < 30; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const probe = await fetch(`${API}/v1/embeds/sessions/${session.id}`, {
      headers: runwayHeaders(origin),
    });
    const probeText = await probe.text();
    if (!probe.ok) {
      return NextResponse.json(
        { error: failCode(probe.status, probeText), origin },
        { status: 502 },
      );
    }
    const body = JSON.parse(probeText) as EmbedSession;
    if (body.status === "READY" && body.sessionKey) {
      return NextResponse.json({
        sessionId: session.id,
        avatarId: session.avatarId ?? body.avatarId ?? "",
        sessionKey: body.sessionKey,
      });
    }
    if (body.status === "FAILED" || body.status === "CANCELLED") {
      return NextResponse.json({ error: "connect", origin }, { status: 502 });
    }
  }

  return NextResponse.json({ error: "timeout", origin }, { status: 504 });
}
