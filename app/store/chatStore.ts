import { create } from "zustand";
import { Conversation, Message } from "../types";

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  currentConversation: Conversation | null;
  isGenerating: boolean;
  
  initializeChat: () => void;
  createNewConversation: () => void;
  deleteConversation: (id: string) => void;
  switchConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversationId: null,
  currentConversation: null,
  isGenerating: false,

  initializeChat: () => {
    const { conversations } = get();
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

  sendMessage: async (content: string) => {
    const { currentConversationId, conversations } = get();
    if (!currentConversationId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    set((state) => {
      const updatedConversations = state.conversations.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
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
          messages: get().conversations.find((c) => c.id === currentConversationId)?.messages || [],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      };

      set((state) => {
        const updatedConversations = state.conversations.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiMessage],
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
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Samahani, kuna hitilafu. Tafadhali jaribu tena. (Sorry, there was an error. Please try again.)",
        timestamp: Date.now(),
      };
      set((state) => {
        const updatedConversations = state.conversations.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, errorMessage],
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
}));