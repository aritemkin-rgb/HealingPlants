"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { useGuideController } from "@/components/GuideProvider";
import {
  collapsedLabelFor,
  moneyTreeQuickActions,
  plantProfileQuickActions,
  prairieQuickActions,
} from "@/lib/characters";
import { newMessageId } from "@/lib/chatBackend";
import type {
  ChatApiResponse,
  ChatMessage,
  ChatMode,
  ChatSuggestion,
  GuideContext,
  QuickAction,
} from "@/lib/types";

export type GuideBubbleProps = {
  characterName: string;
  characterRole: string;
  characterImage?: string;
  starterMessage: string;
  mode: ChatMode;
  context: GuideContext;
  initialOpen?: boolean;
  collapsedLabel?: string;
  plantSlug?: string;
  plantName?: string;
  description?: string;
  appearAfterScroll?: boolean;
  placement?: "right" | "left";
};

function endpointFor(mode: ChatMode) {
  return mode === "moneyTree" ? "/api/money-tree-chat" : "/api/prairie-chat";
}

export function GuideBubble({
  characterName,
  characterRole,
  characterImage,
  starterMessage,
  mode,
  context,
  initialOpen = false,
  collapsedLabel,
  plantSlug,
  plantName,
  description,
  appearAfterScroll = false,
  placement = "right",
}: GuideBubbleProps) {
  const router = useRouter();
  const { registerOpener } = useGuideController();
  const [open, setOpen] = useState(initialOpen);
  const [forcedVisible, setForcedVisible] = useState(initialOpen);
  const [revealedByScroll, setRevealedByScroll] = useState(!appearAfterScroll);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "starter",
      role: "assistant",
      content: starterMessage,
      createdAt: new Date().toISOString(),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef(messages);
  const sendingRef = useRef(isSending);
  messagesRef.current = messages;
  sendingRef.current = isSending;

  const label = collapsedLabel ?? collapsedLabelFor(context, mode);
  const visible = forcedVisible || revealedByScroll || open;

  const quickActions = useMemo(() => {
    if (mode === "moneyTree") return moneyTreeQuickActions;
    if (context === "plantProfile" && plantName) {
      return plantProfileQuickActions(plantName);
    }
    return prairieQuickActions;
  }, [context, mode, plantName]);

  useEffect(() => {
    if (!appearAfterScroll) return;

    const sentinel = document.querySelector("[data-guide-sentinel]");
    if (!sentinel) {
      const onScroll = () => {
        if (window.scrollY > 420) setRevealedByScroll(true);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setRevealedByScroll(true);
        if (entry.isIntersecting && !open && !forcedVisible) {
          setRevealedByScroll(false);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [appearAfterScroll, forcedVisible, open]);

  useEffect(() => {
    return registerOpener((options) => {
      setForcedVisible(true);
      setRevealedByScroll(true);
      setOpen(true);
      if (options?.message) {
        void sendText(options.message, {
          plantSlug: options.plantSlug ?? plantSlug,
          plantName: options.plantName ?? plantName,
        });
      }
    });
    // sendText is stable enough via refs; we re-bind when plant context changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantName, plantSlug, registerOpener]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  async function sendText(
    text: string,
    contextOverride?: { plantSlug?: string; plantName?: string },
  ) {
    const trimmed = text.trim();
    if (!trimmed || sendingRef.current) return;

    const userMessage: ChatMessage = {
      id: newMessageId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const nextMessages = [...messagesRef.current, userMessage];
    messagesRef.current = nextMessages;
    sendingRef.current = true;
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setSuggestions(undefined);

    try {
      const response = await fetch(endpointFor(mode), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          mode,
          context,
          plantSlug: contextOverride?.plantSlug ?? plantSlug,
          plantName: contextOverride?.plantName ?? plantName,
        }),
      });
      const data = (await response.json()) as ChatApiResponse;
      setMessages((current) => {
        const next = [...current, data.message];
        messagesRef.current = next;
        return next;
      });
      setSuggestions(data.suggestions);
    } catch {
      setMessages((current) => {
        const next: ChatMessage[] = [
          ...current,
          {
            id: newMessageId(),
            role: "assistant",
            content:
              "The helper is quiet for a moment. Keep using the pages — the site does not need this panel to work.",
            createdAt: new Date().toISOString(),
          },
        ];
        messagesRef.current = next;
        return next;
      });
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }

  function handleQuickAction(action: QuickAction) {
    if (action.href) router.push(action.href);
    void sendText(action.prompt);
  }

  function handleSuggestion(suggestion: ChatSuggestion) {
    if (suggestion.href) router.push(suggestion.href);
    if (suggestion.prompt) void sendText(suggestion.prompt);
  }

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:inset-x-auto sm:bottom-5 sm:p-0 ${
        placement === "left"
          ? "sm:left-5 sm:justify-start"
          : "sm:right-5 sm:justify-end"
      }`}
    >
      <div className="pointer-events-auto">
        {open ? (
          <ChatPanel
            characterName={characterName}
            characterRole={characterRole}
            characterImage={characterImage}
            description={
              description ??
              (mode === "moneyTree"
                ? "Marketplace guide. Optional."
                : "Site guide. Optional.")
            }
            messages={messages}
            isSending={isSending}
            input={input}
            onInputChange={setInput}
            onSend={() => void sendText(input)}
            onClose={() => setOpen(false)}
            quickActions={quickActions}
            suggestions={suggestions}
            onQuickAction={handleQuickAction}
            onSuggestion={handleSuggestion}
            inputRef={inputRef}
            closeRef={closeRef}
          />
        ) : (
          <button
            ref={bubbleRef}
            type="button"
            className="guide-bubble-pulse flex max-w-[min(20rem,calc(100vw-1.5rem))] items-center gap-2 rounded-full border border-[rgba(197,165,114,0.5)] bg-[var(--soil)] py-1.5 pr-4 pl-1.5 text-left text-[var(--parchment)] shadow-[0_12px_30px_rgba(16,12,8,0.28)] hover:border-[var(--root-gold)]"
            aria-label={label}
            aria-expanded={false}
            onClick={() => setOpen(true)}
          >
            <CharacterAvatar name={characterName} image={characterImage} size="sm" />
            <span className="min-w-0">
              <span className="block truncate font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[var(--root-gold)]">
                {characterName}
              </span>
              <span className="block truncate text-sm leading-tight">{label}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
