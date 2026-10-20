export const RUNWAY_EMBED_API = "https://api.dev.runwayml.com";
export const RUNWAY_CALL_SCRIPT = "https://cdn.dev.runwayml.com/prod/widget-call.js";

export type RunwayCallHandle = { unmount: () => void };

export type RunwayLiveSession = {
  sessionId: string;
  avatarId: string;
  sessionKey: string;
};

declare global {
  interface Window {
    __runwayEmbedCallUI?: {
      mountCallUI: (
        el: HTMLElement,
        opts: Record<string, unknown>,
      ) => RunwayCallHandle;
    };
  }
}

export async function createLiveSageSession(): Promise<RunwayLiveSession> {
  const origin = window.location.origin;
  const created = await fetch("/api/runway-embed-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin }),
  });
  const body = (await created.json()) as Partial<RunwayLiveSession> & {
    error?: string;
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

export async function loadRunwayCallUI() {
  if (window.__runwayEmbedCallUI?.mountCallUI) {
    return window.__runwayEmbedCallUI.mountCallUI;
  }

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${RUNWAY_CALL_SCRIPT}"]`);
    if (existing) {
      if (window.__runwayEmbedCallUI?.mountCallUI) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script")));
      return;
    }
    const script = document.createElement("script");
    script.src = RUNWAY_CALL_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script"));
    document.head.appendChild(script);
  });

  const mount = window.__runwayEmbedCallUI?.mountCallUI;
  if (!mount) throw new Error("script");
  return mount;
}
