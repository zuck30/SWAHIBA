"use client";

import { Message } from "../types";
import clsx from "clsx";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={clsx("flex items-start gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser ? "bg-tz-dark text-white" : "bg-tz-accent/20 text-tz-accent"
      )}>
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Message Bubble */}
      <div className={clsx(
        "max-w-[80%]",
        isUser ? "chat-bubble-user" : "chat-bubble-ai"
      )}>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className={clsx(
          "text-xs mt-1 opacity-50",
          isUser ? "text-right" : "text-left"
        )}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}