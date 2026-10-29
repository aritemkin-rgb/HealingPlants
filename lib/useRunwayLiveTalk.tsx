"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  cancelLiveSageSession,
  createLiveSageSession,
  loadRunwayCallUI,
  requestSageMicrophone,
  restyleCallFrame,
  RUNWAY_EMBED_API,
  sageCallMountNode,
  type RunwayCallHandle,
  type RunwayCharacter,
} from "@/lib/runwayEmbedClient";
import { runwayKeyHelp, runwayOriginHelp } from "@/lib/runwayOrigins";

type TalkStatus = "idle" | "connecting" | "live" | "error";
type MicPrompt = "hidden" | "ask" | "blocked";

export function useRunwayLiveTalk({
  character,
  displayName,
  busyCopy,
  avatarFallback = "",
  autoPrompt = false,
  onOpen,
  onClose,
}: {
  character: RunwayCharacter;
  displayName: string;
  busyCopy: string;
  avatarFallback?: string;
  autoPrompt?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<RunwayCallHandle | null>(null);
  const sessionIdRef = useRef("");
  const busyRef = useRef(false);
  const autoPromptedRef = useRef(false);
  const characterRef = useRef(character);
  characterRef.current = character;
  const [status, setStatus] = useState<TalkStatus>("idle");
  const [error, setError] = useState("");
  const [micPrompt, setMicPrompt] = useState<MicPrompt>("hidden");

  const clearCall = useCallback(() => {
    const sessionId = sessionIdRef.current;
    sessionIdRef.current = "";
    if (sessionId) {
      void cancelLiveSageSession(characterRef.current, sessionId);
      try {
        sessionStorage.removeItem(`hpw-runway-${characterRef.current}`);
      } catch {
        /* private mode */
      }
    }
    callRef.current?.unmount();
    callRef.current = null;
    mountRef.current?.shadowRoot
      ?.querySelector("[data-sage-call]")
      ?.replaceChildren();
  }, []);

  const stopTalk = useCallback(() => {
    busyRef.current = false;
    clearCall();
    setStatus("idle");
    setError("");
    setMicPrompt("hidden");
    onClose?.();
  }, [clearCall, onClose]);

  const promptMic = useCallback(() => {
    if (status === "live" || busyRef.current) return;
    setError("");
    setMicPrompt("ask");
    onOpen?.();
  }, [onOpen, status]);

  const startTalk = useCallback(async () => {
    if (busyRef.current || status === "live") return;
    busyRef.current = true;
    setError("");
    setMicPrompt("hidden");
    setStatus("connecting");
    onOpen?.();

    try {
      const host = mountRef.current;
      if (!host) throw new Error("connect");
      const [, mountCallUI] = await Promise.all([
        requestSageMicrophone(),
        loadRunwayCallUI(),
      ]);
      const previous = sessionIdRef.current;
      if (previous) {
        void cancelLiveSageSession(character, previous);
      }
      try {
        const other = character === "prairie" ? "moneyTree" : "prairie";
        const leftover = sessionStorage.getItem(`hpw-runway-${other}`);
        if (leftover) {
          void cancelLiveSageSession(other, leftover);
          sessionStorage.removeItem(`hpw-runway-${other}`);
        }
      } catch {
        /* private mode */
      }
      const live = await createLiveSageSession(character);
      sessionIdRef.current = live.sessionId;
      try {
        sessionStorage.setItem(`hpw-runway-${character}`, live.sessionId);
      } catch {
        /* private mode */
      }
      const frame = sageCallMountNode(host);
      callRef.current = mountCallUI(frame, {
        avatarId: live.avatarId || avatarFallback,
        sessionId: live.sessionId,
        sessionKey: live.sessionKey,
        baseUrl: RUNWAY_EMBED_API,
        callShape: "full",
        maxDurationSeconds: 120,
        onError: () => {},
        onEnd: () => {
          clearCall();
          busyRef.current = false;
          setStatus("idle");
          onClose?.();
        },
      });
      restyleCallFrame(host);
      requestAnimationFrame(() => restyleCallFrame(host));
      window.setTimeout(() => restyleCallFrame(host), 80);
      setStatus("live");
    } catch (cause) {
      clearCall();
      busyRef.current = false;
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
        origin: runwayOriginHelp(pageOrigin, displayName),
        key: runwayKeyHelp(displayName),
        busy: busyCopy,
        timeout: `${displayName} took too long to wake. Try again.`,
        script: `${displayName}’s video player did not load. Refresh the page, then try again.`,
      };
      setError(
        messages[reason] ??
          `${displayName} could not start the live call. Wait a minute and try again.`,
      );
    }
  }, [
    avatarFallback,
    busyCopy,
    character,
    clearCall,
    displayName,
    onClose,
    onOpen,
    status,
  ]);

  useEffect(() => {
    void loadRunwayCallUI();
    return () => {
      clearCall();
    };
  }, [clearCall]);

  useEffect(() => {
    if (!autoPrompt || autoPromptedRef.current) return;
    autoPromptedRef.current = true;
    promptMic();
  }, [autoPrompt, promptMic]);

  return {
    mountRef,
    status,
    error,
    micPrompt,
    promptMic,
    startTalk,
    stopTalk,
  };
}

export function MicPromptCard({
  name,
  prompt,
  onAllow,
  onClose,
}: {
  name: string;
  prompt: MicPrompt;
  onAllow: () => void;
  onClose: () => void;
}) {
  if (prompt === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="runway-mic-title"
      className="mb-3 rounded-2xl bg-white p-5 ring-1 ring-[rgba(44,36,22,0.12)]"
    >
      {prompt === "ask" ? (
        <>
          <h2 id="runway-mic-title" className="font-display text-xl text-[var(--ink)]">
            {name} needs your microphone
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
            After you tap Allow below, look at the top of the browser — next to
            the address — and tap <strong>Allow</strong> there too. That bar
            cannot be covered by this page.
          </p>
          <button
            type="button"
            onClick={onAllow}
            className="mt-4 w-full rounded-full bg-[var(--gold)] px-4 py-3 font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-[var(--soil-brown)]"
          >
            Allow microphone
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.12em] text-[var(--ink)]"
          >
            Close
          </button>
        </>
      ) : (
        <>
          <h2 id="runway-mic-title" className="font-display text-xl text-[var(--ink)]">
            Microphone is blocked
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
            Tap the lock beside the website address, set Microphone to Allow,
            then try again.
          </p>
          <button
            type="button"
            onClick={onAllow}
            className="mt-4 w-full rounded-full bg-[var(--gold)] px-4 py-3 font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-[var(--soil-brown)]"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.12em] text-[var(--ink)]"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
}
