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
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const { messages, consent, sessionId, conversationId } = await req.json();

    // 1. Call DeepSeek API
    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    const deepseekData = await deepseekResponse.json();
    const aiResponse = deepseekData.choices[0].message.content;

    // 2. Logging (Fire-and-forget)
    if (consent) {
      logToSupabase(sessionId, conversationId, messages, aiResponse).catch((err) =>
        console.error("Logging error:", err)
      );
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
