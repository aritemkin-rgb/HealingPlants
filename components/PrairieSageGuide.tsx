"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { prairieSage } from "@/lib/characters";
import { newMessageId } from "@/lib/chatBackend";
import { sageClose, sageFull } from "@/lib/media";
import type { ChatApiResponse, ChatMessage } from "@/lib/types";

export function PrairieSageGuide({
  open,
  onOpen,
  onClose,
  plantSlug,
  plantName,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  plantSlug?: string;
  plantName?: string;
}) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "starter",
      role: "assistant",
      content: prairieSage.greeting,
      createdAt: new Date().toISOString(),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, isSending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: newMessageId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/prairie-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          mode: "prairie",
          context: "healingGuide",
          plantSlug,
          plantName,
        }),
      });
      const data = (await response.json()) as ChatApiResponse;
      setMessages((current) => [...current, data.message]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: newMessageId(),
          role: "assistant",
          content:
            "Sage is quiet for a moment. The path on the page still works — this live talk comes later.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  if (!open) {
    return (
      <aside id="sage-talk" className="relative mx-auto mt-6 w-full max-w-[18rem] lg:mx-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sageFull}
          alt="Prairie Sage, guide of Healing Plants of the World"
          className="mx-auto block h-[22rem] w-auto max-w-full object-contain object-bottom lg:h-[26rem]"
        />
        <button
          type="button"
          onClick={onOpen}
          className="absolute bottom-[7%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm"
        >
          Talk with Prairie Sage
        </button>
      </aside>
    );
  }

  return (
    <aside id="sage-talk" className="relative mt-4 flex flex-col bg-white">
      <button
        type="button"
        onClick={onClose}
        className="self-start font-condensed text-[0.78rem] uppercase tracking-[0.16em] text-[var(--ink)]"
      >
        × Close chat
      </button>
      <div className="relative mt-2 h-[20rem] overflow-hidden sm:h-[24rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sageClose}
          alt="Prairie Sage"
          className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 object-cover object-top"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col border-t border-[rgba(44,36,22,0.08)]">
        <div ref={logRef} className="min-h-[7rem] max-h-48 space-y-2 overflow-y-auto px-1 py-3">
          {messages.map((message) => (
            <p
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-6 rounded-2xl bg-[var(--ink)] px-3 py-2 text-sm font-light text-white"
                  : "mr-4 text-sm font-light leading-relaxed text-[var(--ink)]"
              }
            >
              {message.content}
            </p>
          ))}
          {isSending ? (
            <p className="text-sm italic text-[var(--ink-soft)]">Prairie Sage is listening…</p>
          ) : null}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 pb-2">
          <label className="sr-only" htmlFor="prairie-sage-chat">
            Message Prairie Sage
          </label>
          <input
            ref={inputRef}
            id="prairie-sage-chat"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Prairie Sage…"
            className="min-w-0 flex-1 rounded-full border border-[rgba(44,36,22,0.14)] px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="rounded-full bg-[var(--gold)] px-3 py-2 font-condensed text-[0.68rem] uppercase tracking-[0.12em] text-[var(--soil-brown)] disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </aside>
  );
}
