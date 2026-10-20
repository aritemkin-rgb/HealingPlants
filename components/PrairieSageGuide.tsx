"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createLiveSageSession,
  loadRunwayCallUI,
  RUNWAY_EMBED_API,
  type RunwayCallHandle,
} from "@/lib/runwayEmbedClient";
import { runwayOriginHelp } from "@/lib/runwayOrigins";
import { sageFull } from "@/lib/media";

type TalkStatus = "idle" | "connecting" | "live" | "error";

const TALK_EVENT = "hpw:talk-sage";

export function startPrairieSageTalk() {
  window.dispatchEvent(new Event(TALK_EVENT));
}

export function PrairieSageGuide({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  plantSlug?: string;
  plantName?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<RunwayCallHandle | null>(null);
  const [status, setStatus] = useState<TalkStatus>("idle");
  const [error, setError] = useState("");

  const stopTalk = useCallback(() => {
    callRef.current?.unmount();
    callRef.current = null;
    if (mountRef.current) mountRef.current.replaceChildren();
    setStatus("idle");
    setError("");
    onClose();
  }, [onClose]);

  const startTalk = useCallback(async () => {
    if (status === "connecting" || status === "live") return;
    setError("");
    setStatus("connecting");
    onOpen();
    mountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const live = await createLiveSageSession();
      const frame = mountRef.current;
      if (!frame) throw new Error("connect");
      const mountCallUI = await loadRunwayCallUI();
      frame.replaceChildren();
      callRef.current = mountCallUI(frame, {
        avatarId: live.avatarId,
        sessionId: live.sessionId,
        sessionKey: live.sessionKey,
        baseUrl: RUNWAY_EMBED_API,
        callShape: "full",
        maxDurationSeconds: 120,
        onEnd: () => {
          callRef.current = null;
          setStatus("idle");
          onClose();
        },
        onError: () => {
          callRef.current = null;
          setStatus("error");
          setError("Sage dropped the line. Try again in a moment.");
        },
      });
      setStatus("live");
    } catch (cause) {
      const pageOrigin =
        cause instanceof Error && typeof cause.cause === "string"
          ? cause.cause
          : window.location.origin;
      const reason = cause instanceof Error ? cause.message : "connect";
      setStatus("error");
      setError(
        reason === "origin"
          ? runwayOriginHelp(pageOrigin)
          : "Sage could not start the live call. Allow the microphone, then try Talk with Healing Guide again.",
      );
    }
  }, [onClose, onOpen, status]);

  useEffect(() => {
    if (!open) return;
    if (status === "idle") void startTalk();
  }, [open, startTalk, status]);

  useEffect(() => {
    function onTalk() {
      void startTalk();
    }
    window.addEventListener(TALK_EVENT, onTalk);
    return () => window.removeEventListener(TALK_EVENT, onTalk);
  }, [startTalk]);

  useEffect(() => {
    return () => {
      callRef.current?.unmount();
    };
  }, []);

  return (
    <aside id="sage-talk" className="relative mx-auto w-full self-start lg:mx-0">
      <div className="relative">
        <div
          ref={mountRef}
          className="prairie-sage-call mx-auto h-[32rem] w-full max-w-full"
        />
        {status !== "live" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sageFull}
              alt="Prairie Sage, guide of Healing Plants of the World"
              className="pointer-events-none absolute inset-0 mx-auto h-[32rem] w-auto max-w-full object-contain object-top"
            />
            <div className="absolute bottom-[4%] left-1/2 flex w-[12.5rem] -translate-x-1/2 flex-col items-center gap-2">
              {status === "connecting" ? (
                <p className="rounded-full bg-[var(--gold)] px-3 py-2 text-center font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--soil-brown)] shadow-sm">
                  Sage is waking…
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="w-full rounded-full bg-[var(--gold)] px-3 py-2 text-center font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--soil-brown)] shadow-sm"
                >
                  Talk with Healing Guide
                </button>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={stopTalk}
            className="absolute top-3 right-3 z-10 rounded-full bg-[rgba(16,12,8,0.7)] px-3 py-1.5 font-condensed text-[0.65rem] uppercase tracking-[0.14em] text-white"
          >
            End
          </button>
        )}
      </div>
      {status === "error" ? (
        <p className="mt-3 max-w-sm whitespace-pre-line text-sm font-light leading-relaxed text-[var(--ink)]">
          {error}
        </p>
      ) : null}
    </aside>
  );
}
