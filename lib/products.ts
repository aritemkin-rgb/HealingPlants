import type { Product, ProductKind } from "./types";

export const productKinds: { id: ProductKind; label: string }[] = [
  { id: "liquid", label: "Liquids" },
  { id: "supplements", label: "Supplements" },
  { id: "teas-and-herbs", label: "Teas and herbs" },
];

const img = (file: string) => `/assets/products/${file}`;

export const products: Product[] = [
  {
    slug: "aloderma-aloe-vera-gel",
    name: "Aloderma Aloe Vera Gel",
    kind: "liquid",
    plantSlug: "aloe",
    price: "$11.99",
    blurb: "96% pure organic aloe for skin, scalp, and hair. A soothing gel for the windowsill first-aid plant.",
    image: img("aloderma-aloe-vera-gel.png"),
  },
  {
    slug: "skintensive-arnica-bruise",
    name: "SKINTENSIVE Arnica Bruise",
    kind: "liquid",
    plantSlug: "arnica",
    price: "$29.94",
    blurb: "A topical arnica gel for after the fall, the match, the too-long walk. Unbroken skin only.",
    image: img("skintensive-arnica-bruise.png"),
  },
  {
    slug: "oregons-wild-harvest-astragalus",
    name: "Oregon's Wild Harvest Organic Astragalus",
    kind: "supplements",
    plantSlug: "astragalus",
    price: "$33.56",
    blurb: "Organic astragalus capsules for slower, long-term immune support. A root people take over weeks, not as a rescue tea.",
    image: img("oregons-wild-harvest-astragalus.png"),
  },
  {
    slug: "himalaya-ashwagandha",
    name: "Himalaya Organic Ashwagandha Root",
    kind: "supplements",
    plantSlug: "ashwagandha",
    price: "$22.99",
    blurb: "Organic ashwagandha root capsules for stress relief and steadier energy. Adrenal support in the Ayurvedic tradition.",
    image: img("himalaya-ashwagandha.png"),
  },
  {
    slug: "himalaya-bacopa",
    name: "Himalaya Organic Bacopa Monnieri",
    kind: "supplements",
    plantSlug: "bacopa",
    price: "$25.99",
    blurb: "Organic bacopa capsules for mental alertness, calm, and working memory. A study plant, not a stimulant.",
    image: img("himalaya-bacopa.png"),
  },
  {
    slug: "mjs-herbals-calendula-salve",
    name: "MJ's Herbals Calendula Salve",
    kind: "liquid",
    plantSlug: "calendula",
    price: "$19.99",
    blurb: "Organic calendula skincare balm. A moisturizing salve from the garden marigold used on dry, worked skin.",
    image: img("mjs-herbals-calendula-salve.png"),
  },
  {
    slug: "organic-hemp-oil",
    name: "Organic Hemp Oil",
    kind: "liquid",
    plantSlug: "cannabis",
    price: "$39.76",
    blurb: "Organic hemp seed oil. A food-and-skin oil from the hemp plant — not a how-to, not a dose, follow local law.",
    image: img("organic-hemp-oil.png"),
  },
  {
    slug: "vimergy-cats-claw",
    name: "Vimergy Cat's Claw 10:1 Extract",
    kind: "liquid",
    plantSlug: "cats-claw",
    price: "$47.00",
    blurb: "Organic vegan cat's claw extract. Fast-absorbing Amazonian vine traditionally used for joints and antioxidant support.",
    image: img("vimergy-cats-claw.png"),
  },
  {
    slug: "chamomile-tea",
    name: "Chamomile Tea",
    kind: "teas-and-herbs",
    plantSlug: "chamomile",
    price: "$26.99",
    blurb: "A tin of little daisies. Evening tea from the plant that teaches the kettle to slow down.",
    image: img("chamomile-tea.png"),
  },
  {
    slug: "true-vine-ceylon-cinnamon",
    name: "True Vine Organics Ceylon Cinnamon",
    kind: "liquid",
    plantSlug: "cinnamon",
    price: "$39.99",
    blurb: "Ceylon cinnamon liquid for blood sugar, heart, and gut support. True cinnamon, not the grocery-jar cousin.",
    image: img("true-vine-ceylon-cinnamon.png"),
  },
  {
    slug: "nexon-clove-essential-oil",
    name: "Nexon Botanics Organic Clove Essential Oil",
    kind: "liquid",
    plantSlug: "clove",
    price: "$14.95",
    blurb: "Pure, undiluted clove bud oil for teeth, gums, sore muscle, skin, and hair. Strong — a drop is a conversation.",
    image: img("nexon-clove-essential-oil.png"),
  },
  {
    slug: "organic-dandelion-leaf-root-tea",
    name: "Organic Dandelion Leaf & Root Tea",
    kind: "teas-and-herbs",
    plantSlug: "dandelion",
    price: "$13.49",
    blurb: "Leaf and root together. A bitter tea traditionally used for kidneys and healthy digestion.",
    image: img("organic-dandelion-leaf-root-tea.png"),
  },
  {
    slug: "herb-pharm-dragons-blood",
    name: "Herb Pharm Dragon's Blood",
    kind: "liquid",
    plantSlug: "dragon-blood",
    price: "$16.77",
    blurb: "Tree sap for digestive support. Dragon's blood bottled as a liquid extract — not a myth, a resin.",
    image: img("herb-pharm-dragons-blood.png"),
  },
  {
    slug: "gaia-quick-defense-echinacea-elderberry",
    name: "Gaia Herbs Quick Defense Echinacea & Elderberry",
    kind: "supplements",
    plantSlug: "echinacea",
    price: "$66.14",
    blurb: "Echinacea and elderberry in one immune-support formula. Prairie flower meets dark berry.",
    image: img("gaia-quick-defense-echinacea-elderberry.png"),
  },
  {
    slug: "organic-dried-elderberries",
    name: "Organic Dried Elderberries",
    kind: "teas-and-herbs",
    plantSlug: "elderberry",
    price: "$26.99",
    blurb: "Whole black elderberries, non-irradiated. For syrups, teas, and antioxidant kitchen work.",
    image: img("organic-dried-elderberries.png"),
  },
  {
    slug: "traditional-medicinals-fennel",
    name: "Traditional Medicinals Organic Fennel",
    kind: "teas-and-herbs",
    plantSlug: "fennel",
    price: "$5.88",
    blurb: "Organic fennel tea bags for after-meal ease. Licorice-sweet seed, gentle on a tight stomach.",
    image: img("traditional-medicinals-fennel.png"),
  },
  {
    slug: "herbal-roots-garlic",
    name: "Herbal Roots Organic Whole Bulb Garlic",
    kind: "supplements",
    plantSlug: "garlic",
    price: "$24.99",
    blurb: "Extra-strength organic garlic capsules from the whole bulb. Kitchen medicine with a serious immune reputation.",
    image: img("herbal-roots-garlic.png"),
  },
  {
    slug: "herbal-roots-ginger",
    name: "Herbal Roots Organic Ginger Capsules",
    kind: "supplements",
    plantSlug: "ginger",
    price: "$26.99",
    blurb: "Organic ginger capsules for digestive support. The warming rhizome, without having to grate it at the sink.",
    image: img("herbal-roots-ginger.png"),
  },
  {
    slug: "bronson-ginkgo-biloba",
    name: "Bronson Ginkgo Biloba Extra Strength",
    kind: "supplements",
    plantSlug: "ginkgo",
    price: "$8.99",
    blurb: "Ginkgo capsules for memory, cognitive, and brain-health support. The living fossil, in a bottle.",
    image: img("bronson-ginkgo-biloba.png"),
  },
  {
    slug: "nutrachamps-ginseng",
    name: "NutraChamps Korean Red Panax Ginseng",
    kind: "supplements",
    plantSlug: "ginseng",
    price: "$22.95",
    blurb: "Cultivated Korean red ginseng capsules for energy, focus, and vitality. Farmed root — wild harvest is not the story we sell.",
    image: img("nutrachamps-ginseng.png"),
  },
  {
    slug: "organic-india-gotu-kola",
    name: "Organic India Gotu Kola",
    kind: "supplements",
    plantSlug: "gotu-kola",
    price: "$22.99",
    blurb: "USDA organic gotu kola for brain and nervous-system support. Calming, vegan, gluten-free.",
    image: img("organic-india-gotu-kola.png"),
  },
  {
    slug: "yogi-green-tea-blueberry",
    name: "Yogi Green Tea Blueberry Slim Life Tea",
    kind: "teas-and-herbs",
    plantSlug: "green-tea",
    price: "$26.70",
    blurb: "A six-pack of organic green tea with blueberry. Stamina, energy, and a lighter cup — not a miracle diet.",
    image: img("yogi-green-tea-blueberry.png"),
  },
  {
    slug: "davidsons-guayusa-energy",
    name: "Davidson's Organics Guayusa Energy",
    kind: "teas-and-herbs",
    plantSlug: "guayusa",
    price: "$15.67",
    blurb: "Amazonian holly leaf, caffeinated and smooth. An energy tea with a longer lineage than a can of anything.",
    image: img("davidsons-guayusa-energy.png"),
  },
  {
    slug: "organic-hibiscus-flowers",
    name: "Organic Hibiscus Flowers",
    kind: "teas-and-herbs",
    plantSlug: "hibiscus",
    price: "$14.95",
    blurb: "Dried hibiscus flowers for a tart, crimson tea. The calyx, not the showy petal, is the cup.",
    image: img("organic-hibiscus-flowers.png"),
  },
  {
    slug: "maryruths-kava-drops",
    name: "MaryRuth's Calming Kava Liquid Drops",
    kind: "liquid",
    plantSlug: "kava",
    price: "$19.94",
    blurb: "Kava liquid drops for sleep, calm, and stress relief. Pacific root, taken seriously — not a casual nightcap.",
    image: img("maryruths-kava-drops.png"),
  },
  {
    slug: "anthonys-lavender-petals",
    name: "Anthony's Organic French Lavender Petals",
    kind: "teas-and-herbs",
    plantSlug: "lavender",
    price: "$11.69",
    blurb: "Dried organic French lavender. Culinary and tea petals from the plant that teaches restraint.",
    image: img("anthonys-lavender-petals.png"),
  },
  {
    slug: "maryruths-lemon-balm",
    name: "MARYRUTH'S Organic Lemon Balm Leaf Extract",
    kind: "liquid",
    plantSlug: "lemon-balm",
    price: "$19.95",
    blurb: "USDA organic lemon balm liquid for mood, relaxation, and calm. The lemon-scented mint, in a dropper, vegan.",
    image: img("maryruths-lemon-balm.png"),
  },
  {
    slug: "zazzee-dgl-licorice",
    name: "Zazzee USDA Organic DGL Licorice",
    kind: "supplements",
    plantSlug: "licorice",
    price: "$26.97",
    blurb: "Deglycyrrhizinated licorice for digestive and stomach support. The sweet root, with the blood-pressure piece dialed down.",
    image: img("zazzee-dgl-licorice.png"),
  },
  {
    slug: "nutrachamps-maca",
    name: "NutraChamps USDA Organic Maca Root",
    kind: "supplements",
    plantSlug: "maca",
    price: "$18.99",
    blurb: "Organic maca root capsules from the Andean highland brassica. Stamina in a powder that became a capsule.",
    image: img("nutrachamps-maca.png"),
  },
  {
    slug: "zazzee-milk-thistle",
    name: "Zazzee USDA Organic Milk Thistle 30:1 Extract",
    kind: "supplements",
    plantSlug: "milk-thistle",
    price: "$27.97",
    blurb: "High-potency milk thistle seed extract for liver and antioxidant support. Silver veins, serious spines, studied seed.",
    image: img("zazzee-milk-thistle.png"),
  },
  {
    slug: "pura-vida-moringa",
    name: "Pura Vida Organic Moringa Capsules",
    kind: "supplements",
    plantSlug: "moringa",
    price: "$34.99",
    blurb: "Single-origin moringa leaf powder capsules for energy, metabolism, and immune support.",
    image: img("pura-vida-moringa.png"),
  },
  {
    slug: "fgo-nettle-leaf-tea",
    name: "FGO Organic Nettle Leaf Loose Tea",
    kind: "teas-and-herbs",
    plantSlug: "nettle",
    price: "$25.90",
    blurb: "Loose organic nettle leaf. The sting is gone; the mineral-green tea remains.",
    image: img("fgo-nettle-leaf-tea.png"),
  },
  {
    slug: "amazing-herbs-black-seed-oil",
    name: "Amazing Herbs Premium Black Seed Oil",
    kind: "liquid",
    plantSlug: "nigella",
    price: "$29.00",
    blurb: "Cold-pressed black seed oil for digestive health and brain function. Gluten-free, non-GMO.",
    image: img("amazing-herbs-black-seed-oil.png"),
  },
  {
    slug: "gaia-oil-of-oregano",
    name: "Gaia Herbs Oil of Oregano",
    kind: "supplements",
    plantSlug: "oregano",
    price: "$27.89",
    blurb: "Oil of oregano for immune and antioxidant support. Kitchen herb, concentrated — not a pizza topping.",
    image: img("gaia-oil-of-oregano.png"),
  },
  {
    slug: "parsley-supplements",
    name: "Parsley",
    kind: "supplements",
    plantSlug: "parsley",
    price: "$30.00",
    blurb: "Parsley capsules traditionally used to support the kidneys and urinary system. More than a plate garnish.",
    image: img("parsley-supplements.png"),
  },
  {
    slug: "gaia-calm-asap",
    name: "Gaia Herbs Calm A.S.A.P.",
    kind: "supplements",
    plantSlug: "passionflower",
    price: "$31.49",
    blurb: "Stress-support blend with passionflower, skullcap, chamomile, vervain, and holy basil. For the mind that will not dim the lights.",
    image: img("gaia-calm-asap.png"),
  },
  {
    slug: "herb-pharm-peppermint-spirits",
    name: "Herb Pharm Organic Peppermint Spirits",
    kind: "liquid",
    plantSlug: "peppermint",
    price: "$16.77",
    blurb: "Peppermint tincture for occasional nausea and upset stomach. Fast-absorbing digestive support from the platform's own plant.",
    image: img("herb-pharm-peppermint-spirits.png"),
  },
  {
    slug: "mielle-rosemary-mint-hair-oil",
    name: "Mielle Organics Rosemary Mint Hair Oil",
    kind: "liquid",
    plantSlug: "rosemary",
    price: "$8.84",
    blurb: "Rosemary mint hair oil with biotin and castor oil. Scalp care, split ends, and a little less frizz.",
    image: img("mielle-rosemary-mint-hair-oil.png"),
  },
  {
    slug: "wild-organic-saffron",
    name: "Wild & Organic Saffron",
    kind: "liquid",
    plantSlug: "saffron",
    price: "$29.99",
    blurb: "Saffron liquid for mood, focus, and eye support. The costly stigma, in a dropper instead of a pinch.",
    image: img("wild-organic-saffron.png"),
  },
  {
    slug: "sage-tea-organic-sage-leaves",
    name: "Sage Tea Organic Sage Leaves",
    kind: "teas-and-herbs",
    plantSlug: "sage",
    price: "$9.99",
    blurb: "Organic sage leaves for a clear, slightly bitter cup. Focus and clarity from the garden, not from a screen.",
    image: img("sage-tea-organic-sage-leaves.png"),
  },
  {
    slug: "herbal-roots-saw-palmetto",
    name: "Herbal Roots Organic Saw Palmetto",
    kind: "supplements",
    plantSlug: "saw-palmetto",
    price: "$29.99",
    blurb: "Organic saw palmetto capsules for men's prostate health. The Florida palm berry, not a folk rumor.",
    image: img("herbal-roots-saw-palmetto.png"),
  },
  {
    slug: "natures-way-st-johns-wort",
    name: "Nature's Way St. John's Wort Capsules",
    kind: "supplements",
    plantSlug: "st-johns-wort",
    price: "$14.61",
    blurb: "St. John's wort capsules for a positive outlook. A plant that asks you to check your medicines first.",
    image: img("natures-way-st-johns-wort.png"),
  },
  {
    slug: "fiora-tea-tree-oil",
    name: "Fiora Naturals Tea Tree Oil",
    kind: "liquid",
    plantSlug: "tea-tree",
    price: "$9.99",
    blurb: "Organic tea tree oil for skin, face, hair, scalp, nails, and diffuser. Dilute before it meets skin.",
    image: img("fiora-tea-tree-oil.png"),
  },
  {
    slug: "savorsatch-thyme-leaf",
    name: "SavorSatch Organic Thyme Leaf",
    kind: "teas-and-herbs",
    plantSlug: "thyme",
    price: "$9.99",
    blurb: "Organic thyme leaf for tea and the pot. A small leaf with a long kitchen and chest-cold reputation.",
    image: img("savorsatch-thyme-leaf.png"),
  },
  {
    slug: "gaia-turmeric-supreme",
    name: "Gaia Herbs Turmeric Supreme",
    kind: "supplements",
    plantSlug: "turmeric",
    price: "$49.49",
    blurb: "Turmeric formula for occasional discomfort from normal wear and tear. Golden rhizome, taken seriously.",
    image: img("gaia-turmeric-supreme.png"),
  },
  {
    slug: "herbal-roots-valerian",
    name: "Herbal Roots Pure Organic Valerian Root",
    kind: "supplements",
    plantSlug: "valerian",
    price: "$31.99",
    blurb: "Organic valerian root capsules. The evening root people reach for when the mind will not lie down.",
    image: img("herbal-roots-valerian.png"),
  },
  {
    slug: "nutraharmony-mullein-drops",
    name: "NUTRAHARMONY Mullein Drops for Lungs",
    kind: "liquid",
    plantSlug: "mullein",
    price: "$39.89",
    blurb: "Mullein drops for respiratory and bronchial support. Tall roadside velvets, concentrated for the chest.",
    image: img("nutraharmony-mullein-drops.png"),
  },
];

function byName(a: Product, b: Product) {
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  const samePlant = product.plantSlug
    ? getProductsForPlant(product.plantSlug).filter(
        (item) => item.slug !== product.slug,
      )
    : [];
  const pool = samePlant.length
    ? samePlant
    : getProductsByKind(product.kind).filter((item) => item.slug !== product.slug);
  return pool.slice(0, limit);
}

export function getProductsByKind(kind: ProductKind) {
  return products.filter((product) => product.kind === kind).sort(byName);
}

export function getProductsForPlant(plantSlug: string) {
  return products.filter((product) => product.plantSlug === plantSlug).sort(byName);
}

export function stallListingsFor(
  plantSlug: string,
  kind: ProductKind | "all",
  _plantName: string,
): Product[] {
  return getProductsForPlant(plantSlug).filter(
    (product) => kind === "all" || product.kind === kind,
  );
}

export function productsByName(kind: ProductKind | "all" = "all") {
  const list = kind === "all" ? products : getProductsByKind(kind);
  return [...list].sort(byName);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) =>
    `${product.name} ${product.blurb} ${product.kind} ${product.plantSlug ?? ""}`
      .toLowerCase()
      .includes(q),
  );
}
