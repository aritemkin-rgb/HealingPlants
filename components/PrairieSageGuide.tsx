"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createLiveSageSession,
  loadRunwayCallUI,
  requestSageMicrophone,
  RUNWAY_EMBED_API,
  sageCallMountNode,
  type RunwayCallHandle,
} from "@/lib/runwayEmbedClient";
import { runwayKeyHelp, runwayOriginHelp } from "@/lib/runwayOrigins";
import { sageFull } from "@/lib/media";

type TalkStatus = "idle" | "connecting" | "live" | "error";
type MicPrompt = "hidden" | "ask" | "blocked";

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
  const [micPrompt, setMicPrompt] = useState<MicPrompt>("hidden");

  const stopTalk = useCallback(() => {
    callRef.current?.unmount();
    callRef.current = null;
    mountRef.current?.shadowRoot
      ?.querySelector("[data-sage-call]")
      ?.replaceChildren();
    setStatus("idle");
    setError("");
    setMicPrompt("hidden");
    onClose();
  }, [onClose]);

  const startTalk = useCallback(async () => {
    if (status === "connecting" || status === "live") return;
    setError("");
    setMicPrompt("ask");
    setStatus("connecting");
    onOpen();
    mountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const [, mountCallUI] = await Promise.all([
        requestSageMicrophone(),
        loadRunwayCallUI(),
      ]);
      setMicPrompt("hidden");
      const live = await createLiveSageSession("prairie");
      const host = mountRef.current;
      if (!host) throw new Error("connect");
      const frame = sageCallMountNode(host);
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
      if (reason === "mic") {
        setMicPrompt("blocked");
        setError("");
        return;
      }
      setMicPrompt("hidden");
      const messages: Record<string, string> = {
        origin: runwayOriginHelp(pageOrigin, "Prairie Sage"),
        key: runwayKeyHelp("Prairie Sage"),
        busy: "Sage is on another call. Wait about a minute, then click Talk with Healing Guide again.",
        timeout: "Sage took too long to wake. Try Talk with Healing Guide again.",
        script: "Sage’s video player did not load. Refresh the page, then try again.",
      };
      setError(
        messages[reason] ??
          "Sage could not start the live call. Wait a minute and try Talk with Healing Guide again.",
      );
    }
  }, [onClose, onOpen, status]);

  useEffect(() => {
    if (!open || status !== "idle") return;
    setMicPrompt("ask");
  }, [open, status]);

  useEffect(() => {
    function onTalk() {
      void startTalk();
    }
    window.addEventListener(TALK_EVENT, onTalk);
    return () => window.removeEventListener(TALK_EVENT, onTalk);
  }, [startTalk]);

  useEffect(() => {
    void loadRunwayCallUI();
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
              {status === "connecting" && micPrompt !== "ask" ? (
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
      {status === "error" && error ? (
        <p className="mt-3 max-w-sm whitespace-pre-line text-sm font-light leading-relaxed text-[var(--ink)]">
          {error}
        </p>
      ) : null}

      {micPrompt !== "hidden" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,12,8,0.45)] px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sage-mic-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
          >
            {micPrompt === "ask" ? (
              <>
                <h2
                  id="sage-mic-title"
                  className="font-display text-xl text-[var(--ink)]"
                >
                  Sage needs your microphone
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
                  Chrome will show a popup at the top of this window. Click{" "}
                  <strong>Allow</strong> so Sage can hear you.
                </p>
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="mt-5 w-full rounded-full bg-[var(--gold)] px-4 py-3 font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-[var(--soil-brown)]"
                >
                  Allow microphone
                </button>
              </>
            ) : (
              <>
                <h2
                  id="sage-mic-title"
                  className="font-display text-xl text-[var(--ink)]"
                >
                  Microphone is blocked
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
                  Click the lock to the left of healingplantsoftheworld.net,
                  set Microphone to Allow, then try again.
                </p>
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="mt-5 w-full rounded-full bg-[var(--gold)] px-4 py-3 font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-[var(--soil-brown)]"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMicPrompt("hidden");
                    setStatus("idle");
                    onClose();
                  }}
                  className="mt-2 w-full rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.12em] text-[var(--ink)]"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
