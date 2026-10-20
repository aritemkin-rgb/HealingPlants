"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  attachHoldLastFrame,
  INTRO_DONE_EVENT,
  introAlreadyDone,
} from "@/lib/holdLastFrame";
import {
  moneyTreeFull,
  moneyTreeHomeVideo,
  sageFull,
  sageHomeVideo,
} from "@/lib/media";

function HomeFigure({
  video,
  poster,
  alt,
  href,
  label,
  holdPad,
  play,
}: {
  video: string;
  poster: string;
  alt: string;
  href: string;
  label: string;
  holdPad: number;
  play: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const clip = ref.current;
    if (!clip) return;
    const hold = attachHoldLastFrame(clip, holdPad);

    if (!play) {
      hold.disarm();
      clip.pause();
      setLive(false);
      return () => hold.detach();
    }

    let cancelled = false;
    hold.disarm();

    const begin = () => {
      if (cancelled) return;
      hold.arm();
      clip.play().then(() => {
        if (!cancelled) setLive(true);
      }).catch(() => {});
    };

    const start = () => {
      if (cancelled) return;
      const kick = () => {
        if (cancelled) return;
        if (clip.currentTime > 0.05) {
          const onSeeked = () => {
            clip.removeEventListener("seeked", onSeeked);
            begin();
          };
          clip.addEventListener("seeked", onSeeked);
          try {
            clip.currentTime = 0;
          } catch {
            begin();
          }
          return;
        }
        begin();
      };
      if (clip.readyState >= 2) kick();
      else clip.addEventListener("loadeddata", kick, { once: true });
    };

    start();
    return () => {
      cancelled = true;
      hold.detach();
    };
  }, [holdPad, play, video]);

  return (
    <figure className="relative">
      <div
        className="relative mx-auto h-[32rem] w-auto max-w-full md:h-[40rem]"
        style={{ aspectRatio: "540 / 720" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-300 ${
            live ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={ref}
          muted
          playsInline
          preload="auto"
          poster={poster}
          aria-label={alt}
          className={`absolute inset-0 h-full w-full bg-transparent object-contain object-bottom transition-opacity duration-300 ${
            live ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Link
        href={href}
        className="absolute bottom-[7%] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--gold)] px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm"
      >
        {label}
      </Link>
    </figure>
  );
}

export function HomeHero() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (introAlreadyDone()) {
      setPlay(true);
      return;
    }
    const onDone = () => setPlay(true);
    window.addEventListener(INTRO_DONE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, []);

  return (
    <section className="relative bg-white text-[var(--ink)]">
      <div className="relative mx-auto grid max-w-6xl items-end gap-2 px-5 pt-4 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,1.05fr)_minmax(0,1.1fr)] md:gap-3 md:px-6 md:pt-6">
        <div className="order-2 md:order-1">
          <HomeFigure
            video={sageHomeVideo}
            poster={sageFull}
            alt=""
            href="/healing-guide?talk=1#sage-talk"
            label="Talk with Prairie Sage"
            holdPad={0.28}
            play={play}
          />
        </div>

        <div className="order-1 self-start px-1 pb-6 pt-6 text-center md:order-2 md:pb-20 md:pt-12">
          <p className="font-condensed text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            Healing Plants of the World
          </p>
          <h1 className="mt-3 font-display text-balance text-[1.75rem] leading-[1.12] text-[var(--ink)] md:text-[2.2rem]">
            Welcome Judy!
            <span className="mt-2 block">
              You are entering a character-led plant discovery world.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-[var(--ink-soft)]">
            Prairie Sage orients. Click through, or talk.
          </p>
        </div>

        <div className="order-3">
          <HomeFigure
            video={moneyTreeHomeVideo}
            poster={moneyTreeFull}
            alt=""
            href="/marketplace?talk=1"
            label="Talk with Money Tree"
            holdPad={0.85}
            play={play}
          />
        </div>
      </div>
      <div data-guide-sentinel className="h-px w-full" aria-hidden="true" />
    </section>
  );
}
