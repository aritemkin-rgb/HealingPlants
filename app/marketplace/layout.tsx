import { Suspense } from "react";
import { MarketplaceOlive } from "@/components/MarketplaceOlive";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,32rem)]">
        <div>{children}</div>
        <Suspense fallback={null}>
          <MarketplaceOlive />
        </Suspense>
      </div>
    </div>
  );
}
