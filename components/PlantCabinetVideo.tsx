"use client";

import { plantCabinetPoster, plantCabinetVideo } from "@/lib/media";

export function PlantCabinetVideo() {
  return (
    <div className="mt-8 w-full max-w-2xl">
      <video
        src={plantCabinetVideo}
        poster={plantCabinetPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Your indoor live healing cabinet"
        className="block aspect-[4/3] w-full bg-white object-contain"
      />
    </div>
  );
}
