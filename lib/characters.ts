import type { ChatMode, GuideContext, QuickAction } from "./types";

export type CharacterProfile = {
  mode: ChatMode;
  name: string;
  role: string;
  image: string;
  description: string;
  greeting: string;
};

export const prairieSage: CharacterProfile = {
  mode: "prairie",
  name: "Prairie Sage",
  role: "Guide / Navigation",
  image: "/assets/characters/bubbles/prairie-sage.png",
  description:
    "The grounded intelligence of the platform. Calm, observant, warm — never hovering. She asks the right question and points you onward.",
  greeting:
    "Welcome to Healing Plants of the World. I’m Prairie Sage. I can help you find the right plant path. You can tell me how you’re feeling, choose a healing category, explore the plant library, or visit the marketplace. Where would you like to begin?",
};

export const moneyTree: CharacterProfile = {
  mode: "moneyTree",
  name: "Money Tree",
  role: "Marketplace / Store",
  image: "/assets/characters/bubbles/money-tree.png",
  description:
    "Clever, optimistic, and commercially fluent without the hard sell. He curates seeds, tools, mock products, and future Shopify paths.",
  greeting:
    "Welcome to the Marketplace. I’m Money Tree. I can help you explore products, seeds, growing tools, and future shop options. Are you looking for something to use, grow, gift, or learn more about?",
};

export const characters: Record<ChatMode, CharacterProfile> = {
  prairie: prairieSage,
  moneyTree,
  ambassador: {
    mode: "ambassador",
    name: "Plant Ambassador",
    role: "Category voice",
    image: "/assets/characters/close/prairie-sage.png",
    description:
      "Category ambassadors — Peppermint, Passionflower, Arnica, and the rest — can step in later. Prairie Sage still orients.",
    greeting:
      "An ambassador can take this from here later. For now I am filling in. What do you want to look at?",
  },
};

export const prairieQuickActions: QuickAction[] = [
  {
    id: "choose",
    label: "Help me choose",
    prompt: "Help me choose a plant. I am not sure where to start.",
    href: "/healing-guide",
  },
  {
    id: "sleep",
    label: "Sleep",
    prompt: "I need help with sleep.",
    href: "/healing-guide?concern=sleep",
  },
  {
    id: "stress",
    label: "Stress",
    prompt: "I am looking for plants for stress and mood.",
    href: "/healing-guide?concern=stress",
  },
  {
    id: "digestion",
    label: "Digestion",
    prompt: "Which plants support digestion?",
    href: "/healing-guide?concern=digestion",
  },
  {
    id: "pain",
    label: "Pain",
    prompt: "I want plants used for pain and recovery.",
    href: "/healing-guide?concern=pain",
  },
  {
    id: "library",
    label: "Browse library",
    prompt: "Show me how to browse the plant library.",
    href: "/#archive",
  },
];

export const moneyTreeQuickActions: QuickAction[] = [
  {
    id: "products",
    label: "Show products",
    prompt: "Show me mock products.",
    href: "/marketplace?kind=product",
  },
  {
    id: "seeds",
    label: "Seeds",
    prompt: "I want to see seeds.",
    href: "/marketplace?kind=seeds",
  },
  {
    id: "tools",
    label: "Growing tools",
    prompt: "Show growing tools.",
    href: "/marketplace?kind=growing",
  },
  {
    id: "by-plant",
    label: "Shop by plant",
    prompt: "Help me shop by plant.",
    href: "/marketplace",
  },
  {
    id: "back-prairie",
    label: "Back to Prairie Sage",
    prompt: "Take me back to Prairie Sage.",
    href: "/healing-guide",
  },
];

export function plantProfileQuickActions(plantName: string): QuickAction[] {
  return [
    {
      id: "ask-plant",
      label: "Want to ask about this plant?",
      prompt: `Tell me about ${plantName}.`,
    },
    {
      id: "safety",
      label: "Need safety notes?",
      prompt: `What are the safety notes for ${plantName}?`,
    },
    {
      id: "compare",
      label: "Want to compare this with another plant?",
      prompt: `What should I compare ${plantName} with?`,
    },
    ...prairieQuickActions.filter((action) => action.id === "library"),
  ];
}

export function collapsedLabelFor(context: GuideContext, mode: ChatMode) {
  if (mode === "moneyTree") return "Ask Money Tree";
  switch (context) {
    case "library":
      return "Need help finding a plant?";
    case "plantProfile":
      return "Want to ask about this plant?";
    case "healingGuide":
      return "Need help?";
    default:
      return "Ask Prairie Sage";
  }
}

export function starterMessageFor(
  context: GuideContext,
  mode: ChatMode,
  plantName?: string,
) {
  if (mode === "moneyTree") return moneyTree.greeting;
  if (context === "library") {
    return "Need help finding a plant? Name a benefit, a geography, or a plant name. The filters on this page work without me.";
  }
  if (context === "plantProfile" && plantName) {
    return `${plantName} is on the table. Ask about uses, safety, growing, or a comparison — or keep reading. I am optional.`;
  }
  if (context === "healingGuide") {
    return "Choose a category on the page, or tell me how you feel. Either path works. Chat is a helper, not a gate.";
  }
  return prairieSage.greeting;
}
