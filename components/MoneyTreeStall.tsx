"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { moneyTree } from "@/lib/characters";
import { newMessageId } from "@/lib/chatBackend";
import { moneyTreeFull } from "@/lib/media";
import type { ChatApiResponse, ChatMessage } from "@/lib/types";

export function MoneyTreeStall({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "starter",
      role: "assistant",
      content: moneyTree.greeting,
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
      const response = await fetch("/api/money-tree-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          mode: "moneyTree",
          context: "marketplace",
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
            "The stall is quiet for a moment. Browse the cards — this chat is a later live bot.",
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
      <aside className="relative mx-auto w-full max-w-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={moneyTreeFull}
          alt="Money Tree, keeper of the stall"
          className="mx-auto block h-[min(24rem,62vh)] w-auto max-w-full object-contain object-bottom"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--gold)] px-5 py-2.5 font-condensed text-[0.72rem] uppercase tracking-[0.14em] text-[var(--soil-brown)] shadow-sm"
        >
          Talk with Money Tree
        </button>
      </aside>
    );
  }

  return (
    <aside className="relative flex h-full flex-col bg-white">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute top-0 right-0 z-10 font-condensed text-[0.78rem] uppercase tracking-[0.16em] text-[var(--ink)]"
      >
        × Close chat
      </button>
      <div className="relative mt-8 h-[20rem] overflow-hidden sm:h-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={moneyTreeFull}
          alt="Money Tree"
          className="absolute left-1/2 top-[-4%] h-[220%] w-auto max-w-none -translate-x-1/2"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col border-t border-[rgba(44,36,22,0.08)]">
        <div ref={logRef} className="min-h-[8rem] flex-1 space-y-2 overflow-y-auto px-1 py-3">
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
            <p className="text-sm italic text-[var(--ink-soft)]">Money Tree is thinking…</p>
          ) : null}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 pb-2">
          <label className="sr-only" htmlFor="money-tree-chat">
            Message Money Tree
          </label>
          <input
            ref={inputRef}
            id="money-tree-chat"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask the stall…"
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
