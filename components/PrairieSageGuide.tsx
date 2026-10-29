"use client";

import { useEffect } from "react";
import { sageClose } from "@/lib/media";
import { MicPromptCard, useRunwayLiveTalk } from "@/lib/useRunwayLiveTalk";

export const TALK_EVENT = "healing-plants:talk-sage";

export function startPrairieSageTalk() {
  window.dispatchEvent(new Event(TALK_EVENT));
}

export function PrairieSageGuide({
  open = false,
  onOpen,
  onClose,
}: {
  plantSlug?: string;
  plantName?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const {
    mountRef,
    status,
    error,
    micPrompt,
    promptMic,
    startTalk,
    stopTalk,
  } = useRunwayLiveTalk({
    character: "prairie",
    displayName: "Sage",
    busyCopy:
      "Sage is with someone else. Wait about a minute, then try Talk with Healing Guide again.",
    autoPrompt: open,
    onOpen,
    onClose,
  });

  useEffect(() => {
    const onTalk = () => promptMic();
    window.addEventListener(TALK_EVENT, onTalk);
    return () => window.removeEventListener(TALK_EVENT, onTalk);
  }, [promptMic]);

  const showIdle = status === "idle" || status === "error";

  return (
    <aside id="sage-talk" className="relative w-full lg:sticky lg:top-24">
      <MicPromptCard
        name="Sage"
        prompt={micPrompt}
        onAllow={() => void startTalk()}
        onClose={stopTalk}
      />
      <div className="relative aspect-square w-full">
        <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-white">
          {showIdle ? (
            <button
              type="button"
              onClick={promptMic}
              aria-label="Talk with Sage"
              className="absolute inset-0 overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sageClose}
                alt=""
                className="pointer-events-none h-full w-full bg-white object-cover object-[center_18%]"
              />
            </button>
          ) : null}
          <div
            ref={mountRef}
            className={
              showIdle
                ? "pointer-events-none absolute inset-0 opacity-0"
                : "absolute inset-0"
            }
          />
        </div>
        {showIdle ? (
          <button
            type="button"
            onClick={promptMic}
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm"
          >
            Talk with Healing Guide
          </button>
        ) : null}
        {status === "connecting" ? (
          <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <span className="inline-block whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm">
              Sage is waking…
            </span>
          </p>
        ) : null}
        {status === "live" ? (
          <button
            type="button"
            onClick={stopTalk}
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[rgba(16,12,8,0.7)] px-4 py-2 font-condensed text-[0.65rem] uppercase tracking-[0.14em] text-white"
          >
            End
          </button>
        ) : null}
      </div>
      {status === "error" && error ? (
        <p className="mt-3 whitespace-pre-line text-sm font-light leading-relaxed text-[var(--ink)]">
          {error}
        </p>
      ) : null}
    </aside>
  );
}
