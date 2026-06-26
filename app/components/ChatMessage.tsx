"use client";

import { useState, useEffect } from "react";
import { Message } from "../types";
import clsx from "clsx";
import Image from "next/image";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [displayedText, setDisplayedText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!message.content) {
      setDisplayedText("");
      return;
    }

    if (isUser || !isStreaming) {
      setDisplayedText(message.content);
      return;
    }

    let index = 0;
    const text = message.content;
    const speed = 15;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [message.content, isUser, isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isStreaming && !message.content) {
    return (
      <div className="flex items-center gap-3 mt-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
          <Image
            src="/assets/rubber-duck.png"
            alt="Swahiba"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex items-start gap-3 mt-6", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar area */}
      {isUser ? (
        <div className="w-8 h-8 flex-shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
          <Image
            src="/assets/rubber-duck.png"
            alt="Swahiba"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )}

      {/* Message content */}
      <div className={clsx("max-w-[85%] leading-relaxed relative group", isUser ? "" : "pr-8")}>
        <div
          className={clsx(
            "whitespace-pre-wrap break-words text-[15px]",
            isUser
              ? "px-5 py-3 bg-gray-200 text-gray-900 rounded-xl shadow-sm"
              : "py-2"
          )}
        >
          {displayedText || message.content}
          {!isUser && isStreaming && (
            <span className="ml-0.5 inline-block w-[2px] h-[16px] bg-gray-700 animate-pulse" />
          )}
        </div>

        {/* Copy button */}
        {!isUser && !isStreaming && (
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy message"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}