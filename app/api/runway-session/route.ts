import { NextResponse } from "next/server";
import { isRunwayReady, getRunwayConfig, createRunwaySession } from "@/lib/runwayClient";

/**
 * Session bootstrap for a later Runway avatar.
 * Empty env vars must never break the website.
 */
export async function GET() {
  const config = getRunwayConfig();
  const ready = isRunwayReady();
  return NextResponse.json({
    configured: ready,
    backend: ready ? "runway" : "mock",
    avatars: {
      prairieSage: Boolean(config.prairieSageAvatarId),
      moneyTree: Boolean(config.moneyTreeAvatarId),
    },
    message: ready
      ? "Runway variables are present. Wire the avatar client when you are ready."
      : "Runway is not configured. GuideBubble is using local mock chat.",
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    character?: "prairie" | "moneyTree";
  };

  if (!isRunwayReady()) {
    return NextResponse.json({
      configured: false,
      backend: "mock",
      sessionId: null,
      message: "No Runway session created. Mock chat remains active.",
    });
  }

  try {
    const session = await createRunwaySession(body.character ?? "prairie");
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({
      configured: true,
      backend: "mock",
      sessionId: null,
      message:
        error instanceof Error
          ? error.message
          : "Runway keys are present, but the live avatar session is not implemented yet.",
    });
  }
}
