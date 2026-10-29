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
  let created: Response;
  try {
    created = await fetch("/api/runway-embed-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, character }),
      signal: AbortSignal.timeout(50000),
    });
  } catch {
    throw new Error("timeout");
  }
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
  let last: unknown;
  for (let round = 0; round < 2; round += 1) {
    try {
      return await requestSageSession(character);
    } catch (cause) {
      last = cause;
      const reason = cause instanceof Error ? cause.message : "";
      if (reason === "busy" || reason === "timeout") {
        await new Promise((resolve) =>
          setTimeout(resolve, reason === "busy" ? 8000 : 2500),
        );
        continue;
      }
      throw cause;
    }
  }
  throw last;
}

const CALL_SKIN = `
  :host {
    display: block;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  [data-sage-call] {
    height: 100%;
    width: 100%;
    position: relative;
    background: #fff;
    border-radius: 1.25rem;
  }
  [data-avatar-call] {
    background: #fff !important;
    aspect-ratio: auto !important;
    height: 100% !important;
    width: 100% !important;
    max-height: 100% !important;
    border-radius: 1.25rem !important;
    --avatar-radius: 1.25rem !important;
    --avatar-bg-connecting: #fff !important;
  }
  [data-avatar-call]:before { display: none !important; }
  [data-avatar-control-bar] { display: none !important; }
  [data-avatar-user-video] { display: none !important; }
  [data-avatar-video] {
    flex: 1 1 auto !important;
    height: 100% !important;
    min-height: 100% !important;
    background: #fff !important;
  }
  [data-sage-call] video,
  [data-sage-call] canvas,
  [data-sage-call] iframe,
  [data-avatar-video] video {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
    object-position: center 18% !important;
    background: #fff !important;
    border-radius: 1.25rem !important;
  }
`;

export function sageCallMountNode(host: HTMLElement) {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  let frame = shadow.querySelector<HTMLElement>("[data-sage-call]");
  if (!frame) {
    const css = document.createElement("style");
    css.setAttribute("data-call-skin", "base");
    css.textContent = CALL_SKIN;
    frame = document.createElement("div");
    frame.setAttribute("data-sage-call", "");
    shadow.append(css, frame);
  } else {
    frame.replaceChildren();
  }
  return frame;
}

/** Runway injects its own stylesheet after mount. Put ours last so the square crop wins. */
export function restyleCallFrame(host: HTMLElement) {
  const shadow = host.shadowRoot;
  if (!shadow) return;
  let css = shadow.querySelector<HTMLStyleElement>("[data-call-skin='last']");
  if (!css) {
    css = document.createElement("style");
    css.setAttribute("data-call-skin", "last");
    shadow.append(css);
  }
  css.textContent = CALL_SKIN;
}

export async function cancelLiveSageSession(
  character: RunwayCharacter,
  sessionId: string,
) {
  if (!sessionId) return;
  try {
    await fetch("/api/runway-embed-session", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: window.location.origin,
        character,
        sessionId,
      }),
    });
  } catch {
    /* leftover calls time out on their own */
  }
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
