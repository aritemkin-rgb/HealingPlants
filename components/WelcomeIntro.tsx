"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { attachHoldLastFrame, markIntroDone } from "@/lib/holdLastFrame";
import {
  loadingVideos,
  oliveTreeFull,
  oliveTreeHomeVideo,
  sageLoadingVideo,
} from "@/lib/media";

const figures = [
  {
    src: loadingVideos.orchid,
    poster: "/assets/loading/orchid.png",
    aspect: "640 / 640",
    stacked: true,
    loop: false,
    holdPad: 0.12,
  },
  {
    src: sageLoadingVideo,
    poster: "/assets/loading/prairie-sage.png",
    aspect: "540 / 720",
    stacked: false,
    loop: true,
    holdPad: 0,
  },
  {
    src: loadingVideos.passionflower,
    poster: "/assets/loading/passionflower.png",
    aspect: "1288 / 712",
    stacked: true,
    loop: false,
    holdPad: 0.12,
  },
  {
    src: oliveTreeHomeVideo,
    poster: oliveTreeFull,
    aspect: "540 / 720",
    stacked: false,
    loop: true,
    holdPad: 0,
  },
  {
    src: loadingVideos.ginseng,
    poster: "/assets/loading/ginseng.png",
    aspect: "624 / 624",
    stacked: true,
    loop: false,
    holdPad: 0.12,
  },
] as const;

const ROW_HEIGHT = "min(46vh, 420px)";

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  return unlockScroll;
}

function LoadingFigure({
  src,
  poster,
  aspect,
  stacked,
  loop,
  holdPad,
}: (typeof figures)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (loop) {
      video.loop = true;
      return;
    }
    const hold = attachHoldLastFrame(video, holdPad);
    hold.arm();
    return () => hold.detach();
  }, [holdPad, loop, src]);

  return (
    <div
      className="relative h-full shrink-0 overflow-hidden bg-white"
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        poster={stacked ? undefined : poster}
        autoPlay
        muted
        playsInline
        loop={loop}
        preload="auto"
        onLoadedData={() => setReady(true)}
        className={`absolute bottom-0 left-0 w-full max-w-none bg-white object-cover object-bottom transition-opacity duration-200 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: stacked ? "200%" : "100%",
          transform: stacked ? "scale(1.02)" : undefined,
          transformOrigin: "bottom center",
        }}
      />
    </div>
  );
}

export function WelcomeIntro() {
  const pathname = usePathname();
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [fit, setFit] = useState(1);

  useLayoutEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      unlockScroll();
      return;
    }
    if (sessionStorage.getItem("hpw-loading") === "1" || !visible) {
      unlockScroll();
      if (!visible) return;
      setVisible(false);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hide = window.setTimeout(() => {
      markIntroDone();
      setVisible(false);
    }, reduced ? 1800 : 5000);

    const unlock = lockScroll();

    const row = rowRef.current;
    const parent = row?.parentElement;
    function measure() {
      if (!row || !parent) return;
      const next = Math.min(1, parent.clientWidth / row.scrollWidth);
      setFit(Number.isFinite(next) && next > 0 ? next : 1);
    }
    measure();
    requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (row) observer.observe(row);
    if (parent) observer.observe(parent);

    return () => {
      window.clearTimeout(hide);
      observer.disconnect();
      unlock();
    };
  }, [pathname, visible]);

  if (pathname !== "/" || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-white"
      role="dialog"
      aria-label="Healing Plants of the World"
    >
      <button
        type="button"
        onClick={() => {
          markIntroDone();
          unlockScroll();
          setVisible(false);
        }}
        className="absolute top-5 right-5 z-10 font-condensed text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]"
      >
        Skip
      </button>

      <div className="flex h-full flex-col items-center px-4 pt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo/logo-stacked.png"
          alt="Healing Plants of the World"
          className="h-auto w-52 shrink-0 md:w-72"
        />

        <div className="mt-8 flex w-full justify-center overflow-hidden">
          <div
            ref={rowRef}
            className="flex items-end justify-center gap-3 md:gap-5"
            style={{
              height: ROW_HEIGHT,
              transform: `scale(${fit})`,
              transformOrigin: "center center",
            }}
          >
            {figures.map((figure) => (
              <LoadingFigure key={figure.src} {...figure} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
