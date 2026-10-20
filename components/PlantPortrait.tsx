import { plantPortraitKind, plantPortraitSrc } from "@/lib/media";
import { BotanicMark } from "@/components/BotanicMark";

export function PlantPortrait({
  slug,
  name,
  className = "",
  size = "tile",
}: {
  slug: string;
  name: string;
  className?: string;
  size?: "tile" | "hero" | "thumb";
}) {
  const src = plantPortraitSrc(slug);
  const defaults =
    size === "thumb"
      ? "h-16 w-16"
      : size === "hero"
        ? "h-56 w-56"
        : "h-36 w-36";
  const box = /\bh-/.test(className)
    ? `overflow-hidden rounded-none bg-white ${className}`
    : `overflow-hidden rounded-none bg-white ${defaults} ${className}`;

  if (!src) {
    return (
      <div className={box}>
        <BotanicMark slug={slug} className="h-full w-full" />
      </div>
    );
  }

  const fit =
    plantPortraitKind(slug) === "character"
      ? "object-cover object-[center_18%]"
      : "object-contain object-center p-1";

  return (
    <div className={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name} className={`h-full w-full ${fit}`} />
    </div>
  );
}
