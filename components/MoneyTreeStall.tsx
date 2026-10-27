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
import { oliveTreeFull, oliveTreeHomeVideo } from "@/lib/media";

type TalkStatus = "idle" | "connecting" | "live" | "error";
type MicPrompt = "hidden" | "ask" | "blocked";

const MONEY_TREE_AVATAR_ID =
  process.env.NEXT_PUBLIC_RUNWAY_MONEY_TREE_AVATAR_ID ??
  "f436b9d2-8d6c-469d-b5e8-4d325323e92f";

export function MoneyTreeStall({ initialOpen = false }: { initialOpen?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<RunwayCallHandle | null>(null);
  const [status, setStatus] = useState<TalkStatus>("idle");
  const [error, setError] = useState("");
  const [micPrompt, setMicPrompt] = useState<MicPrompt>(
    initialOpen ? "ask" : "hidden",
  );

  const stopTalk = useCallback(() => {
    callRef.current?.unmount();
    callRef.current = null;
    mountRef.current?.shadowRoot
      ?.querySelector("[data-sage-call]")
      ?.replaceChildren();
    setStatus("idle");
    setError("");
    setMicPrompt("hidden");
  }, []);

  const startTalk = useCallback(async () => {
    if (status === "connecting" || status === "live") return;
    setError("");
    setMicPrompt("ask");
    setStatus("connecting");

    try {
      const [, mountCallUI] = await Promise.all([
        requestSageMicrophone(),
        loadRunwayCallUI(),
      ]);
      setMicPrompt("hidden");
      const live = await createLiveSageSession("moneyTree");
      const host = mountRef.current;
      if (!host) throw new Error("connect");
      const frame = sageCallMountNode(host);
      callRef.current = mountCallUI(frame, {
        avatarId: live.avatarId || MONEY_TREE_AVATAR_ID,
        sessionId: live.sessionId,
        sessionKey: live.sessionKey,
        baseUrl: RUNWAY_EMBED_API,
        callShape: "full",
        maxDurationSeconds: 120,
        onEnd: () => {
          callRef.current = null;
          setStatus("idle");
        },
        onError: () => {
          callRef.current = null;
          setStatus("error");
          setError("Olive Tree dropped the line. Try Buyer Guide again.");
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
        origin: runwayOriginHelp(pageOrigin, "Olive Tree (Money Tree)"),
        key: runwayKeyHelp("Olive Tree (Money Tree)"),
        busy: "Olive Tree is on another call. Wait about a minute, then click Buyer Guide again.",
        timeout: "Olive Tree took too long to wake. Try Buyer Guide again.",
        script: "Olive Tree’s video player did not load. Refresh the page, then try again.",
      };
      setError(
        messages[reason] ??
          "Olive Tree could not start the live call. Wait a minute and try Buyer Guide again.",
      );
    }
  }, [status]);

  useEffect(() => {
    void loadRunwayCallUI();
    return () => {
      callRef.current?.unmount();
    };
  }, []);

  return (
    <aside className="relative mx-auto w-full max-w-[22rem]">
      <div className="relative">
        <div
          ref={mountRef}
          className="mx-auto h-[22rem] w-full"
        />
        {status !== "live" ? (
          <>
            <video
              src={oliveTreeHomeVideo}
              poster={oliveTreeFull}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Olive Tree, keeper of the stall"
              className="pointer-events-none absolute inset-0 mx-auto block h-[22rem] w-full bg-transparent object-contain object-bottom"
            />
            <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-col items-center">
              {status === "connecting" && micPrompt !== "ask" ? (
                <p className="whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm">
                  Olive Tree is waking…
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm"
                >
                  Buyer Guide
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
        <p className="mt-3 whitespace-pre-line text-sm font-light leading-relaxed text-[var(--ink)]">
          {error}
        </p>
      ) : null}

      {micPrompt !== "hidden" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,12,8,0.45)] px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="olive-mic-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
          >
            {micPrompt === "ask" ? (
              <>
                <h2
                  id="olive-mic-title"
                  className="font-display text-xl text-[var(--ink)]"
                >
                  Olive Tree needs your microphone
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
                  Chrome will show a popup at the top of this window. Click{" "}
                  <strong>Allow</strong> so Olive Tree can hear you.
                </p>
                <button
                  type="button"
                  onClick={() => void startTalk()}
                  className="mt-5 w-full rounded-full bg-[var(--gold)] px-4 py-3 font-condensed text-[0.75rem] uppercase tracking-[0.12em] text-[var(--soil-brown)]"
                >
                  Allow microphone
                </button>
                <button
                  type="button"
                  onClick={stopTalk}
                  className="mt-2 w-full rounded-full px-4 py-2 font-condensed text-[0.72rem] uppercase tracking-[0.12em] text-[var(--ink)]"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2
                  id="olive-mic-title"
                  className="font-display text-xl text-[var(--ink)]"
                >
                  Microphone is blocked
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--ink)]">
                  Click the lock to the left of the address bar, set Microphone
                  to Allow, then try again.
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
                  onClick={stopTalk}
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
