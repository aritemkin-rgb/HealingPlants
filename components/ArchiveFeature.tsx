"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlantPortrait } from "@/components/PlantPortrait";
import { attachHoldLastFrame } from "@/lib/holdLastFrame";
import { arnicaLibraryPoster, arnicaLibraryVideo } from "@/lib/media";
import type { Plant } from "@/lib/types";

function PlayMark() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-sm">
      <span className="ml-0.5 border-y-[9px] border-l-[14px] border-y-transparent border-l-[var(--ink)]" />
    </span>
  );
}

export function ArchiveFeature({
  plant,
  showCharacter,
}: {
  plant: Plant;
  showCharacter: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<ReturnType<typeof attachHoldLastFrame> | null>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!showCharacter) {
      setPlaying(false);
      return;
    }
    const video = videoRef.current;
    const box = boxRef.current;
    if (!video || !box) return;

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    const hold = attachHoldLastFrame(video);
    hold.arm();
    holdRef.current = hold;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const io = new IntersectionObserver(
      (entries) => {
        if (
          startedRef.current &&
          !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.2)
        ) {
          video.pause();
        }
      },
      { threshold: [0.2] },
    );
    io.observe(box);

    return () => {
      io.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.pause();
      hold.detach();
      holdRef.current = null;
    };
  }, [showCharacter]);

  function playNow() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    const nearEnd =
      Number.isFinite(video.duration) &&
      video.duration > 0 &&
      video.currentTime >= Math.max(0, video.duration - 0.4);
    if (nearEnd) {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      holdRef.current?.arm();
    }
    startedRef.current = true;
    void video.play().then(
      () => setPlaying(true),
      () => {
        startedRef.current = false;
        setPlaying(false);
      },
    );
  }

  function pauseNow() {
    videoRef.current?.pause();
    setPlaying(false);
  }

  return (
    <div className="mt-8 flex flex-col items-center text-center">
      <div
        ref={boxRef}
        className="w-full overflow-hidden rounded-[1.4rem] bg-white p-2 md:p-2.5"
      >
        {showCharacter ? (
          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.15rem] bg-white">
            <video
              ref={videoRef}
              poster={arnicaLibraryPoster}
              playsInline
              preload="auto"
              controls={false}
              data-arnica-video
              aria-label="Arnica, library keeper"
              className="absolute inset-0 h-full w-full object-cover object-center"
            >
              <source src={arnicaLibraryVideo} type="video/mp4" />
            </video>
            {playing ? (
              <button
                type="button"
                onClick={pauseNow}
                className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink)] shadow-sm"
                aria-label="Pause Arnica"
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void playNow()}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(16,12,8,0.12)]"
                aria-label="Play Arnica with sound"
              >
                <PlayMark />
                <span className="rounded-full bg-[var(--gold)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm">
                  Play with sound
                </span>
              </button>
            )}
          </div>
        ) : (
          <Link
            href={`/library/${plant.slug}`}
            className="flex justify-center"
            aria-label={`Open ${plant.name} profile`}
          >
            <PlantPortrait
              slug={plant.slug}
              name={plant.name}
              className="h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64"
            />
          </Link>
        )}
      </div>
      <p className="mt-4 font-display text-2xl text-white md:text-[1.85rem]">
        {showCharacter ? "Arnica" : plant.name}
      </p>
      <p className="mt-2 max-w-xs text-[0.95rem] font-light leading-relaxed text-[rgba(243,235,221,0.78)]">
        {showCharacter
          ? "Tap play to hear Arnica, then a name to open the plants."
          : "Tap the picture to open the profile."}
      </p>
    </div>
  );
}
