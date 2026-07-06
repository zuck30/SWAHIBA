"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useChatStore } from "../store/chatStore";
import {
  PencilSquareIcon,
  TrashIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); 
  const [isInitialized, setIsInitialized] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const { conversations, currentConversationId, createNewConversation, deleteConversation, switchConversation, setShowChat } = useChatStore();

  // Check if we're on mobile - runs once on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Set initial state based on device
      if (!isInitialized) {
        setIsOpen(!mobile); // Open on desktop, closed on mobile
        setIsInitialized(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isInitialized]);

  // Handle click outside for mobile
  useEffect(() => {
    if (isMobile === null) return; // Don't run until we know device
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (target.closest('button[aria-label*="sidebar"]')) return;
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  // Handle resize - auto-open on desktop, auto-close on mobile
  useEffect(() => {
    if (isMobile === null) return;
    
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        // Device type changed
        if (mobile) {
          setIsOpen(false); // Close on mobile
        } else {
          setIsOpen(true); // Open on desktop
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Don't render anything until we know if it's mobile or not
  if (isMobile === null) {
    return null; // Or a loading skeleton
  }

  const hasEmptyConversation = conversations.some(
    (conv) => conv.messages.length === 0
  );

  const handleNewChat = () => {
    if (!hasEmptyConversation) {
      createNewConversation();
      setShowChat(true);
      if (pathname !== "/") {
        router.push("/");
      }
      if (isMobile) setIsOpen(false);
    }
  };

  const handleSwitchConversation = (id: string) => {
    switchConversation(id);
    setShowChat(true);
    if (pathname !== "/") {
      router.push("/");
    }
    if (isMobile) setIsOpen(false);
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) =>
    conv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.messages.some((msg) =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {/* Mobile Toggle Button only show on mobile when sidebar is closed */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Open sidebar"
        >
          <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Mobile backdrop overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className={clsx(
          "fixed lg:relative flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50",
          isOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"
        )}
        style={{
          top: 0,
          bottom: 0,
          height: '100dvh',
          maxHeight: '100dvh',
        }}
      >
        {/* Header: Logo + Toggle */}
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className={clsx("flex items-center gap-3", !isOpen && "lg:justify-center lg:w-full")}>
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 flex-shrink-0">
                <Image
                  src="/assets/rubber-duck.png"
                  alt="Swahiba"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              {isOpen && <span className="font-semibold text-gray-900 text-lg">Swahiba</span>}
            </div>

            {/* Desktop & Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? (
                <ArrowLeftStartOnRectangleIcon className="w-7 h-7" />
              ) : (
                <ArrowRightEndOnRectangleIcon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Top Actions: Search + New Chat */}
        <div className="p-3 space-y-2 flex-shrink-0">
          {/* Search Input when open, Icon when closed */}
          {isOpen ? (
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                autoFocus={isSearchOpen}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(true);
                setIsSearchOpen(true);
                setTimeout(() => {
                  const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (searchInput) searchInput.focus();
                }, 300);
              }}
              className="w-full flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
              title="Search conversations"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
            </button>
          )}

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition-colors",
              !isOpen && "lg:justify-center",
              hasEmptyConversation && "opacity-50 cursor-not-allowed hover:bg-gray-900"
            )}
            title={!isOpen ? "New chat" : hasEmptyConversation ? "Empty chat already exists" : "New chat"}
            disabled={hasEmptyConversation}
          >
            <PencilSquareIcon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">New chat</span>}
          </button>
        </div>

        {/* Conversations List — Scrollable */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5 min-h-0">
          {filteredConversations.length === 0 && searchQuery ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={clsx(
                  "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
                  currentConversationId === conv.id
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "hover:bg-gray-50 text-gray-700"
                )}
                onClick={() => handleSwitchConversation(conv.id)}
                title={!isOpen ? conv.title || "New Chat" : ""}
              >
                {/* Only show icon when sidebar is closed */}
                {!isOpen && (
                  <div className="w-5 h-5 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-600">💬</span>
                    </div>
                  </div>
                )}

                {/* Show full content when sidebar is open */}
                {isOpen && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">
                        {conv.title || "New Chat"}
                      </p>
                      {conv.messages.length > 0 && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {conv.messages[conv.messages.length - 1].content.substring(0, 40)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all flex-shrink-0"
                      title="Delete chat"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer at bottom */}
        <div className="p-3 border-t border-gray-100 space-y-2 flex-shrink-0">
          {/* Settings */}
          <Link
            href="/settings"
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/settings" ? "bg-gray-100 text-gray-900 font-medium" : "hover:bg-gray-100 text-gray-700",
              !isOpen && "lg:justify-center"
            )}
            title={!isOpen ? "Settings" : "Settings"}
          >
            <Cog6ToothIcon className={clsx("w-5 h-5 flex-shrink-0", pathname === "/settings" ? "text-gray-900" : "text-gray-600")} />
            {isOpen && <span className="text-sm">Settings</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={() => setShowChat(false)}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700",
              !isOpen && "lg:justify-center"
            )}
            title={!isOpen ? "Log out" : "Log out"}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {isOpen && <span className="text-sm">Log out</span>}
          </button>
        </div>
      </div>
    </>
  );
}