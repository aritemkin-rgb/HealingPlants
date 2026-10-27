export type ChatMode = "prairie" | "moneyTree" | "ambassador";

export type GuideContext =
  | "home"
  | "healingGuide"
  | "library"
  | "marketplace"
  | "plantProfile";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ChatBackendName = "mock" | "runway";

export type ChatRequestBody = {
  messages: Pick<ChatMessage, "role" | "content">[];
  mode: ChatMode;
  context: GuideContext;
  plantSlug?: string;
  plantName?: string;
};

export type ChatSuggestion = {
  label: string;
  prompt?: string;
  href?: string;
};

export type ChatApiResponse = {
  backend: ChatBackendName;
  runwayReady: boolean;
  message: ChatMessage;
  suggestions?: ChatSuggestion[];
};

export type QuickAction = {
  id: string;
  label: string;
  prompt: string;
  href?: string;
};

export type PlantConcern =
  | "sleep"
  | "stress"
  | "digestion"
  | "pain"
  | "energy"
  | "liver"
  | "immunity"
  | "skin"
  | "womens-care";

export type Plant = {
  slug: string;
  name: string;
  latinName: string;
  region: string;
  geography: string;
  concerns: PlantConcern[];
  ambassador?: string;
  summary: string;
  benefits: string[];
  traditionalUses: string;
  preparation: string;
  grow: string;
  precautions: string[];
  gardenNotes: string[];
};

export type ProductKind = "liquid" | "supplements" | "teas-and-herbs";

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  plantSlug?: string;
  price: string;
  blurb: string;
  image?: string;
  shopifyPath?: string;
};
