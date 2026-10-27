export const RUNWAY_EMBED_API = "https://api.dev.runwayml.com";
export const RUNWAY_CALL_SCRIPT = "https://cdn.dev.runwayml.com/prod/widget-call.js";

export type RunwayCallHandle = { unmount: () => void };

export type RunwayCharacter = "prairie" | "moneyTree";

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

export async function requestSageMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("mic");
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
  } catch {
    throw new Error("mic");
  }
}

async function requestSageSession(
  character: RunwayCharacter = "prairie",
): Promise<RunwayLiveSession> {
  const origin = window.location.origin;
  const created = await fetch("/api/runway-embed-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, character }),
  });
  const body = (await created.json()) as Partial<RunwayLiveSession> & {
    error?: string;
    detail?: string;
  };
  if (!created.ok) {
    const err = new Error(body.error || "connect");
    err.cause = body.detail || origin;
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

export async function createLiveSageSession(
  character: RunwayCharacter = "prairie",
): Promise<RunwayLiveSession> {
  try {
    return await requestSageSession(character);
  } catch (cause) {
    if (cause instanceof Error && cause.message === "busy") {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return requestSageSession(character);
    }
    throw cause;
  }
}

export function sageCallMountNode(host: HTMLElement) {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  let frame = shadow.querySelector<HTMLElement>("[data-sage-call]");
  if (!frame) {
    const css = document.createElement("style");
    css.textContent = `
      :host { display: block; height: 100%; width: 100%; }
      [data-sage-call] { height: 100%; width: 100%; }
      [data-sage-call] video,
      [data-sage-call] canvas,
      [data-sage-call] iframe {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    `;
    frame = document.createElement("div");
    frame.setAttribute("data-sage-call", "");
    shadow.append(css, frame);
  } else {
    frame.replaceChildren();
  }
  return frame;
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
