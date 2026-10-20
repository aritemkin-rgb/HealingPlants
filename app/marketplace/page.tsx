import { Suspense } from "react";
import { MarketplaceClient } from "@/components/MarketplaceClient";

export const metadata = {
  title: "Marketplace",
};

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="px-4 py-16">Opening the stall…</div>}>
      <MarketplaceClient />
    </Suspense>
  );
}
