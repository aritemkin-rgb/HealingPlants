"use client";

import { useSearchParams } from "next/navigation";
import { MoneyTreeStall } from "@/components/MoneyTreeStall";

export function MarketplaceOlive() {
  const talkOpen = useSearchParams().get("talk") === "1";

  return (
    <div className="max-lg:mt-10 lg:fixed lg:bottom-4 lg:right-8 lg:z-20 lg:w-[22rem]">
      <MoneyTreeStall initialOpen={talkOpen} />
    </div>
  );
}
