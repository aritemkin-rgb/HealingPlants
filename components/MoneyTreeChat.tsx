"use client";

import { GuideBubble, type GuideBubbleProps } from "@/components/GuideBubble";
import { moneyTree } from "@/lib/characters";

export function MoneyTreeChat(props: Partial<GuideBubbleProps>) {
  return (
    <GuideBubble
      characterName={moneyTree.name}
      characterRole={moneyTree.role}
      characterImage={moneyTree.image}
      starterMessage={moneyTree.greeting}
      mode="moneyTree"
      context={props.context ?? "marketplace"}
      description={moneyTree.description}
      {...props}
    />
  );
}
