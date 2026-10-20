import { NextResponse } from "next/server";
import {
  isRunwayConfigured,
  newMessageId,
  resolveChatBackend,
  sendRunwayMessage,
} from "@/lib/chatBackend";
import { getPrairieReply } from "@/lib/mockPrairieResponses";
import type { ChatApiResponse, ChatRequestBody } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const lastUser = [...(body.messages ?? [])]
    .reverse()
    .find((message) => message.role === "user");
  const userText = lastUser?.content ?? "";
  const runwayReady = isRunwayConfigured();
  const backend = resolveChatBackend();

  if (backend === "runway") {
    try {
      const runway = await sendRunwayMessage({ text: userText, character: "prairie" });
      const payload: ChatApiResponse = {
        backend: "runway",
        runwayReady,
        message: {
          id: newMessageId(),
          role: "assistant",
          content: runway.text,
          createdAt: new Date().toISOString(),
        },
      };
      return NextResponse.json(payload);
    } catch {
      // Fall through to mock so the site never depends on Runway.
    }
  }

  const reply = getPrairieReply({
    userText,
    context: body.context,
    plantSlug: body.plantSlug,
    plantName: body.plantName,
  });

  const payload: ChatApiResponse = {
    backend: "mock",
    runwayReady,
    message: {
      id: newMessageId(),
      role: "assistant",
      content: reply.text,
      createdAt: new Date().toISOString(),
    },
    suggestions: reply.suggestions,
  };

  return NextResponse.json(payload);
}
