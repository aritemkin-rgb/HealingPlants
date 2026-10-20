import type { Product, ProductKind } from "./types";

export const productKinds: { id: ProductKind; label: string }[] = [
  { id: "product", label: "Mock products" },
  { id: "seeds", label: "Seeds" },
  { id: "growing", label: "Growing tools" },
  { id: "future", label: "Future Shopify path" },
];

export const products: Product[] = [
  {
    slug: "peppermint-seed",
    name: "Peppermint seed packet",
    kind: "seeds",
    plantSlug: "peppermint",
    price: "$6",
    blurb: "Contain it, or it will write its name across the bed. A lively starter for a digestive corner.",
  },
  {
    slug: "lavender-seed",
    name: "English lavender seed",
    kind: "seeds",
    plantSlug: "lavender",
    price: "$7",
    blurb: "Lean soil, full sun, almost stingy water. The plant that teaches restraint.",
  },
  {
    slug: "passionflower-vine",
    name: "Passionflower vine start",
    kind: "product",
    plantSlug: "passionflower",
    price: "$18",
    blurb: "A living trellis plant for restlessness. Mock stock — future nursery partner.",
  },
  {
    slug: "arnica-salve",
    name: "Arnica recovery salve",
    kind: "product",
    plantSlug: "arnica",
    price: "$16",
    blurb: "Topical only, unbroken skin. A mock tin for after the fall, the match, the too-long walk.",
  },
  {
    slug: "milk-thistle-seed",
    name: "Milk thistle seed",
    kind: "seeds",
    plantSlug: "milk-thistle",
    price: "$8",
    blurb: "Silver veins, serious spines, a dry-garden sculpture that also feeds pollinators.",
  },
  {
    slug: "aloe-pup",
    name: "Aloe vera pup",
    kind: "product",
    plantSlug: "aloe",
    price: "$14",
    blurb: "Windowsill first aid. Harvest the outer leaf; leave the yellow sap out of the story.",
  },
  {
    slug: "echinacea-seed",
    name: "Purple coneflower seed",
    kind: "seeds",
    plantSlug: "echinacea",
    price: "$6",
    blurb: "Prairie plant, bird seed, late-summer color. Easy perennial from a patient sowing.",
  },
  {
    slug: "chamomile-seed",
    name: "German chamomile seed",
    kind: "seeds",
    plantSlug: "chamomile",
    price: "$5",
    blurb: "A whole tea garden from a pinch of seed. Harvest the little daisies all season.",
  },
  {
    slug: "healing-garden-kit",
    name: "Healing garden starter kit",
    kind: "growing",
    price: "$42",
    blurb: "Pots, grit, labels, and a planting map for peppermint, lavender, and chamomile. Mock kit.",
  },
  {
    slug: "seed-tray",
    name: "Seed-starting tray",
    kind: "growing",
    price: "$12",
    blurb: "Shallow cells, a clear dome, and room to fail a few and still have a garden.",
  },
  {
    slug: "hand-shears",
    name: "Harvest shears",
    kind: "growing",
    price: "$24",
    blurb: "Small, sharp, honest. For flowers, herbs, and the moment a mint stem needs a boundary.",
  },
  {
    slug: "mineral-grit",
    name: "Mediterranean mineral grit",
    kind: "growing",
    price: "$11",
    blurb: "Lavender and milk thistle do not want potting sludge. This mix keeps roots breathing.",
  },
  {
    slug: "ginseng-cultivated",
    name: "Cultivated ginseng root — coming",
    kind: "future",
    plantSlug: "ginseng",
    price: "Soon",
    blurb: "A future Shopify path for farmed root only. Wild harvest is not the story we want to sell.",
    shopifyPath: "/products/ginseng",
  },
];

export function getProductsByKind(kind: ProductKind) {
  return products.filter((product) => product.kind === kind);
}

export function getProductsForPlant(plantSlug: string) {
  return products.filter((product) => product.plantSlug === plantSlug);
}

export function stallListingsFor(
  plantSlug: string,
  kind: ProductKind | "all",
  plantName: string,
): Product[] {
  const rows = getProductsForPlant(plantSlug).filter(
    (product) => kind === "all" || product.kind === kind,
  );
  if (rows.length) return rows;
  return [
    {
      slug: `${plantSlug}-coming`,
      name: `${plantName} — coming to the stall`,
      kind: "future",
      plantSlug,
      price: "Soon",
      blurb:
        "Seed, start, or a prepared good — a mock path for a later Shopify listing.",
    },
  ];
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) =>
    `${product.name} ${product.blurb} ${product.kind}`.toLowerCase().includes(q),
  );
}
