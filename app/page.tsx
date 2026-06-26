"use client";

import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import { useChatStore } from "./store/chatStore";

export default function Home() {
  const { initializeChat } = useChatStore();

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatContainer />
      </main>
    </div>
  );
}