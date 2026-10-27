import Link from "next/link";

const pathways = [
  {
    href: "/healing-guide",
    kicker: "Attracts",
    title: "Healing Guide",
    body: "Need or symptom → a small plant path. Chat is optional.",
  },
  {
    href: "/library",
    kicker: "Guides",
    title: "Plant Library",
    body: "The archive: alphabet, benefit, geography. Open any profile.",
  },
  {
    href: "/marketplace",
    kicker: "Converts",
    title: "Marketplace",
    body: "Liquids, supplements, teas and herbs — and future Shopify paths.",
  },
];

export function MainPathCards() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-10 md:px-8 md:pt-10 md:pb-12">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.24em] text-[var(--moss)]">
          Three pathways
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl leading-tight">
          Click through. Chat later, if at all.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {pathways.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="rounded-[1.5rem] border border-[rgba(44,36,22,0.1)] bg-white p-7 hover:border-[var(--root-gold)]"
            >
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[var(--terracotta)]">
                {path.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl">{path.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {path.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
