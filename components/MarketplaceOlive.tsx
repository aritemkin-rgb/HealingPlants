"use client";

import { useSearchParams } from "next/navigation";
import { MoneyTreeStall } from "@/components/MoneyTreeStall";

export function MarketplaceOlive() {
  const talkOpen = useSearchParams().get("talk") === "1";

  return (
    <div className="max-lg:mt-10">
      <MoneyTreeStall initialOpen={talkOpen} />
    </div>
  );
}
