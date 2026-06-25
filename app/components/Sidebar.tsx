"use client";

import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { PlusIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { conversations, currentConversationId, createNewConversation, deleteConversation, switchConversation } = useChatStore();

  return (
    <div
      className={clsx(
        "bg-tz-earth/95 backdrop-blur-sm text-tz-cream transition-all duration-300 flex flex-col border-r border-tz-kitenge-tan/20",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-tz-kitenge-tan/20">
        <div className="flex items-center justify-between">
          <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
            <span className="text-2xl font-bold text-tz-accent">S</span>
            {!isCollapsed && <span className="font-bold text-lg">Swahiba</span>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-tz-cream/60 hover:text-tz-cream transition-colors"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={createNewConversation}
          className="w-full kitenge-button flex items-center justify-center gap-2 text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          {!isCollapsed && "New Chat"}
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={clsx(
              "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
              currentConversationId === conv.id
                ? "bg-tz-accent/20 border border-tz-accent/30"
                : "hover:bg-tz-cream/10"
            )}
            onClick={() => switchConversation(conv.id)}
          >
            <div className="flex-1 min-w-0">
              <p className={clsx(
                "text-sm truncate",
                currentConversationId === conv.id ? "text-tz-accent" : "text-tz-cream/80"
              )}>
                {conv.title || "New Chat"}
              </p>
              {!isCollapsed && conv.messages.length > 0 && (
                <p className="text-xs text-tz-cream/40 truncate">
                  {conv.messages[conv.messages.length - 1].content.substring(0, 40)}
                </p>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-tz-cream/40 hover:text-red-400 transition-all"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-tz-kitenge-tan/20">
        <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-tz-accent/20 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-tz-accent" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Guest</p>
              <p className="text-xs text-tz-cream/40">Free Plan</p>

            {/*Guest and Free Plan are now displayed hardcoded, We will update this later when we allow user authentication*/}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}