import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Conversation, Message } from "../types";
import { getConsent, getSessionId, setConsent as setConsentInStorage } from "../lib/consent";

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  currentConversation: Conversation | null;
  isGenerating: boolean;
  consented: boolean | null;
  showChat: boolean;
  
  initializeChat: () => void;
  setShowChat: (show: boolean) => void;
  setConsent: (consented: boolean) => void;
  createNewConversation: () => void;
  deleteConversation: (id: string) => void;
  switchConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      currentConversation: null,
      isGenerating: false,
      consented: typeof window !== "undefined" ? getConsent() : null,
      showChat: false,

      initializeChat: () => {
        const { conversations, currentConversationId } = get();

        // Handle consent re-sync
        const persistedConsent = getConsent();
        set({ consented: persistedConsent });

        if (conversations.length === 0) {
          const newConversation: Conversation = {
            id: crypto.randomUUID(),
            title: "New Chat",
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          set({
            conversations: [newConversation],
            currentConversationId: newConversation.id,
            currentConversation: newConversation,
          });
        } else if (currentConversationId) {
          const conversation = conversations.find(c => c.id === currentConversationId) || conversations[0];
          set({
            currentConversationId: conversation.id,
            currentConversation: conversation,
          });
        }
      },

      createNewConversation: () => {
        const newConversation: Conversation = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id,
          currentConversation: newConversation,
        }));
      },

      deleteConversation: (id: string) => {
        set((state) => {
          const filtered = state.conversations.filter((conv) => conv.id !== id);
          const newCurrentId = filtered.length > 0 ? filtered[0].id : null;
          const newCurrent = newCurrentId ? filtered.find(c => c.id === newCurrentId) : null;
          return {
            conversations: filtered,
            currentConversationId: newCurrentId,
            currentConversation: newCurrent,
          };
        });
      },

      switchConversation: (id: string) => {
        const conversation = get().conversations.find(c => c.id === id) || null;
        set({
          currentConversationId: id,
          currentConversation: conversation
        });
      },

      setShowChat: (show: boolean) => {
        set({ showChat: show });
      },

      setConsent: (consented: boolean) => {
        setConsentInStorage(consented);
        set({ consented });
      },

      sendMessage: async (content: string) => {
        const { currentConversationId } = get();
        if (!currentConversationId) return;

        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: "user",
          content,
          timestamp: Date.now(),
        };

        const aiMessageId = crypto.randomUUID();
        const aiMessage: Message = {
          id: aiMessageId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        set((state) => {
          const updatedConversations = state.conversations.map((conv) =>
            conv.id === currentConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, userMessage, aiMessage],
                  title: conv.messages.length === 0 ? content.slice(0, 30) : conv.title,
                  updatedAt: Date.now(),
                }
              : conv
          );

          const updatedCurrent = updatedConversations.find(c => c.id === currentConversationId) || null;

          return {
            conversations: updatedConversations,
            currentConversation: updatedCurrent,
            isGenerating: true,
          };
        });

        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: get().conversations.find((c) => c.id === currentConversationId)?.messages.slice(0, -1) || [], // exclude the empty ai message
              consent: get().consented || false,
              sessionId: getSessionId(),
              conversationId: currentConversationId,
            }),
          });

          if (!response.ok) throw new Error("Failed to get response");

          const reader = response.body?.getReader();
          if (!reader) throw new Error("No reader");

          const decoder = new TextDecoder();
          let accumulatedContent = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // Keep the last incomplete line in the buffer

            for (const line of lines) {
              if (line.trim() === "") continue;
              if (line.startsWith("data: ")) {
                const dataStr = line.slice(6).trim();
                if (dataStr === "[DONE]") continue;
                try {
                  const data = JSON.parse(dataStr);
                  const contentChunk = data.choices[0]?.delta?.content || "";
                  accumulatedContent += contentChunk;

                  // Update store with progress
                  set((state) => {
                    const updatedConversations = state.conversations.map((conv) =>
                      conv.id === currentConversationId
                        ? {
                            ...conv,
                            messages: conv.messages.map((msg) =>
                              msg.id === aiMessageId ? { ...msg, content: accumulatedContent } : msg
                            ),
                          }
                        : conv
                    );
                    const updatedCurrent = updatedConversations.find(c => c.id === currentConversationId) || null;
                    return {
                      conversations: updatedConversations,
                      currentConversation: updatedCurrent,
                    };
                  });
                } catch (e) {
                  console.error("Error parsing JSON from stream:", e, dataStr);
                }
              }
            }
          }

          set({ isGenerating: false });
        } catch (error) {
          console.error("Error sending message:", error);
          const errorText = "Samahani, kuna hitilafu. Tafadhali jaribu tena. (Sorry, there was an error. Please try again.)";

          set((state) => {
            const updatedConversations = state.conversations.map((conv) =>
              conv.id === currentConversationId
                ? {
                    ...conv,
                    messages: conv.messages.map((msg) =>
                      msg.id === aiMessageId ? { ...msg, content: errorText } : msg
                    ),
                    updatedAt: Date.now(),
                  }
                : conv
            );

            const updatedCurrent = updatedConversations.find(c => c.id === currentConversationId) || null;

            return {
              conversations: updatedConversations,
              currentConversation: updatedCurrent,
              isGenerating: false,
            };
          });
        }
      },
    }),
    {
      name: "swahiba-chat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        currentConversationId: state.currentConversationId,
        consented: state.consented,
        showChat: state.showChat,
      }),
    }
  )
);
