import { NextResponse } from "next/server";
import { isLocalRunwayOrigin } from "@/lib/runwayOrigins";

const API = "https://api.dev.runwayml.com";
const SAGE_PUB_KEY =
  process.env.NEXT_PUBLIC_RUNWAY_WIDGET_PUB_KEY ??
  "pub_c881bc2620f4e134ed3f9f21099196000bb0aa16387acb1d87a92d0e34c1aaf4";
const MONEY_TREE_PUB_KEY =
  process.env.NEXT_PUBLIC_RUNWAY_MONEY_TREE_PUB_KEY ??
  "pub_bdc7bab250df944cb85932dee671a5f4833c23b16a3f7c5432d99202b2095042";
const MONEY_TREE_AVATAR =
  process.env.NEXT_PUBLIC_RUNWAY_MONEY_TREE_AVATAR_ID ??
  "f436b9d2-8d6c-469d-b5e8-4d325323e92f";
const SAGE_AVATAR =
  process.env.RUNWAY_AVATAR_ID_PRAIRIE_SAGE ??
  process.env.NEXT_PUBLIC_RUNWAY_AVATAR_ID_PRAIRIE_SAGE ??
  "";

export const maxDuration = 60;

type Character = "prairie" | "moneyTree";
type Fail = "origin" | "key" | "busy" | "connect" | "timeout";

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

function avatarFor(character: Character) {
  return character === "moneyTree" ? MONEY_TREE_AVATAR : SAGE_AVATAR;
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

function failCode(status: number, text: string, origin: string): Fail {
  const lower = text.toLowerCase();
  if (status === 403 || lower.includes("origin") || lower.includes("allow")) {
    return "origin";
  }
  if (status === 401) return isLocalRunwayOrigin(origin) ? "key" : "origin";
  if (
    status === 409 ||
    status === 429 ||
    status === 503 ||
    lower.includes("busy") ||
    lower.includes("concurrent") ||
    lower.includes("capacity") ||
    lower.includes("in use") ||
    lower.includes("limit")
  ) {
    return "busy";
  }
  return "connect";
}

function failStatus(error: Fail) {
  if (error === "origin") return 403;
  if (error === "busy") return 429;
  if (error === "timeout") return 504;
  return 502;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cancelSession(id: string, headers: HeadersInit) {
  try {
    await fetch(`${API}/v1/embeds/sessions/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch {
    /* leftover sessions fail on their own; ignore cancel errors */
  }
}

async function pollReady(
  id: string,
  headers: HeadersInit,
  character: Character,
  origin: string,
  createdAvatar: string,
) {
  for (let attempt = 0; attempt < 45; attempt += 1) {
    if (attempt > 0) await wait(400);
    const probe = await fetch(`${API}/v1/embeds/sessions/${id}`, { headers });
    const probeText = await probe.text();
    if (!probe.ok) {
      return {
        ok: false as const,
        error: failCode(probe.status, probeText, origin),
        detail: probeText.slice(0, 200),
      };
    }
    const body = JSON.parse(probeText) as EmbedSession;
    if (body.status === "READY" && body.sessionKey) {
      return {
        ok: true as const,
        sessionId: id,
        avatarId: createdAvatar || body.avatarId || avatarFor(character),
        sessionKey: body.sessionKey,
      };
    }
    if (body.status === "FAILED" || body.status === "CANCELLED") {
      return {
        ok: false as const,
        error: "connect" as const,
        detail: body.failure || body.status,
      };
    }
  }
  await cancelSession(id, headers);
  return { ok: false as const, error: "timeout" as const, detail: "" };
}

export async function DELETE(request: Request) {
  const incomingOrigin = request.headers.get("origin") || "";
  let bodyOrigin = "";
  let character: Character = "prairie";
  let sessionId = "";
  try {
    const payload = (await request.json()) as {
      origin?: string;
      character?: string;
      sessionId?: string;
    };
    bodyOrigin = payload.origin ?? "";
    sessionId = payload.sessionId ?? "";
    if (payload.character === "moneyTree") character = "moneyTree";
  } catch {
    bodyOrigin = "";
  }
  if (!sessionId) {
    return NextResponse.json({ ok: true });
  }
  const origin = incomingOrigin || bodyOrigin || "http://127.0.0.1:3000";
  await cancelSession(sessionId, runwayHeaders(origin, pubKeyFor(character)));
  return NextResponse.json({ ok: true });
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
  const avatarId = avatarFor(character);
  const createBody = avatarId ? JSON.stringify({ avatarId }) : "{}";

  let lastError: Fail = "connect";
  let lastDetail = "";

  for (let round = 0; round < 3; round += 1) {
    if (round > 0) await wait(lastError === "busy" ? 7000 : 2500);

    const created = await fetch(`${API}/v1/embeds/sessions`, {
      method: "POST",
      headers,
      body: createBody,
    });
    const createdText = await created.text();

    if (!created.ok) {
      lastError = failCode(created.status, createdText, origin);
      lastDetail = createdText.slice(0, 200);
      if (lastError === "busy" || lastError === "connect") continue;
      return NextResponse.json(
        { error: lastError, origin },
        { status: failStatus(lastError) },
      );
    }

    const session = JSON.parse(createdText) as EmbedSession;
    if (!session.id) {
      lastError = "connect";
      continue;
    }

    const ready = await pollReady(
      session.id,
      headers,
      character,
      origin,
      session.avatarId ?? avatarId,
    );
    if (ready.ok) {
      return NextResponse.json({
        sessionId: ready.sessionId,
        avatarId: ready.avatarId,
        sessionKey: ready.sessionKey,
      });
    }

    lastError = ready.error;
    lastDetail = ready.detail;
    if (lastError === "origin" || lastError === "key") {
      return NextResponse.json(
        { error: lastError, origin },
        { status: failStatus(lastError) },
      );
    }
  }

  return NextResponse.json(
    { error: lastError, origin, detail: lastDetail || undefined },
    { status: failStatus(lastError) },
  );
}
