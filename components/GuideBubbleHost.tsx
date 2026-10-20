"use client";

import { useParams, usePathname } from "next/navigation";
import { GuideBubble } from "@/components/GuideBubble";
import {
  collapsedLabelFor,
  moneyTree,
  prairieSage,
  starterMessageFor,
} from "@/lib/characters";
import { getPlant } from "@/lib/plants";
import type { GuideContext } from "@/lib/types";

function contextFromPath(pathname: string): GuideContext {
  if (pathname.startsWith("/marketplace")) return "marketplace";
  if (pathname.startsWith("/healing-guide")) return "healingGuide";
  if (/^\/library\/[^/]+/.test(pathname)) return "plantProfile";
  if (pathname.startsWith("/library")) return "library";
  return "home";
}

export function GuideBubbleHost() {
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const context = contextFromPath(pathname);
  const plant = params.slug ? getPlant(params.slug) : undefined;
  const marketplace = context === "marketplace";
  const character = marketplace ? moneyTree : prairieSage;

  if (pathname === "/" || pathname.startsWith("/marketplace") || pathname.startsWith("/healing-guide")) return null;

  return (
    <GuideBubble
      key={`${context}-${character.mode}-${plant?.slug ?? ""}`}
      characterName={character.name}
      characterRole={character.role}
      characterImage={character.image}
      starterMessage={starterMessageFor(context, character.mode, plant?.name)}
      mode={character.mode}
      context={context}
      initialOpen={false}
      collapsedLabel={collapsedLabelFor(context, character.mode)}
      plantSlug={plant?.slug}
      plantName={plant?.name}
      description={character.description}
      appearAfterScroll={false}
      placement="right"
    />
  );
}
