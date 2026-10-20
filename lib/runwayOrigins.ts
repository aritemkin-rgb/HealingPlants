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

export function runwayOriginHelp(currentOrigin: string) {
  const lines = [
    ...new Set([
      ...LOCAL_RUNWAY_ORIGINS,
      ...LIVE_RUNWAY_ORIGINS,
      currentOrigin,
    ]),
  ];
  return `Runway is not allowing ${currentOrigin}. Open the Sage character in Runway → Embed → Allowed origins → Edit, and add these, one per line:\n${lines.join("\n")}`;
}
