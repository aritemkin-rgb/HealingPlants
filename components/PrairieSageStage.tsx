"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const API = "https://api.dev.runwayml.com";
const CALL_SCRIPT = "https://cdn.dev.runwayml.com/prod/widget-call.js";
const TALK_EVENT = "hpw:talk-sage";

type TalkStatus = "idle" | "connecting" | "live" | "error";

type CallHandle = { unmount: () => void };

type EmbedSession = {
  id?: string;
  avatarId?: string;
  status?: string;
  sessionKey?: string;
};

declare global {
  interface Window {
    __runwayEmbedCallUI?: {
      mountCallUI: (
        el: HTMLElement,
        opts: Record<string, unknown>,
      ) => CallHandle;
    };
  }
}

async function createLiveSession() {
  const origin = window.location.origin;
  const created = await fetch("/api/runway-embed-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin }),
  });
  const body = (await created.json()) as EmbedSession & {
    sessionId?: string;
    error?: string;
    origin?: string;
  };
  if (!created.ok) {
    const err = new Error(body.error === "origin" ? "origin" : "connect");
    err.cause = origin;
    throw err;
  }
  if (!body.sessionId || !body.sessionKey) {
    const err = new Error("connect");
    err.cause = origin;
    throw err;
  }
  return {
    sessionId: body.sessionId,
    avatarId: body.avatarId ?? "",
    sessionKey: body.sessionKey,
  };
}

async function loadCallUI() {
  if (window.__runwayEmbedCallUI?.mountCallUI) {
    return window.__runwayEmbedCallUI.mountCallUI;
  }

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CALL_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script")));
      return;
    }
    const script = document.createElement("script");
    script.src = CALL_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script"));
    document.head.appendChild(script);
  });

  const mount = window.__runwayEmbedCallUI?.mountCallUI;
  if (!mount) throw new Error("script");
  return mount;
}

export function startPrairieSageTalk() {
  window.dispatchEvent(new Event(TALK_EVENT));
}

export function PrairieSageStage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<CallHandle | null>(null);
  const [status, setStatus] = useState<TalkStatus>("idle");
  const [error, setError] = useState("");

  const stopTalk = useCallback(() => {
    callRef.current?.unmount();
    callRef.current = null;
    if (mountRef.current) mountRef.current.replaceChildren();
    setStatus("idle");
  }, []);

  const startTalk = useCallback(async () => {
    if (status === "connecting" || status === "live") return;
    setError("");
    setStatus("connecting");
    mountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const live = await createLiveSession();
      const frame = mountRef.current;
      if (!frame) throw new Error("connect");
      const mountCallUI = await loadCallUI();
      frame.replaceChildren();
      callRef.current = mountCallUI(frame, {
        avatarId: live.avatarId,
        sessionId: live.sessionId,
        sessionKey: live.sessionKey,
        baseUrl: API,
        callShape: "full",
        maxDurationSeconds: 120,
        onEnd: () => {
          callRef.current = null;
          setStatus("idle");
        },
        onError: () => {
          callRef.current = null;
          setStatus("error");
          setError(
            "Sage dropped the line. Try again in a moment.",
          );
        },
      });
      setStatus("live");
    } catch (cause) {
      const pageOrigin =
        cause instanceof Error && typeof cause.cause === "string"
          ? cause.cause
          : window.location.origin;
      setStatus("error");
      setError(
        `Runway is not allowing ${pageOrigin}. In Allowed origins click Edit and put both of these, one per line:\nhttp://127.0.0.1:3000\nhttp://localhost:3000`,
      );
    }
  }, [status]);

  useEffect(() => {
    function onTalk() {
      void startTalk();
    }
    window.addEventListener(TALK_EVENT, onTalk);
    return () => {
      window.removeEventListener(TALK_EVENT, onTalk);
      callRef.current?.unmount();
    };
  }, [startTalk]);

  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-md">
      <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(44,36,22,0.08)] bg-[var(--soil)]">
        <div
          ref={mountRef}
          className="prairie-sage-call relative h-[28rem] w-full md:h-[32rem]"
        />
        {status !== "live" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/characters/prairie-sage-full.jpg"
              alt="Prairie Sage, guide of Healing Plants of the World"
              width={1211}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-[rgba(16,12,8,0.72)] via-[rgba(16,12,8,0.28)] to-transparent px-5 pt-24 pb-6">
              {status === "connecting" ? (
                <p className="font-display text-lg text-[var(--parchment)]">
                  Sage is waking…
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="rounded-full bg-[var(--parchment)] px-5 py-3 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-[var(--soil)]"
                >
                  Talk with Prairie Sage
                </button>
              )}
              {status === "error" ? (
                <p className="max-w-xs whitespace-pre-line text-center text-xs leading-relaxed text-[var(--parchment)]">
                  {error}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={stopTalk}
            className="absolute top-3 right-3 z-10 rounded-full bg-[rgba(16,12,8,0.7)] px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-[var(--parchment)]"
          >
            End
          </button>
        )}
      </div>
      <p className="mt-5 max-w-sm font-display text-xl leading-snug text-[var(--soil)]">
        “I know where you are. Tell me what you need — or do not. The plants are
        still on the table.”
      </p>
      <p className="mt-2 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        Prairie Sage · Guide / Navigation · Live talk
      </p>
    </div>
  );
}
