import { moneyTree } from "./characters";
import { getPlant } from "./plants";
import { getProductsByKind, getProductsForPlant, products } from "./products";
import { isHealthQuestion } from "./safetyRules";
import type { ChatSuggestion, ProductKind } from "./types";

function listNames(names: string[]) {
  if (names.length === 0) return "nothing in this stall yet";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

const kindFromText = (text: string): ProductKind | undefined => {
  if (/seed/.test(text)) return "seeds";
  if (/tool|grow|pot|soil|grit|shear|tray/.test(text)) return "growing";
  if (/shopify|coming|future|soon/.test(text)) return "future";
  if (/product|salve|kit|buy|shop/.test(text)) return "product";
  return undefined;
};

export function getMoneyTreeReply(input: {
  userText: string;
  plantSlug?: string;
  plantName?: string;
}): { text: string; suggestions?: ChatSuggestion[] } {
  const text = input.userText.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return { text: moneyTree.greeting };
  }

  if (isHealthQuestion(text) && !/seed|product|buy|price|shop/.test(lower)) {
    return {
      text: "That’s Prairie Sage’s path. I sell and source. She orients. I’ll walk you back to the Healing Guide — no hard feelings, just the right stall.",
      suggestions: [
        { label: "Ask Prairie Sage", href: "/healing-guide" },
        { label: "Stay in the marketplace", href: "/marketplace" },
      ],
    };
  }

  if (/prairie|guide|back/.test(lower) && /sage|prairie|guide|healing/.test(lower)) {
    return {
      text: "Fair. I am the stall, not the map. Prairie Sage will take the compass back. The plants are still here when you want to buy or grow.",
      suggestions: [
        { label: "Back to Prairie Sage", href: "/healing-guide" },
        { label: "Stay in the stall", href: "/marketplace" },
      ],
    };
  }

  if (/shop by plant|by plant|which plant/.test(lower)) {
    return {
      text: "Pick a plant you already care about, then I will show the matching seed, start, or mock tin. Or stay on this page and use Shop by plant — the cards are the real storefront.",
      suggestions: [
        { label: "Peppermint", href: "/marketplace?plant=peppermint" },
        { label: "Lavender", href: "/marketplace?plant=lavender" },
        { label: "Arnica", href: "/marketplace?plant=arnica" },
        { label: "Aloe", href: "/marketplace?plant=aloe" },
      ],
    };
  }

  const plantSlug =
    input.plantSlug ||
    products.find((product) => product.plantSlug && lower.includes(product.plantSlug.replace("-", " ")))
      ?.plantSlug;
  const plant = plantSlug ? getPlant(plantSlug) : undefined;
  if (plant && (/plant|seed|buy|grow|product/.test(lower) || input.plantSlug)) {
    const matched = getProductsForPlant(plant.slug);
    return {
      text: `${plant.name} at the stall: ${listNames(matched.map((item) => item.name))}. Prices are mock. Shopify rails come later — I will not pretend a checkout exists if it does not.`,
      suggestions: [
        { label: `Shop ${plant.name}`, href: `/marketplace?plant=${plant.slug}` },
        { label: "Read the plant", href: `/library/${plant.slug}` },
      ],
    };
  }

  const kind = kindFromText(lower);
  if (kind) {
    const matched = getProductsByKind(kind);
    const headline =
      kind === "future"
        ? "These are labeled coming for a reason. Future Shopify paths, not a fake cart."
        : kind === "seeds"
          ? "Seeds first. Cheap, honest, and a little chaotic — the right way to start a healing garden."
          : kind === "growing"
            ? "Tools and soil. The unglamorous half of plant work, which is most of plant work."
            : "Mock products — salves, starts, kits. Touch the cards. Buy is a rehearsal until Shopify is live.";
    return {
      text: `${headline} On the shelf: ${listNames(matched.map((item) => item.name))}.`,
      suggestions: [
        { label: "View these", href: `/marketplace?kind=${kind}` },
        ...matched.slice(0, 3).map((item) => ({
          label: item.name,
          href: `/marketplace?kind=${kind}`,
        })),
      ],
    };
  }

  return {
    text: "I can fetch mock products, seeds, growing tools, or a plant-matched shelf. I can also send you back to Prairie Sage. Or close me and click. I like a customer who already knows how to walk a market.",
    suggestions: [
      { label: "Seeds", href: "/marketplace?kind=seeds" },
      { label: "Growing tools", href: "/marketplace?kind=growing" },
      { label: "Mock products", href: "/marketplace?kind=product" },
      { label: "Back to Prairie Sage", href: "/healing-guide" },
    ],
  };
}
