"use client";

import clsx from "clsx";
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
    <div className="swahiba-input flex items-end gap-2 px-4 py-2.5">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="Message Swahiba..."
        rows={1}
        className="flex-1 bg-transparent outline-none resize-none text-gray-900 placeholder:text-gray-400 text-base min-h-[42px] max-h-32"
        disabled={isGenerating}
      />
      <button
        onClick={handleSubmit}
        disabled={!input.trim() || isGenerating}
        className={clsx(
          "p-2 rounded-full transition-all flex-shrink-0",
          input.trim() && !isGenerating
            ? "bg-gray-900 text-white hover:bg-black hover:scale-105 active:scale-95"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </div>
  );
}