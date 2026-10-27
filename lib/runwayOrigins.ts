export const LOCAL_RUNWAY_ORIGINS = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
] as const;

export const LIVE_RUNWAY_ORIGINS = [
  "https://healingplantsoftheworld.net",
  "https://www.healingplantsoftheworld.net",
] as const;

export function isLocalRunwayOrigin(origin: string) {
  return LOCAL_RUNWAY_ORIGINS.includes(
    origin as (typeof LOCAL_RUNWAY_ORIGINS)[number],
  );
}

export function runwayOriginHelp(
  currentOrigin: string,
  characterName = "Sage",
) {
  const lines = [
    ...new Set([
      ...LOCAL_RUNWAY_ORIGINS,
      ...LIVE_RUNWAY_ORIGINS,
      currentOrigin,
    ]),
  ];
  return `Runway is not allowing ${currentOrigin}. Open the ${characterName} character in Runway → Embed → Allowed origins → Edit, and add these, one per line:\n${lines.join("\n")}`;
}

export function runwayKeyHelp(characterName = "Sage") {
  return `${characterName}’s Runway public key was rejected. Open that character in Runway → Embed, copy a new public key from the script (data-pub-key), and replace the one in this project. Allowed origins should still include localhost and healingplantsoftheworld.net.`;
}
