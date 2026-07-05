"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import LandingPage from "./components/LandingPage";
import { useChatStore } from "./store/chatStore";

export default function Home() {
  const { initializeChat } = useChatStore();
  const [isRehydrated, setIsRehydrated] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // If already rehydrated
    if (useChatStore.persist.hasHydrated()) {
      setIsRehydrated(true);
    } else {
      // Wait for Zustand persistence to rehydrate
      const unsub = useChatStore.persist.onHydrate(() => {
        setIsRehydrated(true);
      });
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (isRehydrated) {
      initializeChat();
    }
  }, [isRehydrated, initializeChat]);

  if (!isRehydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full" />
          <div className="h-4 w-32 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!showChat) {
    return <LandingPage onStartChatting={() => setShowChat(true)} />;
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden animate-in fade-in duration-500">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatContainer />
      </main>
    </div>
  );
}
