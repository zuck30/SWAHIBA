import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/app/types";

{/*
    Mock for now, We  will connect to FastAPI later
    */}
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages } = body;

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    // TODO: We will Replace with actual FastAPI call
    // For now, return a mock response
    const mockResponses = [
      "Habari! Ninakuelewa vizuri. (Hello! I understand you well.)",
      "Hilo ni swali zuri. Hebu nifikirie... (That's a good question. Let me think...)",
      "Asante kwa kuuliza. Naona unazungumza Kiswahili vizuri! (Thanks for asking. I see you speak Swahili well!)",
      "Hilo ni jambo muhimu sana. (That's an important matter.)",
      "Sawa, naelewa. Hili ndio jibu langu... (Okay, I understand. Here's my answer...)",
    ];

    // Will Simulate AI response based on message length or content
    const responseText = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json<ChatResponse>({
      response: responseText,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}