import Link from "next/link";
import { plantBubble } from "@/lib/media";

const DIRT_AMBASSADORS = [
  { slug: "passionflower", name: "Passionflower" },
  { slug: "lavender", name: "Lavender" },
  { slug: "ginger", name: "Ginger" },
  { slug: "ginseng", name: "Ginseng" },
  { slug: "clove", name: "Clove" },
  { slug: "arnica", name: "Arnica" },
  { slug: "aloe", name: "Aloe" },
  { slug: "milk-thistle", name: "Milk Thistle" },
] as const;

export function DirtAmbassadors() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 pb-6 pt-10 md:px-8 md:pb-12 md:pt-14">
      <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {DIRT_AMBASSADORS.map((ambassador) => {
          const src = plantBubble(ambassador.slug);
          return (
            <li key={ambassador.slug}>
              <Link
                href={`/library/${ambassador.slug}`}
                aria-label={ambassador.name}
                className="block h-[4.6rem] w-[4.6rem] overflow-hidden rounded-full bg-[#e8d4dc] ring-2 ring-white/35 md:h-[5.6rem] md:w-[5.6rem]"
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
