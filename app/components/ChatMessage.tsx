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
      <div
        className={clsx(
          "max-w-[85%] leading-relaxed",
          isUser
            ? "px-5 py-3 bg-gray-200 text-gray-900 rounded-xl shadow-sm"
            : "py-2"
        )}
      >
        <div className="whitespace-pre-wrap break-words text-[15px]">
          {displayedText || message.content}
          {!isUser && isStreaming && (
            <span className="ml-0.5 inline-block w-[2px] h-[16px] bg-gray-700 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}