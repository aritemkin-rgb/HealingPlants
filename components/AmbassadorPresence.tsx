import { visualAmbassadors } from "@/lib/knowledgeBase";

export function AmbassadorPresence({
  title = "Ambassadors in the world",
  soil = false,
}: {
  title?: string;
  soil?: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <p
        className={`font-sans text-[0.7rem] uppercase tracking-[0.24em] ${
          soil ? "text-[var(--root-gold)]" : "text-[var(--moss)]"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-2 max-w-2xl text-sm ${
          soil ? "text-[rgba(243,235,221,0.75)]" : "text-[var(--ink-soft)]"
        }`}
      >
        Non-talking characters still greet the rooms. Chat comes later. Art can
        be dropped into <code>public/assets/characters/</code> without rewriting pages.
      </p>
      <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
        {visualAmbassadors().map((ambassador) => (
          <article
            key={ambassador.slug}
            className="min-w-[9.5rem] rounded-2xl border border-[rgba(44,36,22,0.1)] bg-white p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ambassador.image}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <h3 className="mt-3 font-display text-xl">{ambassador.name}</h3>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.14em] text-[var(--terracotta)]">
              {ambassador.status === "not-yet-created" ? "Not yet created" : "Visual presence"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
