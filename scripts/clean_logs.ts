import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const PII_PATTERNS = {
  phone: /(\+?255|0)[67]\d{8}/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
};

async function cleanLogs() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing environment variables");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Pull consented conversations
  const { data: conversations, error: convError } = await supabase
    .from("conversations")
    .select("id, messages(*)")
    .eq("consented", true)
    .order("created_at", { ascending: true });

  if (convError) {
    console.error("Error fetching conversations:", convError);
    return;
  }

  const cleanedData = [];

  for (const conv of conversations) {
    const messages = (conv.messages as any[]).sort((a, b) => a.turn_index - b.turn_index);
    const cleanedMessages = messages.map((msg) => {
      let content = msg.content;
      // Strip phone numbers and emails
      content = content.replace(PII_PATTERNS.phone, "[PHONE]");
      content = content.replace(PII_PATTERNS.email, "[EMAIL]");

      return {
        ...msg,
        content,
      };
    });

    cleanedData.push({
      ...conv,
      messages: cleanedMessages,
    });
  }

  const outputPath = path.join(process.cwd(), "data", "cleaned_logs.json");
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
  console.log(`Cleaned logs written to ${outputPath}`);
}

cleanLogs();
