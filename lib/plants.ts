import { addedPlants } from "./addedPlants";
import { hasPlantImage } from "./media";
import { stockPlants } from "./stockPlants";
import type { Plant, PlantConcern } from "./types";

export const concerns: { id: PlantConcern; label: string; prompt: string }[] = [
  { id: "sleep", label: "Sleep", prompt: "I need help winding down at night." },
  { id: "stress", label: "Stress + Mood", prompt: "I am carrying a lot of stress." },
  { id: "digestion", label: "Digestive", prompt: "I want plants that support digestion." },
  { id: "pain", label: "Pain + Recovery", prompt: "I am looking for plants used for pain and recovery." },
  { id: "energy", label: "Energy + Focus", prompt: "I need more steady energy." },
  { id: "liver", label: "Liver + Detox", prompt: "I want to learn about liver-supportive plants." },
  { id: "immunity", label: "Immunity", prompt: "Which plants are used for immune support?" },
  { id: "skin", label: "Skin + Repair", prompt: "I am looking for skin and repair plants." },
  { id: "womens-care", label: "Women’s Care", prompt: "I want plants traditionally used in women’s care." },
];

const corePlants = [
  {
    slug: "peppermint",
    name: "Peppermint",
    latinName: "Mentha × piperita",
    region: "Europe",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "Cool, fast, and a little too sure of itself. Peppermint is one of the most recognizable digestive plants on the platform — and the public-facing personality of Healing Plants.",
    benefits: [
      "Eases occasional digestive discomfort",
      "Cooling aroma for tension headaches",
      "Fresh culinary and tea use",
    ],
    traditionalUses:
      "European herbal traditions have long used peppermint leaf as an after-meal tea and a cooling aromatic. In the garden it spreads with confidence, which is part of its character: keep it in a pot if you want neighbors.",
    preparation:
      "Fresh or dried leaf as tea. Inhale the steam before sipping. Culinary use in food and water. Essential oil is much stronger than the leaf and should not be used internally unless a qualified practitioner directs it.",
    grow: "Loves moisture and a little shade. Contain the roots or it will take the bed. Separate from plants that dislike aggressive neighbors.",
    precautions: [
      "May worsen reflux in some people.",
      "Essential oil is not a casual internal remedy.",
      "Keep away from the faces of infants and young children.",
    ],
    gardenNotes: ["Spreads aggressively", "Pollinator friendly", "Best in containers"],
  },
  {
    slug: "passionflower",
    name: "Passionflower",
    latinName: "Passiflora incarnata",
    region: "Americas",
    geography: "Americas",
    concerns: ["sleep", "stress"],
    ambassador: "Passionflower",
    summary:
      "A climbing vine with intricate flowers, used in the Americas for restlessness and a mind that will not dim the lights.",
    benefits: [
      "Traditionally used for restless sleep",
      "Calming support when thoughts loop",
      "Ornamental vine for trellises",
    ],
    traditionalUses:
      "Indigenous and later folk traditions in the Americas used aerial parts of Passiflora incarnata for nervous unrest and sleeplessness. The flower itself looks like a lesson in patience: many parts, one bloom.",
    preparation:
      "Dried aerial parts as tea or in a practitioner-prepared extract. Evening use is common. Combine only with other calming plants when you understand the stacking effect.",
    grow: "Wants a trellis, warmth, and well-drained soil. Perennial in milder climates; a spectacular annual vine elsewhere.",
    precautions: [
      "May increase drowsiness with other calming herbs or medicines.",
      "Not a substitute for care when sleep loss is severe or sudden.",
    ],
    gardenNotes: ["Needs a trellis", "Showy flowers", "Pollinator magnet"],
  },
  {
    slug: "arnica",
    name: "Arnica",
    latinName: "Arnica montana",
    region: "Europe",
    geography: "Europe",
    concerns: ["pain"],
    ambassador: "Arnica",
    summary:
      "Keep moving. Recover. Arnica is the mountain flower people reach for after a bruise, a fall, or a hard training day — used on the skin, not in the teacup.",
    benefits: [
      "Traditional topical use for bruises and sore muscle",
      "Recovery companion after strain",
      "Alpine meadow ecology",
    ],
    traditionalUses:
      "European mountain medicine has long used arnica flower preparations on unbroken skin after impact. The plant’s story is recovery, not bravado: it does not belong inside the body as a homemade tea.",
    preparation:
      "Prepared gels, oils, and ointments on unbroken skin. Homeopathic and professional preparations exist; wild harvesting of Arnica montana is a conservation concern.",
    grow: "Alpine, sharp drainage, lean soil. Difficult as a casual houseplant. Support cultivated sources rather than wild-dug plants.",
    precautions: [
      "Do not use on broken skin.",
      "Not for internal use unless a licensed preparation and practitioner say otherwise.",
      "Can irritate sensitive skin. Patch test first.",
    ],
    gardenNotes: ["Conservation-sensitive", "Sunny alpine conditions", "Topical only"],
  },
  {
    slug: "ginseng",
    name: "Ginseng",
    latinName: "Panax ginseng",
    region: "East Asia",
    geography: "East Asia",
    concerns: ["energy"],
    ambassador: "Ginseng",
    summary:
      "A slow root with a long reputation for vitality. Ginseng is not a caffeine substitute. It is a plant people return to when they want stamina with some respect attached.",
    benefits: [
      "Traditional vitality and stamina support",
      "Used in East Asian herbal systems for depletion",
      "Shade-garden woodland plant",
    ],
    traditionalUses:
      "Korean and Chinese herbal traditions distinguish types and preparations of Panax. The root is the medicine. Age, growing method, and processing change the character of the plant in the jar.",
    preparation:
      "Decoction of dried root, professional extracts, or culinary simmering. Dose and form vary widely. This is a plant to learn before you improvise.",
    grow: "Woodland shade, patience, and years. Wild populations have been pressured by harvest. Prefer cultivated root.",
    precautions: [
      "May not suit everyone with high blood pressure, insomnia, or hormone-sensitive conditions.",
      "Can interact with medicines. Ask a clinician if you take prescriptions.",
      "More is not better.",
    ],
    gardenNotes: ["Slow to mature", "Deep shade", "Buy cultivated root"],
  },
  {
    slug: "milk-thistle",
    name: "Milk Thistle",
    latinName: "Silybum marianum",
    region: "Mediterranean",
    geography: "Mediterranean",
    concerns: ["liver", "digestion"],
    ambassador: "Milk Thistle",
    summary:
      "Spined, silver-veined, and stubbornly useful. Milk thistle seed is one of the most studied traditional liver plants — and a striking presence in a dry garden.",
    benefits: [
      "Traditional liver support",
      "Antioxidant seed constituents",
      "Drought-tolerant architectural plant",
    ],
    traditionalUses:
      "Mediterranean folk use and later European herbal practice centered on the seed for liver and digestive support. The plant is also wildlife food and a survivor in poor soil.",
    preparation:
      "Ground seed, standardized extracts, or teas. The seed is the usual medicinal part. Spines make harvesting a glove job.",
    grow: "Full sun, low water, tough soil. It self-sows. Beautiful and a little unruly.",
    precautions: [
      "Aster family allergy is possible.",
      "Liver conditions need clinical care, not a seed packet alone.",
    ],
    gardenNotes: ["Drought tolerant", "Pollinator friendly", "Self-sows"],
  },
  {
    slug: "lavender",
    name: "Lavender",
    latinName: "Lavandula angustifolia",
    region: "Mediterranean",
    geography: "Mediterranean",
    concerns: ["stress", "sleep"],
    ambassador: "Lavender",
    summary:
      "Tired but wired? Lavender is the calm that still has structure. Scent, sleep, and a sun-baked garden edge.",
    benefits: [
      "Calming aroma for stress",
      "Evening wind-down companion",
      "Culinary and craft use of the flower",
    ],
    traditionalUses:
      "Mediterranean households have used lavender flower for scent, linens, and a quieting cup. It is as much landscape as medicine: a plant that teaches dry, bright growing.",
    preparation:
      "Flower as tea, sachet, or hydrosol. Essential oil is concentrated; a drop on a pillow is not the same as drinking a bottle.",
    grow: "Sun, grit, airflow, and not too much kindness with the watering can. Wet feet rot it.",
    precautions: [
      "Essential oil can irritate skin.",
      "Scent is not a treatment for panic or clinical anxiety on its own.",
    ],
    gardenNotes: ["Loves lean soil", "Bee plant", "Low water"],
  },
  {
    slug: "echinacea",
    name: "Echinacea",
    latinName: "Echinacea purpurea",
    region: "North America",
    geography: "North America",
    concerns: ["immunity"],
    summary:
      "Prairie coneflower. A North American plant with a long Indigenous history and a very loud modern supplement aisle. Learn the plant, not just the capsule.",
    benefits: [
      "Traditional immune-season support",
      "Pollinator landmark in the garden",
      "Root and aerial parts used differently",
    ],
    traditionalUses:
      "Several Echinacea species were used by Indigenous nations of the North American plains and woodlands. Contemporary herbalism often uses E. purpurea because it grows well in gardens.",
    preparation:
      "Root decoction or aerial tincture, depending on the tradition and species. Short-term seasonal use is more typical than endless daily capsules.",
    grow: "Sun, decent soil, winter cold. Easy garden perennial. Leave seed heads for birds.",
    precautions: [
      "Aster family allergy.",
      "Autoimmune conditions and some medicines need professional guidance.",
    ],
    gardenNotes: ["Prairie perennial", "Birds eat the seed", "Garden-easy"],
  },
  {
    slug: "aloe",
    name: "Aloe",
    latinName: "Aloe vera",
    region: "Africa",
    geography: "Africa",
    concerns: ["skin"],
    ambassador: "Aloe",
    summary:
      "A succulent first-aid plant. The clear inner gel is the famous skin ally. The yellow latex under the skin is another story entirely.",
    benefits: [
      "Soothing gel for minor burns and dry skin",
      "Houseplant that earns its windowsill",
      "Drought-wise grower",
    ],
    traditionalUses:
      "African and later global folk use of the inner leaf gel for skin is widespread. Traditional internal uses of latex are not something to copy from a blog.",
    preparation:
      "Split a mature outer leaf, drain the yellow sap, then scoop the clear gel onto clean, unbroken skin. Commercial gels vary in quality.",
    grow: "Bright light, fast-draining mix, infrequent water. It will tell you when it is thirsty by thinning.",
    precautions: [
      "Do not put gel on deep or infected wounds as a substitute for care.",
      "The yellow latex is a strong laxative and is not a casual tea.",
      "Allergy is possible.",
    ],
    gardenNotes: ["Indoor/outdoor succulent", "Low water", "Harvest outer leaves"],
  },
  {
    slug: "chamomile",
    name: "Chamomile",
    latinName: "Matricaria chamomilla",
    region: "Europe",
    geography: "Europe",
    concerns: ["sleep", "digestion", "stress"],
    summary:
      "A small daisy with a large reputation. Chamomile is the cup people make when the day needs a softer edge — stomach, nerves, and bedtime in one flower.",
    benefits: [
      "Gentle digestive tea",
      "Evening calm",
      "Easy annual for a healing garden",
    ],
    traditionalUses:
      "European household herbalism treats German chamomile as a family tea: after meals, before bed, and for a taut nervous system. The apple-scented flower is the medicine.",
    preparation:
      "Steep the dried flower covered, 5–10 minutes. Strain well. A strong cup is still a tea, not a sedative drug.",
    grow: "Cool season annual. Direct sow in spring. Harvest flowers often to keep it blooming.",
    precautions: [
      "Aster family allergy, including ragweed cross-reaction.",
      "Rare allergy can be significant. Start with a weak cup if you are sensitive.",
    ],
    gardenNotes: ["Easy from seed", "Harvest often", "Self-sows lightly"],
  },
  {
    slug: "ginger",
    name: "Ginger",
    latinName: "Zingiber officinale",
    region: "South and Southeast Asia",
    geography: "Asia",
    concerns: ["digestion"],
    ambassador: "Ginger",
    summary:
      "A warming rhizome for motion, nausea, and a cold stomach. Ginger is kitchen medicine with a long Asian history and a passport that went everywhere.",
    benefits: [
      "Settles queasy digestion",
      "Warming circulatory feel",
      "Culinary backbone",
    ],
    traditionalUses:
      "South and East Asian food-as-medicine traditions use fresh and dried rhizome for damp, cold, stuck digestion and travel nausea. Fresh and dry ginger are not identical in character.",
    preparation:
      "Thin slices simmered as tea, grated into food, or candied. Dried ginger is hotter. Start small if you are unused to spice.",
    grow: "Tropical understory: warmth, humidity, rich soil. In temperate homes, a pot near a bright window can yield a modest harvest.",
    precautions: [
      "May not suit people with gallstones or those on certain blood-thinning medicines — ask a clinician.",
      "Heartburn is possible in large amounts.",
    ],
    gardenNotes: ["Warmth lover", "Harvest the rhizome", "Kitchen plant"],
  },
  {
    slug: "clove",
    name: "Clove",
    latinName: "Syzygium aromaticum",
    region: "Southeast Asia",
    geography: "Asia",
    concerns: ["immunity", "pain"],
    ambassador: "Clove",
    summary:
      "Block pain’s signal — in the kitchen, in spice history, and in the old toothache tradition. Clove is potent. A little is a lot.",
    benefits: [
      "Traditional topical use for tooth discomfort",
      "Warming spice",
      "Antimicrobial aromatic reputation",
    ],
    traditionalUses:
      "The unopened flower bud of an Indonesian tree became a global spice. Folk dentistry used clove oil on a cotton wisp — a practice that needs respect, not a soaked mouthful.",
    preparation:
      "Whole buds in cooking. For a tooth, a tiny amount of diluted oil on a cotton swab is the traditional emergency move, not a treatment plan.",
    grow: "Tropical evergreen tree. Not a temperate backyard crop. Buy the spice; learn the story.",
    precautions: [
      "Clove oil can burn tissue. Never swallow essential oil.",
      "A toothache needs a dentist. Clove is a bridge, not a cure.",
    ],
    gardenNotes: ["Tropical tree", "Spice harvest", "Potent oil"],
  },
] satisfies Plant[];

export const plants: Plant[] = [...corePlants, ...stockPlants, ...addedPlants]
  .filter((plant) => hasPlantImage(plant.slug))
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export const concernLabels: Record<PlantConcern, string> = Object.fromEntries(
  concerns.map((item) => [item.id, item.label]),
) as Record<PlantConcern, string>;

export function getPlant(slug: string) {
  return plants.find((plant) => plant.slug === slug);
}

export function getPlantsByConcern(concern: PlantConcern) {
  return plants.filter((plant) => plant.concerns.includes(concern));
}

export function searchPlants(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return plants;
  return plants.filter((plant) => {
    const haystack = [
      plant.name,
      plant.latinName,
      plant.region,
      plant.geography,
      plant.summary,
      plant.ambassador ?? "",
      ...plant.concerns.map((concern) => concernLabels[concern]),
      ...plant.benefits,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const geographies = [...new Set(plants.map((plant) => plant.geography))].sort();
export const regions = [...new Set(plants.map((plant) => plant.region))].sort((a, b) =>
  a.localeCompare(b, "en", { sensitivity: "base" }),
);
