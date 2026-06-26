"use client";

import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChatStore } from "../store/chatStore";
import Image from "next/image";

export default function ChatContainer() {
  const { currentConversation, isGenerating } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = currentConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center p-4">
                <Image
                  src="/assets/rubber-duck.png"
                  alt="Swahiba"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>

              <h1 className="text-3xl font-semibold text-gray-900">
                Habari! Karibu Swahiba
              </h1>
              <p className="text-gray-500 text-lg">
                Tafadhali, Nawezaje Kukusaidia?
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {/* Typing Indicator*/}
          {isGenerating && (
            <div className="flex items-center gap-3 mt-6">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image
                  src="/assets/rubber-duck.png"
                  alt="Swahiba"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}