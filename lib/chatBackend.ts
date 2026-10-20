import { isRunwayReady, sendRunwayUtterance } from "@/lib/runwayClient";
import type { ChatBackendName } from "./types";

export function isRunwayConfigured() {
  return isRunwayReady();
}

export function resolveChatBackend(): ChatBackendName {
  return isRunwayReady() ? "runway" : "mock";
}

export async function sendRunwayMessage(input: {
  text: string;
  sessionId?: string;
  character?: "prairie" | "moneyTree";
}) {
  return sendRunwayUtterance({
    text: input.text,
    sessionId: input.sessionId,
    character: input.character ?? "prairie",
  });
}

export function newMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
