type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizes: Record<AvatarSize, { px: number; className: string }> = {
  sm: { px: 36, className: "h-9 w-9" },
  md: { px: 48, className: "h-12 w-12" },
  lg: { px: 72, className: "h-[72px] w-[72px]" },
  xl: { px: 160, className: "h-40 w-40" },
};

function initialsFor(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function CharacterAvatar({
  name,
  image,
  size = "md",
  className = "",
}: {
  name: string;
  image?: string;
  size?: AvatarSize;
  className?: string;
}) {
  const dim = sizes[size];

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full border border-[rgba(197,165,114,0.45)] bg-[var(--soil)] ${dim.className} ${className}`}
    >
      {image ? (
        // next/image optimization was collapsing these portraits on the T7 volume.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          width={dim.px}
          height={dim.px}
          className="h-full w-full object-cover object-[center_18%]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--root-gold)]">
          {initialsFor(name)}
        </span>
      )}
    </span>
  );
}
