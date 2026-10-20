import { prairieSage } from "./characters";
import { getPlant, plants, searchPlants } from "./plants";
import { getRecommendations } from "./recommendationEngine";
import { isShoppingQuestion } from "./safetyRules";
import type { ChatSuggestion, GuideContext, PlantConcern } from "./types";

const concernAliases: Record<string, PlantConcern> = {
  sleep: "sleep",
  insomnia: "sleep",
  rest: "sleep",
  night: "sleep",
  stress: "stress",
  anxiety: "stress",
  calm: "stress",
  nervous: "stress",
  digestion: "digestion",
  stomach: "digestion",
  nausea: "digestion",
  gut: "digestion",
  bloating: "digestion",
  pain: "pain",
  bruise: "pain",
  sore: "pain",
  recovery: "pain",
  muscle: "pain",
  energy: "energy",
  vitality: "energy",
  tired: "energy",
  stamina: "energy",
  liver: "liver",
  detox: "liver",
  immunity: "immunity",
  immune: "immunity",
  cold: "immunity",
  skin: "skin",
  burn: "skin",
  sun: "skin",
  women: "womens-care",
  woman: "womens-care",
  menopause: "womens-care",
  hormone: "womens-care",
};

function listNames(names: string[]) {
  if (names.length === 0) return "none I would put forward from this shelf";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function detectConcerns(text: string): PlantConcern[] {
  const lower = text.toLowerCase();
  const found: PlantConcern[] = [];
  for (const [alias, concern] of Object.entries(concernAliases)) {
    if (new RegExp(`\\b${alias}\\b`, "i").test(lower) && !found.includes(concern)) {
      found.push(concern);
    }
  }
  return found;
}

function detectPlant(text: string) {
  const lower = text.toLowerCase();
  return plants.find(
    (plant) =>
      lower.includes(plant.name.toLowerCase()) ||
      lower.includes(plant.slug.replace("-", " ")) ||
      lower.includes(plant.latinName.toLowerCase()),
  );
}

export function getPrairieReply(input: {
  userText: string;
  context: GuideContext;
  plantSlug?: string;
  plantName?: string;
}): { text: string; suggestions?: ChatSuggestion[] } {
  const text = input.userText.trim();
  const lower = text.toLowerCase();
  const contextPlant = input.plantSlug ? getPlant(input.plantSlug) : undefined;
  const namedPlant = detectPlant(text) ?? contextPlant;

  if (!text) {
    return { text: prairieSage.greeting };
  }

  if (
    /help me choose|not sure|where to start|don't know|dont know|overwhelmed/.test(
      lower,
    )
  ) {
    return {
      text: "Then do not start with a catalog. Start with a sensation. Sleep, stomach, pain, a frayed nervous system — pick one on the Healing Guide. I will not quiz you. The cards are the path; I am only a lantern.",
      suggestions: [
        { label: "Open Healing Guide", href: "/healing-guide" },
        { label: "Sleep", prompt: "I need help with sleep." },
        { label: "Stress", prompt: "I am looking for plants for stress and mood." },
        { label: "Digestion", prompt: "Which plants support digestion?" },
      ],
    };
  }

  if (isShoppingQuestion(text)) {
    return {
      text: "That is Olive Tree’s stall, not mine. I can point you there for products, seeds, growing tools, and the future shop path. I stay with plant guidance.",
      suggestions: [
        { label: "Ask Olive Tree", href: "/marketplace" },
        { label: "Shop by plant", href: "/marketplace" },
      ],
    };
  }

  if (/library|browse|archive|alphabet/.test(lower)) {
    return {
      text: "The library is a room you can walk. Sort A–Z, by benefit, or by geography. You do not need me to enter it. If a name is stuck on your tongue, say it and I will point.",
      suggestions: [
        { label: "Open the library", href: "/library" },
        { label: "By geography", href: "/library?sort=geography" },
        { label: "By benefit", href: "/library?sort=benefit" },
      ],
    };
  }

  if (/compar/.test(lower) && namedPlant) {
    const cousins = plants
      .filter(
        (plant) =>
          plant.slug !== namedPlant.slug &&
          plant.concerns.some((concern) => namedPlant.concerns.includes(concern)),
      )
      .slice(0, 2);
    return {
      text: `If you are holding ${namedPlant.name}, look sideways at ${listNames(cousins.map((plant) => plant.name))}. Same neighborhood of need, different manners. Read the cautions on each profile before you decide they are interchangeable — they are not.`,
      suggestions: cousins.map((plant) => ({
        label: plant.name,
        href: `/library/${plant.slug}`,
      })),
    };
  }

  if (/safety|caution|contraindicat|warning|side effect|interact/.test(lower)) {
    if (namedPlant) {
      return {
        text: `${namedPlant.name} is not a personality. It is a plant with edges.\n\n${namedPlant.precautions.map((item) => `• ${item}`).join("\n")}\n\nThis site is a guide, not a clinic. If you take medicines, are pregnant, or the trouble is acute, speak with a clinician who can see you.`,
        suggestions: [
          { label: `Open ${namedPlant.name}`, href: `/library/${namedPlant.slug}` },
        ],
      };
    }
    return {
      text: "Safety first, always. Open a plant profile and read Precautions before you grow, brew, or buy. I will name the edges when you name the plant. I will not pretend a tea is a diagnosis.",
    };
  }

  if (namedPlant && (contextPlant?.slug === namedPlant.slug || detectPlant(text))) {
    const others = plants
      .filter(
        (plant) =>
          plant.slug !== namedPlant.slug &&
          plant.concerns.some((concern) => namedPlant.concerns.includes(concern)),
      )
      .slice(0, 2);
    return {
      text: `${namedPlant.name} — ${namedPlant.region}. ${namedPlant.summary}\n\nIf you want the body of knowledge, open the profile: uses, preparation, growing, and the cautions I will not skip. Chat is optional.`,
      suggestions: [
        { label: "Open profile", href: `/library/${namedPlant.slug}` },
        { label: "Safety notes", prompt: `What are the safety notes for ${namedPlant.name}?` },
        { label: "Buy / grow", href: `/marketplace?plant=${namedPlant.slug}` },
        ...others.map((plant) => ({
          label: `Compare ${plant.name}`,
          href: `/library/${plant.slug}`,
        })),
      ],
    };
  }

  const detectedConcerns = detectConcerns(text);
  if (detectedConcerns.length) {
    const matches = getRecommendations({ concerns: detectedConcerns }).slice(0, 3);
    const names = matches.map((item) => item.plant.name);
    const overlap = detectedConcerns.length > 1;
    return {
      text: overlap
        ? `I hear more than one path. I would start with ${listNames(names)}. The Healing Guide can hold those concerns on the same card. Content is placeholder until Maria’s sources are in.`
        : `For that, I would start with ${listNames(names)}. Small group, not a catalog. The Healing Guide cards will show the same path. Content is placeholder until Maria’s sources are in.`,
      suggestions: [
        {
          label: overlap ? "See this overlap" : "See these plants",
          href: `/healing-guide?concerns=${detectedConcerns.join(",")}`,
        },
        ...matches.map((item) => ({
          label: item.plant.name,
          href: `/library/${item.plant.slug}`,
        })),
      ],
    };
  }

  const searchHits = searchPlants(text);
  if (text.length > 2 && searchHits.length && searchHits.length < plants.length) {
    return {
      text: `That lands near ${listNames(searchHits.slice(0, 4).map((plant) => plant.name))}. Use the library search if you want to scan with your eyes instead of mine.`,
      suggestions: searchHits.slice(0, 4).map((plant) => ({
        label: plant.name,
        href: `/library/${plant.slug}`,
      })),
    };
  }

  if (input.context === "library") {
    return {
      text: "Say a benefit, a place — Mediterranean, East Asia, the Americas — or a plant name. Or ignore this panel and use the filters. They work without me.",
      suggestions: [
        { label: "Sleep plants", href: "/library?benefit=sleep" },
        { label: "Mediterranean", href: "/library?geo=Mediterranean" },
        { label: "A–Z", href: "/library?sort=alpha" },
      ],
    };
  }

  return {
    text: "I heard you. If you name a need — sleep, stress, digestion, pain — I can point. If you name a plant, I can open a path to its page. If you would rather not talk, close this and keep clicking. That is the correct use of me.",
    suggestions: [
      { label: "Healing Guide", href: "/healing-guide" },
      { label: "Plant library", href: "/library" },
    ],
  };
}
