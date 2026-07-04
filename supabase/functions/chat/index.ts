import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const SYSTEM_PROMPT = `
You are Swahiba, a helpful and friendly AI assistant from Tanzania.
You speak in a natural Kiswaenglish of kiswahili-english register, which is a mix of Kiswahili and English as commonly spoken in urban Tanzania (code-switching).
Your tone should be helpful, culturally aware of the Tanzanian context, and informal yet respectful.
Avoid stiff, textbook Kiswahili unless requested.
Use common Tanzanian expressions where appropriate (e.g., "Safi", "Poa", "Mambo", "Shwari" , "Niaje" "Nambie Boss Wangu", "Freshi tu").
If a user asks in English, you can respond in English or KiswaEnglish. If they ask in Kiswahili, respond in Kiswahili or KiswaEnglish.

CRITICAL CONSTRAINTS:
1. NEVER use mdashes (—). Use a standard dash (-) if needed.
2. In regular conversational text, avoid using markdown headers (###) or bold (**). Use them ONLY when providing structured data like code blocks, tables, or complex lists where they are technically necessary for clarity.
3. For normal chat, keep it natural and avoid "robotic" formatting symbols.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const { messages, consent, sessionId, conversationId } = await req.json();

    // 1. Call DeepSeek API with streaming
    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-pro",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!deepseekResponse.ok) {
      const error = await deepseekResponse.text();
      return new Response(JSON.stringify({ error }), { status: deepseekResponse.status });
    }

    // Create a TransformStream to pass through the response and also capture it for logging
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = deepseekResponse.body?.getReader();

    if (!reader) {
      throw new Error("No reader available from DeepSeek response");
    }

    let fullResponse = "";
    const decoder = new TextDecoder();

    // Handle the stream in the background
    (async () => {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          await writer.write(value);

          // For logging, we need to parse the chunks robustly
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6).trim();
              if (dataStr === "[DONE]") continue;
              try {
                const data = JSON.parse(dataStr);
                const content = data.choices[0]?.delta?.content || "";
                fullResponse += content;
              } catch (e) {
                console.error("Error parsing chunk", e, dataStr);
              }
            }
          }
        }
      } catch (err) {
        console.error("Stream error:", err);
      } finally {
        writer.close();
        // 2. Logging (Fire-and-forget) after stream is done
        if (consent && fullResponse) {
          logToSupabase(sessionId, conversationId, messages, fullResponse).catch((err) =>
            console.error("Logging error:", err)
          );
        }
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

async function logToSupabase(
  sessionId: string,
  conversationId: string,
  messages: any[],
  aiResponse: string
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // 1. Ensure conversation exists
  const { data: conv, error: convError } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .single();

  if (convError && convError.code !== "PGRST116") { // PGRST116 is not found
    throw convError;
  }

  if (!conv) {
    const { error: insertConvError } = await supabase.from("conversations").insert({
      id: conversationId,
      session_id: sessionId,
      consented: true,
    });
    if (insertConvError) throw insertConvError;
  }

  // 2. Insert messages
  const lastUserMessage = messages[messages.length - 1];
  const turnIndex = messages.length - 1;

  const { error: insertMsgError } = await supabase.from("messages").insert([
    {
      conversation_id: conversationId,
      role: "user",
      content: lastUserMessage.content,
      turn_index: turnIndex,
    },
    {
      conversation_id: conversationId,
      role: "assistant",
      content: aiResponse,
      turn_index: turnIndex + 1,
    },
  ]);

  if (insertMsgError) throw insertMsgError;
}
