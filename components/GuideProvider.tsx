"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";

export type OpenGuideOptions = {
  message?: string;
  plantSlug?: string;
  plantName?: string;
};

type GuideControllerValue = {
  openGuide: (options?: OpenGuideOptions) => void;
  registerOpener: (opener: (options?: OpenGuideOptions) => void) => () => void;
};

const GuideControllerContext = createContext<GuideControllerValue | null>(null);

export function GuideProvider({ children }: { children: ReactNode }) {
  const openerRef = useRef<((options?: OpenGuideOptions) => void) | null>(null);

  const registerOpener = useCallback((opener: (options?: OpenGuideOptions) => void) => {
    openerRef.current = opener;
    return () => {
      if (openerRef.current === opener) openerRef.current = null;
    };
  }, []);

  const openGuide = useCallback((options?: OpenGuideOptions) => {
    openerRef.current?.(options);
  }, []);

  return (
    <GuideControllerContext.Provider value={{ openGuide, registerOpener }}>
      {children}
    </GuideControllerContext.Provider>
  );
}

export function useGuideController() {
  const value = useContext(GuideControllerContext);
  if (!value) {
    throw new Error("useGuideController must be used within GuideProvider");
  }
  return value;
}

export function useOptionalGuideController() {
  return useContext(GuideControllerContext);
}
