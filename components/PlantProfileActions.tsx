import Link from "next/link";
import type { Plant } from "@/lib/types";

export function PlantProfileActions({ plant }: { plant: Plant }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        href={`/marketplace?plant=${plant.slug}`}
        className="rounded-full bg-[var(--gold)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)]"
      >
        Buy
      </Link>
      <Link
        href="/#archive"
        className="rounded-full bg-white px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink)]"
      >
        Back to archive
      </Link>
    </div>
  );
}
