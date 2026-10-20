"use client";

import { GuideBubble, type GuideBubbleProps } from "@/components/GuideBubble";
import { prairieSage } from "@/lib/characters";

export function PrairieSageChat(
  props: Partial<GuideBubbleProps>,
) {
  return (
    <GuideBubble
      characterName={prairieSage.name}
      characterRole={prairieSage.role}
      characterImage={prairieSage.image}
      starterMessage={prairieSage.greeting}
      mode="prairie"
      context={props.context ?? "home"}
      description={prairieSage.description}
      {...props}
    />
  );
}
