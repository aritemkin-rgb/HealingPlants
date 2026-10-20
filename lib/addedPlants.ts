import type { Plant } from "./types";

/** New botanical portraits from October 2026. Copy is educational placeholder. */
export const addedPlants: Plant[] = [
  {
    slug: "astragalus",
    name: "Astragalus",
    latinName: "Astragalus membranaceus",
    region: "East Asia",
    geography: "Asia",
    concerns: ["immunity", "energy"],
    summary:
      "A sweet-root shrub of Chinese herbal tradition, used when people feel worn down and want a slower kind of stamina.",
    benefits: [
      "Traditional immune and vitality tonic",
      "Root-centered plant of dry hills",
      "Often taken over weeks, not as a rescue tea",
    ],
    traditionalUses:
      "Chinese herbal practice has long used astragalus root in formulas for depletion and recovery. It is food-like in some soups, stronger in extracts.",
    preparation:
      "Dried root as decoction, slices in broth, or practitioner extract. Learn the plant before stacking it with other immune herbs.",
    grow: "Sun, drainage, patience. A perennial that wants a few seasons before a root harvest.",
    precautions: [
      "May not suit autoimmune conditions or immunosuppressant medicines — ask a clinician.",
      "This card is educational, not a dosing guide.",
    ],
    gardenNotes: ["Root harvest", "Needs seasons", "Buy cultivated root"],
  },
  {
    slug: "bacopa",
    name: "Bacopa",
    latinName: "Bacopa monnieri",
    region: "South Asia",
    geography: "Asia",
    concerns: ["energy"],
    summary:
      "A creeping wetland herb of Ayurvedic tradition, used for study, memory, and a mind that will not settle on the page.",
    benefits: [
      "Traditional support for focus and study",
      "Water-loving groundcover",
      "Leaf, not a stimulant tea",
    ],
    traditionalUses:
      "Ayurvedic practice used bacopa (brahmi) as a mind plant. Effects, when they come, are usually slow.",
    preparation:
      "Dried aerial parts as tea or practitioner extract. Not a caffeine substitute.",
    grow: "Wet soil, pond edges, bright light. A trailing, thirsty plant.",
    precautions: [
      "Can cause stomach upset in some people.",
      "Ask a clinician if you take thyroid or sedating medicines.",
    ],
    gardenNotes: ["Wet ground", "Trailing", "Slow plant"],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    latinName: "Cannabis sativa",
    region: "Americas",
    geography: "Americas",
    concerns: ["pain", "sleep"],
    summary:
      "A culturally charged plant. This card is identification and education only. Law, product, and medical use sit outside this prototype.",
    benefits: [
      "Plant identification",
      "A reminder that tradition, law, and medicine are not the same conversation",
      "Leaf and flower are not a casual kitchen herb",
    ],
    traditionalUses:
      "Many cultures have used cannabis. This prototype does not offer a home recipe, a dose, or a substitute for licensed care.",
    preparation:
      "Do not treat this card as a how-to. Follow local law and a qualified professional.",
    grow: "Legal status varies. This site does not teach cultivation.",
    precautions: [
      "Impairs driving and judgment. Not for children.",
      "Can interact with other medicines. Ask a clinician.",
      "This is not medical advice and not a product listing.",
    ],
    gardenNotes: ["Legal status varies", "Education only", "Not a kitchen herb"],
  },
  {
    slug: "cats-claw",
    name: "Cat’s Claw",
    latinName: "Uncaria tomentosa",
    region: "Amazon",
    geography: "Americas",
    concerns: ["immunity"],
    summary:
      "A hooked Amazonian vine. Bark and root appear in Andean and Amazonian traditions for joints and recovery. The hook is how you know it.",
    benefits: [
      "Traditional vine of rainforest herbalism",
      "Bark-centered, not a salad green",
      "Identification by the clawed stem",
    ],
    traditionalUses:
      "Indigenous Amazonian practice used Uncaria as a vine of the forest pharmacy. Contemporary capsules are louder than the plant on the tree.",
    preparation:
      "Inner bark as decoction or practitioner extract. This is not a casual tea from a garden cutting.",
    grow: "Tropical vine. Not a temperate backyard crop. Learn the story; buy cultivated material.",
    precautions: [
      "May not suit autoimmune conditions, pregnancy, or people on immune medicines.",
      "Ask a clinician before internal use.",
    ],
    gardenNotes: ["Tropical vine", "Bark harvest", "Buy cultivated"],
  },
  {
    slug: "cinnamon",
    name: "Cinnamon",
    latinName: "Cinnamomum verum",
    region: "South Asia",
    geography: "Asia",
    concerns: ["digestion"],
    summary:
      "The kitchen bark. Warm, sweet, and older than the jar on the shelf. Culinary amounts are the everyday form.",
    benefits: [
      "Warming culinary bark",
      "Traditional after-meal spice",
      "True cinnamon and cassia are not the same plant",
    ],
    traditionalUses:
      "South Asian and later global cooking used cinnamon bark as food and a warming digestive. Cassia is the supermarket default in many places.",
    preparation:
      "Stick or powder in food and tea. Concentrated extracts and essential oil are another, stronger plant.",
    grow: "Tropical evergreen tree. Buy the bark; the tree wants a wet, warm climate.",
    precautions: [
      "Cassia is high in coumarin — culinary pinches, not spoonfuls every day.",
      "Essential oil is not a casual internal remedy.",
    ],
    gardenNotes: ["Tropical tree", "Kitchen spice", "Cassia is not true cinnamon"],
  },
  {
    slug: "dragon-blood",
    name: "Dragon Blood",
    latinName: "Croton lechleri",
    region: "Amazon",
    geography: "Americas",
    concerns: ["skin"],
    summary:
      "Sangre de drago. A rainforest tree whose sap runs red. Traditional topical use for cuts and skin — not a tea.",
    benefits: [
      "Traditional sap for skin",
      "Rainforest tree of the Amazon",
      "Identification plant, not a backyard crop",
    ],
    traditionalUses:
      "Amazonian practice used the red latex of Croton lechleri on wounds. The color is the name.",
    preparation:
      "This prototype treats it as a plant to learn. Do not drink the sap as a homemade tonic.",
    grow: "Tropical tree. Conservation and cultivated sap matter more than a souvenir bottle.",
    precautions: [
      "Sap can stain and irritate. Not for internal DIY use.",
      "Ask a clinician before using any latex on broken skin.",
    ],
    gardenNotes: ["Tropical tree", "Sap, not leaf", "Conservation"],
  },
  {
    slug: "fennel",
    name: "Fennel",
    latinName: "Foeniculum vulgare",
    region: "Mediterranean",
    geography: "Europe",
    concerns: ["digestion"],
    summary:
      "Anise-scented bulb, frond, and seed. After-meal seed is the old European chew. The whole plant is kitchen and garden.",
    benefits: [
      "Traditional seed for gas and after-meal ease",
      "Culinary bulb and frond",
      "Tall, sunny perennial",
    ],
    traditionalUses:
      "Mediterranean tables chewed fennel seed after meals and cooked the bulb. A swallowtail plant in the garden.",
    preparation:
      "Seed as tea or chew. Bulb as food. Essential oil is concentrated.",
    grow: "Sun, drainage, space. It self-sows. Do not plant next to dill if you want true seed.",
    precautions: [
      "Licorice-anise family confusion: know what you have.",
      "Culinary amounts are the everyday form.",
    ],
    gardenNotes: ["Self-sows", "Kitchen plant", "Swallowtail host"],
  },
  {
    slug: "garlic",
    name: "Garlic",
    latinName: "Allium sativum",
    region: "Central Asia",
    geography: "Asia",
    concerns: ["immunity"],
    summary:
      "The kitchen allium. Food first. Crushed clove is chemistry; a capsule is a different, louder object.",
    benefits: [
      "Culinary bulb",
      "Traditional winter kitchen plant",
      "Grown almost everywhere people cook",
    ],
    traditionalUses:
      "From Central Asia outward, garlic has been food and household medicine. Crushing starts the smell and the well-known compounds.",
    preparation:
      "Fresh clove in food. Raw crushed garlic is stronger on the stomach than cooked.",
    grow: "Plant cloves in fall in most temperate gardens. Sun, decent soil, a dry cure after harvest.",
    precautions: [
      "Can thin blood and upset the stomach. Ask a clinician before high-dose supplements, especially around surgery.",
      "Food amounts are the usual form.",
    ],
    gardenNotes: ["Fall planting", "Kitchen staple", "Cure after harvest"],
  },
  {
    slug: "gotu-kola",
    name: "Gotu Kola",
    latinName: "Centella asiatica",
    region: "South Asia",
    geography: "Asia",
    concerns: ["skin", "energy"],
    summary:
      "A round-leaved wetland herb of Ayurvedic and Chinese tradition, used for skin, circulation, and a quieter kind of focus.",
    benefits: [
      "Traditional leaf for skin and tissue",
      "Water-loving groundcover",
      "Mind and skin plant in several Asian systems",
    ],
    traditionalUses:
      "Gotu kola shows up in Ayurvedic and Chinese herbal practice as a restoration leaf. It is not a stimulant.",
    preparation:
      "Fresh or dried leaf as tea, food, or practitioner extract.",
    grow: "Moist soil, part shade, heat. A creeping plant that likes wet feet.",
    precautions: [
      "Can cause skin sensitivity or headache in some people.",
      "Ask a clinician if you take sedating medicines or have liver disease.",
    ],
    gardenNotes: ["Wet ground", "Creeping", "Part shade"],
  },
  {
    slug: "green-tea",
    name: "Green Tea",
    latinName: "Camellia sinensis",
    region: "East Asia",
    geography: "Asia",
    concerns: ["energy"],
    summary:
      "The tea plant. Leaf, not a capsule story. Caffeine plus L-theanine is why a cup can feel awake and still.",
    benefits: [
      "Traditional daily leaf",
      "Gentle caffeine with a different shape than coffee",
      "A shrub of mist and hillsides",
    ],
    traditionalUses:
      "East Asian tea culture is older than the wellness aisle. Green, oolong, and black are the same species, different work.",
    preparation:
      "Leaf as infusion. Matcha is powdered leaf — stronger. Extracts are another product.",
    grow: "Acid soil, mist, patience. A long-lived shrub, not a windowsill annual.",
    precautions: [
      "Contains caffeine. Can disturb sleep and iron absorption if you drink it with meals.",
      "Extracts are not the same as a cup.",
    ],
    gardenNotes: ["Acid soil", "Long-lived shrub", "Leaf harvest"],
  },
  {
    slug: "guayusa",
    name: "Guayusa",
    latinName: "Ilex guayusa",
    region: "Amazon",
    geography: "Americas",
    concerns: ["energy"],
    summary:
      "An Amazonian holly leaf, brewed at dawn. Caffeine with a different cultural home than coffee or tea.",
    benefits: [
      "Traditional dawn tea of the western Amazon",
      "Holly-family leaf",
      "A waking plant, not a dessert",
    ],
    traditionalUses:
      "Kichwa and neighboring Amazonian communities have long boiled guayusa leaves in the early morning.",
    preparation:
      "Dried leaf as a long steep or a boiled pot. It is caffeinated.",
    grow: "Tropical holly. Not a temperate backyard crop.",
    precautions: [
      "Contains caffeine. Not a sleep plant.",
      "Ask a clinician if you are sensitive to stimulants or pregnant.",
    ],
    gardenNotes: ["Tropical holly", "Dawn tea", "Caffeinated"],
  },
  {
    slug: "hibiscus",
    name: "Hibiscus",
    latinName: "Hibiscus sabdariffa",
    region: "Africa",
    geography: "Africa",
    concerns: ["digestion"],
    summary:
      "The sour red calyx in jamaica and karkadé. A cooling drink plant of Africa that traveled with the trade winds.",
    benefits: [
      "Tart floral drink",
      "Traditional cooling tea",
      "Easy annual in heat",
    ],
    traditionalUses:
      "West African and later Caribbean and Latin American kitchens steeped the calyces as a sour, ruby drink.",
    preparation:
      "Dried calyces as tea, hot or cold, often with a little sweet. Not the ornamental hibiscus of the patio pot unless you know the species.",
    grow: "Heat, sun, a season. An annual in cool climates.",
    precautions: [
      "May lower blood pressure. Ask a clinician if you take related medicines.",
      "Tart teas can bother reflux.",
    ],
    gardenNotes: ["Heat lover", "Calyx harvest", "Know the species"],
  },
  {
    slug: "kava",
    name: "Kava",
    latinName: "Piper methysticum",
    region: "Pacific",
    geography: "Australia",
    concerns: ["stress"],
    summary:
      "A Pacific root of ceremony and evening. Traditional preparation is not a gas-station shot. Respect the plant and the cultures that keep it.",
    benefits: [
      "Traditional root for social ease",
      "Pacific ceremonial plant",
      "Not a casual nightcap bottle",
    ],
    traditionalUses:
      "Pacific Island practice prepared kava root as a communal drink. That context is part of the plant.",
    preparation:
      "This prototype does not teach a homemade extraction. Noble cultivars and traditional prep matter.",
    grow: "Tropical understory. Not a temperate crop.",
    precautions: [
      "Can affect the liver, especially with alcohol or poor products. Ask a clinician.",
      "Impairs driving. Not for pregnancy or with many medicines.",
    ],
    gardenNotes: ["Tropical", "Root harvest", "Ceremony plant"],
  },
  {
    slug: "licorice",
    name: "Licorice",
    latinName: "Glycyrrhiza glabra",
    region: "Eurasia",
    geography: "Asia",
    concerns: ["digestion"],
    summary:
      "A sweet root that is also a strong plant. Traditional soothing of the throat and gut — and a blood-pressure warning in the same sentence.",
    benefits: [
      "Traditional soothing root",
      "Sweetness without being candy",
      "A formula plant more than a lone tea",
    ],
    traditionalUses:
      "European, Chinese, and Middle Eastern herbalism used licorice root to round formulas and soothe tissue.",
    preparation:
      "Dried root as decoction or in a practitioner formula. Deglycyrrhizinated forms exist for a reason.",
    grow: "Deep soil, sun, patience. A spreading perennial.",
    precautions: [
      "Can raise blood pressure and drop potassium. Not a daily candy root.",
      "Ask a clinician if you have heart, kidney, or blood-pressure conditions, or are pregnant.",
    ],
    gardenNotes: ["Deep root", "Spreads", "Potent sweet root"],
  },
  {
    slug: "maca",
    name: "Maca",
    latinName: "Lepidium meyenii",
    region: "Andes",
    geography: "Americas",
    concerns: ["womens-care", "energy"],
    ambassador: "Maca",
    summary:
      "An Andean hypocotyl grown above the treeline. Food of the highlands, now a jar in the wellness aisle. Women’s Balance ambassador in this prototype.",
    benefits: [
      "Traditional high-altitude food",
      "Used for stamina and hormonal seasons",
      "A root vegetable before it was a capsule",
    ],
    traditionalUses:
      "Andean communities grew maca as food in cold, thin air. Contemporary supplements are a later, louder market.",
    preparation:
      "Dried, gelatinized, or powdered root as food. This is not a hormone drug.",
    grow: "High, cold, and specific. Most people will buy cultivated root, not grow it.",
    precautions: [
      "May not suit hormone-sensitive conditions — ask a clinician.",
      "Food amounts are the older form.",
    ],
    gardenNotes: ["Andean crop", "Buy cultivated", "Food first"],
  },
  {
    slug: "moringa",
    name: "Moringa",
    latinName: "Moringa oleifera",
    region: "South Asia",
    geography: "Asia",
    concerns: ["energy", "immunity"],
    summary:
      "The drumstick tree. Leaf as a mineral green in South Asian and African kitchens. Fast-growing where frost does not visit.",
    benefits: [
      "Nutritive leaf",
      "Traditional food tree of the dry tropics",
      "Pods, leaf, and seed are different parts",
    ],
    traditionalUses:
      "South Asian and later African cooking used moringa leaf and pods as food. Powdered leaf is a newer export.",
    preparation:
      "Cooked leaf as food, or dried leaf in modest amounts. Seed and root are not the same as leaf.",
    grow: "Heat, sun, drought-tolerant once established. Frost ends the conversation.",
    precautions: [
      "Root and bark are more potent and not a casual food.",
      "Leaf is the usual kitchen part.",
    ],
    gardenNotes: ["Tropical tree", "Leaf as food", "Frost-tender"],
  },
  {
    slug: "nigella",
    name: "Nigella",
    latinName: "Nigella sativa",
    region: "West Asia",
    geography: "Asia",
    concerns: ["immunity"],
    summary:
      "Black seed. A small dark seed of West Asian and North African kitchens and prophetic medicine traditions. Not ornamental love-in-a-mist, though they are cousins.",
    benefits: [
      "Culinary and traditional seed",
      "Peppery, small, and potent in oil form",
      "Know the species before you brew a garden nigella",
    ],
    traditionalUses:
      "West Asian, North African, and later global traditions used Nigella sativa seed as food and household medicine.",
    preparation:
      "Seed in food, or a small amount of seed oil. This is not a gallon-a-day tonic.",
    grow: "Sun, ordinary soil, an annual. True N. sativa is the seed jar plant.",
    precautions: [
      "Oil can interact with medicines and lower blood sugar. Ask a clinician.",
      "Culinary pinches are the everyday form.",
    ],
    gardenNotes: ["Annual", "Seed harvest", "Not every Nigella is black seed"],
  },
  {
    slug: "saffron",
    name: "Saffron",
    latinName: "Crocus sativus",
    region: "West Asia",
    geography: "Asia",
    concerns: ["stress"],
    summary:
      "The autumn crocus thread. Costly, aromatic, and used in food and in some mood traditions. A pinch, never a handful.",
    benefits: [
      "Culinary stigma",
      "Traditional mood and food plant",
      "Autumn-flowering crocus",
    ],
    traditionalUses:
      "Persian, Mediterranean, and South Asian kitchens treated saffron as spice and ceremony. Later research looks at mood — the kitchen pinch came first.",
    preparation:
      "Threads steeped in warm liquid for food. Supplements are a different product and dose.",
    grow: "Summer-dry corms, autumn bloom. Labor is the price.",
    precautions: [
      "High doses are unsafe, especially in pregnancy.",
      "Culinary pinches are the form this prototype points to.",
    ],
    gardenNotes: ["Autumn crocus", "Hand-harvested", "A pinch"],
  },
  {
    slug: "saw-palmetto",
    name: "Saw Palmetto",
    latinName: "Serenoa repens",
    region: "North America",
    geography: "Americas",
    concerns: ["immunity"],
    summary:
      "A low palm of the American Southeast. Berry used in later herbalism for prostate and hair conversations. This card is identification first.",
    benefits: [
      "Southeastern palm",
      "Berry of later American herbal products",
      "A plant of dunes and pine flatwoods",
    ],
    traditionalUses:
      "Seminole and later American herbal practice used the berry. Contemporary men’s-health bottles are a market layer on top of that.",
    preparation:
      "Dried berry as extract in commercial products. This prototype does not dose it.",
    grow: "Warm, sandy, southeastern. Slow. Not a northern backyard palm.",
    precautions: [
      "May affect hormones and PSA tests. Ask a clinician, especially before surgery.",
      "Not a substitute for prostate care.",
    ],
    gardenNotes: ["Southeastern palm", "Berry", "Slow grower"],
  },
  {
    slug: "tea-tree",
    name: "Tea Tree",
    latinName: "Melaleuca alternifolia",
    region: "Australia",
    geography: "Australia",
    concerns: ["skin"],
    summary:
      "An Australian paperbark. The leaf oil is the famous part — topical, diluted, and not for the teacup.",
    benefits: [
      "Traditional leaf of northern New South Wales",
      "Oil used on skin, never as a drink",
      "Wet-ground tree",
    ],
    traditionalUses:
      "Bundjalung and later Australian use of crushed leaf for skin came before the global bottle of oil.",
    preparation:
      "Diluted essential oil on skin only. Do not swallow it. Keep it away from pets and young children.",
    grow: "Wet, warm Australian climate. A tree, not a windowsill herb.",
    precautions: [
      "Toxic if swallowed. Can irritate skin undiluted.",
      "Keep away from cats and small children.",
    ],
    gardenNotes: ["Australian tree", "Oil is topical", "Never internal"],
  },
];
