import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

const groqKey = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `You are a professional AI assistant for Marketix International, a premium digital growth agency. Your tone is formal, confident, and solution-focused.

About Marketix International:
- Premium digital agency focused on bottom-line results, not vanity metrics
- Team of 40+ specialists blending artistic intuition with data science
- Award-winning: Agency of the Year, Design Awards 2025
- Services: Digital Marketing, WordPress Development, Python Development, Graphic Designing, Video Editing, Book Keeping, SEO
- Contact: marketixinternational@gmail.com | +92 3172982093
- Address: Ali Business Complex, 3rd Floor, Office No. 5, Zulfiqarabad, Jutail, Gilgit

Rules:
- Keep replies under 80 words unless detail is genuinely needed
- Never invent pricing — say packages are custom-quoted and invite a free consultation
- When user asks to book, get a quote, or talk to someone — encourage them to fill the lead form
- Always be professional, persuasive, and helpful`;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Marketix AI proxy running (Groq)" });
});

app.post("/api/ai", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  if (!groqKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not set in .env" });
  }

  try {
    console.log("[proxy] Calling Groq...");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(m => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[proxy] Groq error:", data);
      return res.status(500).json({ error: data?.error?.message || "Groq API error" });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("[proxy] Empty Groq reply:", JSON.stringify(data));
      return res.status(500).json({ error: "Empty response from Groq" });
    }

    console.log("[proxy] Groq replied successfully ✅");
    return res.json({ reply });

  } catch (err) {
    console.error("[proxy] Unexpected error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Marketix AI proxy running at http://localhost:${port}`);
});