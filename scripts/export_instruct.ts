import fs from "fs";
import path from "path";

async function exportInstruct() {
  const inputPath = path.join(process.cwd(), "data", "cleaned_logs.json");
  const outputPath = path.join(process.cwd(), "data", "export_instruct.jsonl");

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  const cleanedData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const outputStream = fs.createWriteStream(outputPath);

  for (const conv of cleanedData) {
    const messages = conv.messages;
    const history: any[] = [];

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      if (msg.role === "assistant") {
        // We assume the message before an assistant message is the user instruction
        const userMsg = messages[i - 1];
        if (userMsg && userMsg.role === "user") {
          const exportRow = {
            instruction: userMsg.content,
            input: "",
            output: msg.content,
            history: JSON.parse(JSON.stringify(history)),
          };
          outputStream.write(JSON.stringify(exportRow) + "\n");

          // Only AFTER writing the row for this assistant turn,
          // we add the instruction/output pair to history for the NEXT assistant turn.
          history.push({
            role: "user",
            content: userMsg.content,
          });
          history.push({
            role: "assistant",
            content: msg.content,
          });
        }
      }
    }
  }

  outputStream.end();
  console.log(`Multi-turn export written to ${outputPath}`);
}

exportInstruct();
