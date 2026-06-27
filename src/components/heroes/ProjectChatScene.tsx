"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export interface ChatMessage {
  sender: string;
  message: string;
  align: "left" | "right";
  avatarInitials: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface ChatBrand {
  name: string;
  logoSrc: string;
  logoAlt: string;
  contextLabel: string;
}

export interface ChatReply {
  sender: string;
  message: string;
  avatarSrc: string;
  avatarAlt: string;
}

export interface ProjectChatSceneProps {
  ariaLabel: string;
  brand: ChatBrand;
  messages: ChatMessage[];
  reply: ChatReply;
  placeholderText: string;
  draftText?: string;
  followUpMessages?: ChatMessage[];
  className?: string;
}

const TYPE_START_DELAY_MS = 4300;
const FINAL_TYPE_DELAY_MS = 900;
const SEND_DELAY_MS = 900;
const TYPE_SPEED_MS = 58;
const DELETE_SPEED_MS = 38;
const DRAFT_HOLD_MS = 1100;
const FIRST_MESSAGE_DELAY_MS = 700;
const MESSAGE_GAP_DELAY_MS = 1550;
const FOLLOW_UP_TYPING_START_DELAY_MS = 450;
const MIN_TYPING_INDICATOR_MS = 650;
const MAX_TYPING_INDICATOR_MS = 3800;
const TYPING_INDICATOR_CHAR_MS = 28;
const EMPTY_CHAT_MESSAGES: ChatMessage[] = [];

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getTypingIndicatorDuration(message: string): number {
  return clamp(
    message.length * TYPING_INDICATOR_CHAR_MS,
    MIN_TYPING_INDICATOR_MS,
    MAX_TYPING_INDICATOR_MS,
  );
}

function buildTypingFrames(draftText: string, finalText: string): string[] {
  const draftFrames = Array.from({ length: draftText.length }, (_, index) =>
    draftText.slice(0, index + 1),
  );
  const deleteFrames = Array.from({ length: draftText.length }, (_, index) =>
    draftText.slice(0, draftText.length - index - 1),
  );
  const finalFrames = Array.from({ length: finalText.length }, (_, index) =>
    finalText.slice(0, index + 1),
  );

  return [...draftFrames, ...deleteFrames, ...finalFrames];
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });
}

function Avatar({ item }: { item: ChatMessage }) {
  return (
    <div
      className={cn(
        "relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full text-xs font-semibold",
        item.align === "right"
          ? "bg-cyan-400 text-zinc-950"
          : "bg-zinc-800 text-zinc-200",
      )}
    >
      {item.avatarSrc ? (
        <img
          src={item.avatarSrc}
          alt={item.avatarAlt ?? `${item.sender} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{item.avatarInitials}</span>
      )}
    </div>
  );
}

function ChatBubble({ item, delay }: { item: ChatMessage; delay: number }) {
  return (
    <motion.div
      className={cn(
        "flex max-w-[92%] items-end gap-2 md:max-w-[76%]",
        item.align === "right"
          ? "ml-auto flex-row-reverse"
          : "mr-auto flex-row",
      )}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
    >
      <Avatar item={item} />
      <figure
        className={cn(
          "rounded-2xl border px-4 py-3",
          item.align === "right"
            ? "rounded-br-sm border-cyan-300/40 bg-cyan-300/15"
            : "rounded-bl-sm border-zinc-800 bg-zinc-900/70",
        )}
      >
        <figcaption className="mb-1.5 text-[0.68rem] font-medium uppercase tracking-[0.13em] text-zinc-500">
          {item.sender}
        </figcaption>
        <blockquote className="text-sm leading-relaxed text-zinc-100">
          {item.message}
        </blockquote>
      </figure>
    </motion.div>
  );
}

function TypingIndicator({ item }: { item: ChatMessage }) {
  return (
    <motion.div
      className={cn(
        "flex max-w-[92%] items-end gap-2 md:max-w-[76%]",
        item.align === "right"
          ? "ml-auto flex-row-reverse"
          : "mr-auto flex-row",
      )}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      aria-label={`${item.sender} is typing`}
    >
      <Avatar item={item} />
      <div
        className={cn(
          "flex items-center gap-1 rounded-2xl border px-4 py-3",
          item.align === "right"
            ? "rounded-br-sm border-cyan-300/40 bg-cyan-300/15"
            : "rounded-bl-sm border-zinc-800 bg-zinc-900/70",
        )}
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectChatScene({
  ariaLabel,
  brand,
  messages,
  reply,
  draftText,
  placeholderText,
  followUpMessages = EMPTY_CHAT_MESSAGES,
  className,
}: ProjectChatSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const [composerText, setComposerText] = useState("");
  const [hasSentReply, setHasSentReply] = useState(false);
  const [visibleMessageCount, setVisibleMessageCount] = useState(0);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(
    null,
  );
  const [visibleFollowUpMessageCount, setVisibleFollowUpMessageCount] =
    useState(0);
  const [typingFollowUpMessageIndex, setTypingFollowUpMessageIndex] = useState<
    number | null
  >(null);
  const [areProfileImagesReady, setAreProfileImagesReady] = useState(false);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const draftMessage = draftText ?? "";
  const messageCount = messages.length;
  const followUpMessageCount = followUpMessages.length;
  const profileImageSourcesKey = useMemo(
    () =>
      Array.from(
        new Set(
          [
            brand.logoSrc,
            reply.avatarSrc,
            ...messages.map((message) => message.avatarSrc),
            ...followUpMessages.map((message) => message.avatarSrc),
          ].filter((src): src is string => Boolean(src)),
        ),
      ).join("\n"),
    [brand.logoSrc, followUpMessages, messages, reply.avatarSrc],
  );
  const transcriptScrollKey = [
    hasSentReply,
    typingFollowUpMessageIndex,
    typingMessageIndex,
    visibleFollowUpMessageCount,
    visibleMessageCount,
  ].join(":");

  useEffect(() => {
    let isCancelled = false;
    const profileImageSources = profileImageSourcesKey
      .split("\n")
      .filter(Boolean);

    setAreProfileImagesReady(false);

    if (profileImageSources.length === 0) {
      setAreProfileImagesReady(true);
      return;
    }

    Promise.all(profileImageSources.map(preloadImage)).then(() => {
      if (!isCancelled) {
        setAreProfileImagesReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [profileImageSourcesKey]);

  useEffect(() => {
    setComposerText("");
    setHasSentReply(false);
    setVisibleMessageCount(0);
    setTypingMessageIndex(null);
    setVisibleFollowUpMessageCount(0);
    setTypingFollowUpMessageIndex(null);

    if (!isInView || !areProfileImagesReady) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const frames = buildTypingFrames(draftMessage, reply.message);
    const draftFramesCount = draftMessage.length;
    const deleteFramesCount = draftMessage.length;

    let elapsedMs = FIRST_MESSAGE_DELAY_MS;

    for (let index = 0; index < messageCount; index += 1) {
      const typingDurationMs = getTypingIndicatorDuration(
        messages[index].message,
      );

      timeouts.push(
        setTimeout(() => {
          setTypingMessageIndex(index);
        }, elapsedMs),
      );

      timeouts.push(
        setTimeout(() => {
          setTypingMessageIndex(null);
          setVisibleMessageCount(index + 1);
        }, elapsedMs + typingDurationMs),
      );

      elapsedMs += typingDurationMs + MESSAGE_GAP_DELAY_MS;
    }

    elapsedMs = Math.max(elapsedMs, TYPE_START_DELAY_MS);

    frames.forEach((frame, index) => {
      const isDeleting =
        index >= draftFramesCount &&
        index < draftFramesCount + deleteFramesCount;
      const isFinalTyping = index >= draftFramesCount + deleteFramesCount;

      if (draftFramesCount > 0 && index === draftFramesCount) {
        elapsedMs += DRAFT_HOLD_MS;
      }

      if (
        draftFramesCount > 0 &&
        index === draftFramesCount + deleteFramesCount
      ) {
        elapsedMs += FINAL_TYPE_DELAY_MS;
      }

      timeouts.push(
        setTimeout(() => {
          setComposerText(frame);
        }, elapsedMs),
      );

      elapsedMs +=
        isFinalTyping || !isDeleting ? TYPE_SPEED_MS : DELETE_SPEED_MS;
    });

    timeouts.push(
      setTimeout(() => {
        setComposerText("");
        setHasSentReply(true);
      }, elapsedMs + SEND_DELAY_MS),
    );

    const replySentAtMs = elapsedMs + SEND_DELAY_MS;
    let followUpElapsedMs = replySentAtMs + FOLLOW_UP_TYPING_START_DELAY_MS;

    for (let index = 0; index < followUpMessageCount; index += 1) {
      const typingDurationMs = getTypingIndicatorDuration(
        followUpMessages[index].message,
      );

      timeouts.push(
        setTimeout(() => {
          setTypingFollowUpMessageIndex(index);
        }, followUpElapsedMs),
      );

      timeouts.push(
        setTimeout(() => {
          setTypingFollowUpMessageIndex(null);
          setVisibleFollowUpMessageCount(index + 1);
        }, followUpElapsedMs + typingDurationMs),
      );

      followUpElapsedMs += typingDurationMs + MESSAGE_GAP_DELAY_MS;
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [
    draftMessage,
    areProfileImagesReady,
    followUpMessageCount,
    followUpMessages,
    isInView,
    messageCount,
    messages,
    reply.message,
  ]);

  useEffect(() => {
    const messagesViewport = messagesViewportRef.current;

    if (!messagesViewport || transcriptScrollKey.length === 0) return;

    messagesViewport.scrollTop = messagesViewport.scrollHeight;
  }, [transcriptScrollKey]);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={cn(
        "w-full bg-zinc-950 px-4 py-20 text-left text-zinc-100",
        className,
      )}
    >
      <style>
        {`
          @keyframes project-chat-blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}
      </style>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/25">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-zinc-100">
              <img
                src={brand.logoSrc}
                alt={brand.logoAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">
                {brand.name}
              </p>
              <p className="text-xs text-zinc-500">{brand.contextLabel}</p>
            </div>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-4 w-4 rounded-full bg-rose-400" />
            <span className="h-4 w-4 rounded-full bg-amber-300" />
            <span className="h-4 w-4 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div ref={messagesViewportRef} className="h-[28rem] overflow-y-auto">
          <div className="flex min-h-full flex-col justify-end gap-3 p-4 md:p-5">
            {messages.slice(0, visibleMessageCount).map((item) => (
              <ChatBubble
                key={`${item.sender}-${item.message}`}
                item={item}
                delay={0}
              />
            ))}

            {typingMessageIndex !== null && messages[typingMessageIndex] && (
              <TypingIndicator item={messages[typingMessageIndex]} />
            )}

            {hasSentReply && (
              <motion.div
                className="ml-auto flex max-w-[92%] flex-row-reverse items-end gap-2 md:max-w-[76%]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-cyan-400">
                  <img
                    src={reply.avatarSrc}
                    alt={reply.avatarAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figure className="rounded-2xl rounded-br-sm border border-cyan-300/40 bg-cyan-300/15 px-4 py-3">
                  <figcaption className="mb-1.5 text-[0.68rem] font-medium uppercase tracking-[0.13em] text-cyan-300">
                    {reply.sender}
                  </figcaption>
                  <blockquote className="text-sm font-medium leading-relaxed text-zinc-100">
                    {reply.message}
                  </blockquote>
                </figure>
              </motion.div>
            )}

            {typingFollowUpMessageIndex !== null &&
              followUpMessages[typingFollowUpMessageIndex] && (
                <TypingIndicator
                  item={followUpMessages[typingFollowUpMessageIndex]}
                />
              )}

            {followUpMessages
              .slice(0, visibleFollowUpMessageCount)
              .map((item) => (
                <ChatBubble
                  key={`${item.sender}-${item.message}`}
                  item={item}
                  delay={0}
                />
              ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 bg-zinc-900 p-3">
          <div className="max-h-[7.5rem] min-h-[3rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3">
            <p
              className={cn(
                "max-w-full whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-100",
                composerText === "" && "text-zinc-500",
              )}
            >
              {composerText === "" && (
                <span
                  aria-hidden="true"
                  className="text-cyan-300"
                  style={{
                    animation: "project-chat-blink 1.1s step-end infinite",
                  }}
                >
                  |
                </span>
              )}
              {composerText || placeholderText}
              {composerText !== "" && (
                <span
                  aria-hidden="true"
                  className="ml-1 text-cyan-300"
                  style={{
                    animation: "project-chat-blink 1.1s step-end infinite",
                  }}
                >
                  |
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
