"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, RefObject } from "react";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { SafetyNote } from "@/components/SafetyNote";
import type { ChatMessage, ChatSuggestion, QuickAction } from "@/lib/types";

export function ChatPanel({
  characterName,
  characterRole,
  characterImage,
  description,
  messages,
  isSending,
  input,
  onInputChange,
  onSend,
  onClose,
  quickActions,
  suggestions,
  onQuickAction,
  onSuggestion,
  inputRef,
  closeRef,
}: {
  characterName: string;
  characterRole: string;
  characterImage?: string;
  description: string;
  messages: ChatMessage[];
  isSending: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  quickActions: QuickAction[];
  suggestions?: ChatSuggestion[];
  onQuickAction: (action: QuickAction) => void;
  onSuggestion: (suggestion: ChatSuggestion) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSend();
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    }
  }

  return (
    <div
      className="guide-panel flex h-[min(34rem,calc(100dvh-6rem))] w-[min(24.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.6rem] border border-[rgba(197,165,114,0.35)] bg-[var(--panel)] text-[var(--ink)] shadow-[0_24px_60px_rgba(16,12,8,0.28)]"
      role="dialog"
      aria-labelledby="guide-panel-title"
      onKeyDown={handleKey}
    >
      <header className="flex items-start gap-3 border-b border-[rgba(44,36,22,0.08)] px-4 pb-3 pt-4">
        <CharacterAvatar name={characterName} image={characterImage} size="md" />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[var(--moss)]">
            {characterRole}
          </p>
          <h2 id="guide-panel-title" className="font-display text-2xl leading-tight">
            {characterName}
          </h2>
          <p className="mt-1 text-sm leading-snug text-[var(--ink-soft)]">{description}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full border border-[rgba(44,36,22,0.12)] px-2.5 py-1 font-sans text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)] hover:border-[var(--root-gold)] hover:text-[var(--ink)]"
        >
          Close
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-8 rounded-2xl rounded-br-sm bg-[var(--soil)] px-3 py-2 text-sm leading-relaxed text-[var(--parchment)]"
                : "mr-4 whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-[rgba(107,127,98,0.12)] px-3 py-2 text-sm leading-relaxed"
            }
          >
            {message.content}
          </div>
        ))}
        {isSending ? (
          <p className="mr-4 text-sm italic text-[var(--ink-soft)]">Listening…</p>
        ) : null}
        {suggestions && suggestions.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.map((suggestion) =>
              suggestion.href && !suggestion.prompt ? (
                <Link
                  key={suggestion.label}
                  href={suggestion.href}
                  className="rounded-full border border-[rgba(44,36,22,0.14)] px-2.5 py-1 font-sans text-xs tracking-wide hover:border-[var(--moss)]"
                >
                  {suggestion.label}
                </Link>
              ) : (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => onSuggestion(suggestion)}
                  className="rounded-full border border-[rgba(44,36,22,0.14)] px-2.5 py-1 font-sans text-xs tracking-wide hover:border-[var(--moss)]"
                >
                  {suggestion.label}
                </button>
              ),
            )}
          </div>
        ) : null}
      </div>

      <div className="border-t border-[rgba(44,36,22,0.08)] px-3 py-2">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => onQuickAction(action)}
              className="shrink-0 rounded-full bg-[rgba(197,165,114,0.18)] px-2.5 py-1 font-sans text-xs tracking-wide text-[var(--soil)] hover:bg-[rgba(197,165,114,0.32)]"
            >
              {action.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label className="sr-only" htmlFor="guide-chat-input">
            Message {characterName}
          </label>
          <input
            ref={inputRef}
            id="guide-chat-input"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="Ask, or keep browsing the site…"
            className="min-w-0 flex-1 rounded-full border border-[rgba(44,36,22,0.14)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--moss)]"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="rounded-full bg-[var(--soil)] px-3 py-2 font-sans text-xs uppercase tracking-[0.16em] text-[var(--root-gold)] disabled:opacity-40"
          >
            Send
          </button>
        </form>
        <div className="px-1 pt-2">
          <SafetyNote compact />
        </div>
      </div>
    </div>
  );
}
