"use client";

import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChatStore } from "../store/chatStore";

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
    <div className="flex-1 flex flex-col min-h-0">
      {/* Kitenge Border Top */}
      <div className="kitenge-border-top flex-shrink-0" />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-tz-cream/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-tz-accent/20 to-tz-kitenge-gold/20 flex items-center justify-center">
                  <span className="text-4xl">💬</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-tz-accent rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✨</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-tz-dark">
                  Habari yako? 👋
                </h1>
                <p className="text-tz-earth/60 text-lg">
                  Nawezaje Kukusaidia Leo?
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center pt-4">
                {["Hadithi za sungura", "Elimu", "Kazi", "Maisha", "Chakula"].map((label) => (
                  <button
                    key={label}
                    className="px-4 py-2 rounded-full border border-tz-kitenge-tan/30 bg-white/60 hover:bg-white hover:border-tz-accent/50 transition-all hover:shadow-md text-tz-earth text-sm"
                    onClick={() => {
                      // Quick action
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          
          {isGenerating && (
            <div className="flex items-start gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-tz-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🤖</span>
              </div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-tz-accent/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-tz-accent/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-tz-accent/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Kitenge Border Bottom */}
      <div className="kitenge-border-bottom flex-shrink-0" />

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 bg-tz-cream/80 backdrop-blur-sm border-t border-tz-kitenge-tan/20">
        <div className="max-w-4xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}