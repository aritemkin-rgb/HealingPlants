import { plantPortraitKind, plantPortraitSrc } from "@/lib/media";
import { BotanicMark } from "@/components/BotanicMark";

export function PlantPortrait({
  slug,
  name,
  className = "",
  size = "tile",
  onDirt = false,
  circle = false,
}: {
  slug: string;
  name: string;
  className?: string;
  size?: "tile" | "hero" | "thumb";
  onDirt?: boolean;
  circle?: boolean;
}) {
  const src = plantPortraitSrc(slug);
  const defaults =
    size === "thumb"
      ? "h-16 w-16"
      : size === "hero"
        ? "h-56 w-56"
        : "h-36 w-36";
  const box = `${/\bh-/.test(className) ? className : `${defaults} ${className}`} ${
    circle ? "overflow-hidden rounded-full bg-white" : "rounded-none bg-transparent"
  } ${onDirt ? "mix-blend-multiply" : ""}`;

  if (!src) {
    return (
      <div className={box}>
        <BotanicMark slug={slug} className="h-full w-full" />
      </div>
    );
  }

  const fit = circle
    ? "object-cover object-center"
    : plantPortraitKind(slug) === "character"
      ? "object-cover object-[center_18%]"
      : "object-contain object-center";

  return (
    <div className={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className={`h-full w-full ${fit}`}
      />
    </div>
  );
}
