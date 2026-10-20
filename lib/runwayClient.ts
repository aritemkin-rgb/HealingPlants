/**
 * Runway is a later avatar/presentation layer.
 * It is not the website, the knowledge base, or the recommendation engine.
 *
 * TODO: create a session with Maria's Runway account once 2FA is available.
 * TODO: map RUNWAY_AVATAR_ID_PRAIRIE_SAGE / MONEY_TREE to live avatars.
 * TODO: keep ElevenLabs (or another voice system) as a separate adapter later.
 */

export function getRunwayConfig() {
  const secret = process.env.RUNWAYML_API_SECRET || process.env.RUNWAY_API_KEY || "";
  return {
    secretPresent: Boolean(secret),
    prairieSageAvatarId: process.env.RUNWAY_AVATAR_ID_PRAIRIE_SAGE || "",
    moneyTreeAvatarId: process.env.RUNWAY_AVATAR_ID_MONEY_TREE || "",
    apiUrl: process.env.RUNWAY_API_URL || process.env.RUNWAY_SESSION_URL || "",
  };
}

export function isRunwayReady() {
  const config = getRunwayConfig();
  return Boolean(
    config.secretPresent &&
      (config.prairieSageAvatarId || config.moneyTreeAvatarId) &&
      process.env.CHAT_BACKEND === "runway",
  );
}

export async function createRunwaySession(_character: "prairie" | "moneyTree") {
  void _character;
  // TODO: POST to Runway session URL with server-side secret only.
  throw new Error("Runway session is not wired. Mock chat remains active.");
}

export async function sendRunwayUtterance(_input: {
  text: string;
  sessionId?: string;
  character: "prairie" | "moneyTree";
}): Promise<{ text: string; sessionId: string }> {
  void _input;
  throw new Error("Runway utterance is not wired. Mock chat remains active.");
}
