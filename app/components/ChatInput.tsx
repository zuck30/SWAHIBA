"use client";

import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isGenerating } = useChatStore();

  const handleSubmit = async () => {
    if (!input.trim() || isGenerating || isComposing) return;
    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Andika ujumbe wako..."
          rows={1}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-tz-kitenge-tan/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-tz-accent/40 focus:border-transparent resize-none transition-all text-tz-dark placeholder:text-tz-earth/40 max-h-32"
          disabled={isGenerating}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!input.trim() || isGenerating}
        className={clsx(
          "kitenge-button p-3 rounded-full flex-shrink-0 transition-all",
          (!input.trim() || isGenerating) && "opacity-50 cursor-not-allowed hover:scale-100"
        )}
      >
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </div>
  );
}