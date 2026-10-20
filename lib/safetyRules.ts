export const MEDICAL_DISCLAIMER =
  "This prototype offers educational plant guidance only and does not replace medical care. Check with a qualified professional before using herbs or supplements, especially if you take medication, are pregnant or breastfeeding, have a chronic condition, or are choosing something for a child or pet.";

export const SAFETY_SHORT =
  "Educational guidance only. Not a diagnosis, prescription, or substitute for a clinician.";

export const CONTENT_STATUS = {
  placeholder: "PLACEHOLDER",
  needsSource: "NEEDS SOURCE",
  toBeVerified: "TO BE VERIFIED",
} as const;

export function isHealthQuestion(text: string) {
  return /sleep|stress|anxious|anxiety|digest|stomach|nause|bloat|pain|sore|bruise|energy|tired|liver|detox|immune|skin|burn|women|hormon|diagnos|dose|dosage|pregnant|child|pet|safe for/i.test(
    text,
  );
}

export function isShoppingQuestion(text: string) {
  return /buy|bought|price|shop|store|seed|product|checkout|shopify|cart|order|grow kit|tool/i.test(
    text,
  );
}

export function forbiddenAdvicePatterns() {
  return [
    /stop (your )?med/i,
    /cure/i,
    /diagnos/i,
    /safe for everyone/i,
    /instead of (your )?doctor/i,
  ];
}
