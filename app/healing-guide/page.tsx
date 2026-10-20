import { Suspense } from "react";
import { HealingGuideClient } from "@/components/HealingGuideClient";

export const metadata = {
  title: "Healing Guide",
};

export default function HealingGuidePage() {
  return (
    <Suspense fallback={<div className="px-4 py-16">Opening the guide…</div>}>
      <HealingGuideClient />
    </Suspense>
  );
}
