export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatRequest {
  messages: Message[];
  consent: boolean;
  sessionId: string;
  conversationId: string;
}

export interface ChatResponse {
  response: string;
}