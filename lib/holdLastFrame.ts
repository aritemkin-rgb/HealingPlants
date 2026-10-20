export const INTRO_STORAGE_KEY = "hpw-loading";
export const INTRO_DONE_EVENT = "hpw-intro-done";

export function markIntroDone() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

export function introAlreadyDone() {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Pause just before `ended` so the clip never flashes a blank last GOP. */
export function attachHoldLastFrame(
  video: HTMLVideoElement,
  padSeconds = 0.28,
) {
  let frozen = false;
  let armed = false;
  let raf = 0;

  const freezeTime = () => {
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return null;
    return Math.max(0, duration - padSeconds);
  };

  const stopWatch = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const freezeNow = () => {
    if (frozen) return;
    const at = freezeTime();
    if (at == null) return;
    frozen = true;
    stopWatch();
    video.pause();
    try {
      if (video.currentTime > at + 0.02) {
        video.currentTime = at;
      }
    } catch {
      /* ignore */
    }
  };

  const tick = () => {
    if (!armed || frozen) return;
    const at = freezeTime();
    if (at != null && (video.ended || video.currentTime >= at)) {
      freezeNow();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const startWatch = () => {
    if (!armed || frozen) return;
    stopWatch();
    raf = requestAnimationFrame(tick);
  };

  const onPlay = () => startWatch();
  const onEnded = () => {
    if (armed) freezeNow();
  };
  const onTimeUpdate = () => {
    if (!armed || frozen) return;
    const at = freezeTime();
    if (at != null && video.currentTime >= at) freezeNow();
  };

  video.loop = false;
  video.addEventListener("play", onPlay);
  video.addEventListener("playing", onPlay);
  video.addEventListener("ended", onEnded);
  video.addEventListener("timeupdate", onTimeUpdate);
  video.addEventListener("pause", stopWatch);

  return {
    arm() {
      frozen = false;
      armed = true;
      if (!video.paused) startWatch();
    },
    disarm() {
      armed = false;
      frozen = false;
      stopWatch();
    },
    detach() {
      armed = false;
      stopWatch();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("pause", stopWatch);
    },
  };
}
