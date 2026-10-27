import { NextResponse } from "next/server";
import { isLocalRunwayOrigin } from "@/lib/runwayOrigins";

const API = "https://api.dev.runwayml.com";
const SAGE_PUB_KEY =
  process.env.NEXT_PUBLIC_RUNWAY_WIDGET_PUB_KEY ??
  "pub_c881bc2620f4e134ed3f9f21099196000bb0aa16387acb1d87a92d0e34c1aaf4";
const MONEY_TREE_PUB_KEY =
  process.env.NEXT_PUBLIC_RUNWAY_MONEY_TREE_PUB_KEY ??
  "pub_bdc7bab250df944cb85932dee671a5f4833c23b16a3f7c5432d99202b2095042";

export const maxDuration = 60;

type Character = "prairie" | "moneyTree";

type EmbedSession = {
  id?: string;
  avatarId?: string;
  status?: string;
  sessionKey?: string;
  error?: string;
  failure?: string;
};

function pubKeyFor(character: Character) {
  return character === "moneyTree" ? MONEY_TREE_PUB_KEY : SAGE_PUB_KEY;
}

function runwayHeaders(origin: string, pubKey: string) {
  return {
    Authorization: `Bearer ${pubKey}`,
    "Content-Type": "application/json",
    "X-Runway-Version": "2024-11-06",
    Origin: origin,
    Referer: `${origin}/`,
  };
}

function failCode(status: number, text: string, origin: string) {
  const lower = text.toLowerCase();
  if (status === 403 || lower.includes("origin") || lower.includes("allow")) {
    return "origin";
  }
  // 401 on localhost means the public key is rejected. 401 on the live
  // domain is usually a missing origin on the Runway Embed allow list.
  if (status === 401) return isLocalRunwayOrigin(origin) ? "key" : "origin";
  if (status === 429) return "busy";
  return "connect";
}

export async function POST(request: Request) {
  const incomingOrigin = request.headers.get("origin") || "";
  let bodyOrigin = "";
  let character: Character = "prairie";
  try {
    const payload = (await request.json()) as {
      origin?: string;
      character?: string;
    };
    bodyOrigin = payload.origin ?? "";
    if (payload.character === "moneyTree") character = "moneyTree";
  } catch {
    bodyOrigin = "";
  }
  const origin = incomingOrigin || bodyOrigin || "http://127.0.0.1:3000";
  const headers = runwayHeaders(origin, pubKeyFor(character));

  const created = await fetch(`${API}/v1/embeds/sessions`, {
    method: "POST",
    headers,
    body: "{}",
  });
  const createdText = await created.text();

  if (!created.ok) {
    const error = failCode(created.status, createdText, origin);
    return NextResponse.json(
      { error, origin },
      { status: error === "origin" ? 403 : error === "busy" ? 429 : 502 },
    );
  }

  const session = JSON.parse(createdText) as EmbedSession;
  if (!session.id) {
    return NextResponse.json({ error: "connect", origin }, { status: 502 });
  }

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    const probe = await fetch(`${API}/v1/embeds/sessions/${session.id}`, {
      headers,
    });
    const probeText = await probe.text();
    if (!probe.ok) {
      return NextResponse.json(
        { error: failCode(probe.status, probeText, origin), origin },
        { status: 502 },
      );
    }
    const body = JSON.parse(probeText) as EmbedSession;
    if (body.status === "READY" && body.sessionKey) {
      return NextResponse.json({
        sessionId: session.id,
        avatarId:
          session.avatarId ??
          body.avatarId ??
          (character === "moneyTree"
            ? process.env.NEXT_PUBLIC_RUNWAY_MONEY_TREE_AVATAR_ID ?? ""
            : ""),
        sessionKey: body.sessionKey,
      });
    }
    if (body.status === "FAILED" || body.status === "CANCELLED") {
      return NextResponse.json(
        { error: "connect", detail: body.failure || body.status, origin },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ error: "timeout", origin }, { status: 504 });
}
