/** Image map from the July 256 trial + October plant stills. Do not invent plants here. */

export const sageFull = "/assets/characters/full/prairie-sage.png";
export const sageClose = "/assets/characters/close/prairie-sage.png";
export const sageBubble = "/assets/characters/bubbles/prairie-sage.png";
export const sageHomeVideo = "/assets/home/prairie-sage.mp4";
export const moneyTreeFull = "/assets/characters/full/money-tree.png";
export const moneyTreeBubble = "/assets/characters/bubbles/money-tree.png";
export const moneyTreeHomeVideo = "/assets/home/money-tree.mp4";
export const dirtGround = "/assets/dirt/dirt.png";
export const dirtLayer = "/assets/dirt/dirt-layer.jpg";
export const dirtFooter = "/assets/dirt/dirt-footer.png";
export const logoDirt = "/assets/logo/logo-dirt.png";

export const loadingVideos = {
  orchid: "/assets/loading/orchid.mp4",
  prairieSage: "/assets/home/prairie-sage.mp4",
  passionflower: "/assets/loading/passionflower.mp4",
  ginseng: "/assets/loading/ginseng.mp4",
  moneyTree: "/assets/home/money-tree.mp4",
} as const;

/** Healing-path ambassadors that have character art. */
export const healingAmbassadorSlugs = [
  "passionflower",
  "lavender",
  "ginger",
  "ginseng",
  "clove",
  "arnica",
  "aloe",
  "milk-thistle",
  "maca",
] as const;

/** Characters with round portraits, including Peppermint (social / PR). */
const characterBubbleBySlug: Record<string, string> = {
  peppermint: "/assets/characters/bubbles/peppermint.png",
  passionflower: "/assets/characters/bubbles/passionflower.png",
  lavender: "/assets/characters/bubbles/lavender.png",
  ginger: "/assets/characters/bubbles/ginger.png",
  ginseng: "/assets/characters/bubbles/ginseng.png",
  clove: "/assets/characters/bubbles/clove.png",
  arnica: "/assets/characters/bubbles/arnica.png",
  aloe: "/assets/characters/bubbles/aloe.png",
  "milk-thistle": "/assets/characters/bubbles/milk-thistle.png",
};

const characterFullBySlug: Record<string, string> = {
  passionflower: "/assets/characters/full/passionflower.png",
  lavender: "/assets/characters/full/lavender.png",
  ginger: "/assets/characters/full/ginger.png",
  ginseng: "/assets/characters/full/ginseng.png",
  clove: "/assets/characters/full/clove.png",
  arnica: "/assets/characters/full/arnica.png",
  aloe: "/assets/characters/full/aloe.png",
  "milk-thistle": "/assets/characters/full/milk-thistle.png",
};

const botanicalBySlug: Record<string, string> = {
  aloe: "/assets/plants/aloe.jpg",
  arnica: "/assets/plants/arnica.png",
  ashwagandha: "/assets/plants/ashwagandha.jpg",
  astragalus: "/assets/plants/astragalus.png",
  bacopa: "/assets/plants/bacopa.png",
  calendula: "/assets/plants/calendula.jpg",
  cannabis: "/assets/plants/cannabis.jpg",
  "cats-claw": "/assets/plants/cats-claw.png",
  chamomile: "/assets/plants/chamomile.jpg",
  cinnamon: "/assets/plants/cinnamon.png",
  clove: "/assets/plants/clove.png",
  dandelion: "/assets/plants/dandelion.png",
  "dragon-blood": "/assets/plants/dragon-blood.png",
  echinacea: "/assets/plants/echinacea.jpg",
  elderberry: "/assets/plants/elderberry.jpg",
  fennel: "/assets/plants/fennel.png",
  garlic: "/assets/plants/garlic.png",
  ginger: "/assets/plants/ginger.jpg",
  ginkgo: "/assets/plants/ginkgo.jpg",
  ginseng: "/assets/plants/ginseng.jpg",
  "gotu-kola": "/assets/plants/gotu-kola.png",
  "green-tea": "/assets/plants/green-tea.png",
  guayusa: "/assets/plants/guayusa.png",
  hibiscus: "/assets/plants/hibiscus.png",
  kava: "/assets/plants/kava.png",
  lavender: "/assets/plants/lavender.jpg",
  "lemon-balm": "/assets/plants/lemon-balm.png",
  licorice: "/assets/plants/licorice.png",
  maca: "/assets/plants/maca.png",
  "milk-thistle": "/assets/plants/milk-thistle.jpg",
  moringa: "/assets/plants/moringa.png",
  mullein: "/assets/plants/mullein.jpg",
  nettle: "/assets/plants/nettle.png",
  nigella: "/assets/plants/nigella.png",
  oregano: "/assets/plants/oregano.jpg",
  parsley: "/assets/plants/parsley.png",
  passionflower: "/assets/plants/passionflower.png",
  peppermint: "/assets/plants/peppermint.jpg",
  rosemary: "/assets/plants/rosemary.jpg",
  saffron: "/assets/plants/saffron.png",
  sage: "/assets/plants/sage.png",
  "saw-palmetto": "/assets/plants/saw-palmetto.png",
  "st-johns-wort": "/assets/plants/st-johns-wort.png",
  "tea-tree": "/assets/plants/tea-tree.png",
  thyme: "/assets/plants/thyme.jpg",
  turmeric: "/assets/plants/turmeric.jpg",
  valerian: "/assets/plants/valerian.jpg",
};

const stockBySlug: Record<string, string> = {
  eucalyptus: "/assets/plants/eucalyptus.jpg",
  coca: "/assets/plants/coca.jpg",
  callisia: "/assets/plants/callisia.jpg",
  datura: "/assets/plants/datura.jpg",
  fig: "/assets/plants/fig.jpg",
  feverfew: "/assets/plants/feverfew.jpg",
  spearmint: "/assets/plants/spearmint.jpg",
  "water-mint": "/assets/plants/water-mint.jpg",
};

export function hasCharacterArt(slug: string) {
  return Boolean(characterBubbleBySlug[slug]);
}

export function plantBubble(slug: string) {
  return characterBubbleBySlug[slug];
}

export function plantFullBody(slug: string) {
  return characterFullBySlug[slug];
}

export function hasPlantImage(slug: string) {
  return Boolean(botanicalBySlug[slug] ?? stockBySlug[slug]);
}

export function plantStock(slug: string) {
  return botanicalBySlug[slug] ?? stockBySlug[slug];
}

export function plantPortraitSrc(slug: string) {
  return botanicalBySlug[slug] ?? stockBySlug[slug];
}

export function plantPortraitKind(slug: string): "botanical" | "none" {
  if (botanicalBySlug[slug] || stockBySlug[slug]) return "botanical";
  return "none";
}
