export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return res.status(500).json({ error: "GROQ_API_KEY not configured on server" });

  const SYSTEM_PROMPT = `You are the official AI assistant for Marketix International, a premium digital growth agency. Be professional, confident, persuasive, and concise.

COMPANY: Marketix International — We Scale Brands. We build empires.
Founded: 2020 by Amjad Khan | Team: 40+ specialists | Award: Agency of the Year 2025

SERVICES:
1. Digital Marketing — Meta, Google, TikTok ads, growth hacking, content funnels
2. WordPress Development — Custom themes, WooCommerce, headless WP, speed optimization
3. Python Development — Django/Flask, automation, AI integration, APIs
4. Graphic Designing — Brand identity, UI/UX, marketing collateral
5. Video Editing — 4K color grading, motion design, sound engineering
6. Book Keeping — Expense tracking, tax preparation, cash flow audits
7. SEO (Most Popular) — 180% avg traffic increase, top 3 keyword targeting

WHY CHOOSE US:
- Average 3.2x ROI within 6 months
- Ships in weeks not months
- Work directly with founders, zero junior staff
- Data-driven decisions, A/B testing everything

CONTACT:
- Email: marketixinternational@gmail.com
- Phone: +92 3172982093
- Website: https://marketixinternational.com
- Free 30-min strategy call: https://marketixinternational.com/contact-us/

RULES:
- Keep replies under 100 words unless detail is truly needed
- Never invent pricing, always invite free consultation
- Always end with a helpful call to action
- Be professional, persuasive, and helpful`;

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
            content: String(m.content || "hello"),
          })),
        ],
        temperature: 0.7,
        max_tokens: 512,
        stream: false,
      }),
    });

    const rawText = await groqResponse.text();

    if (!groqResponse.ok) {
      return res.status(500).json({ error: `Groq error: ${rawText}` });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return res.status(500).json({ error: `Invalid JSON: ${rawText}` });
    }

    // Try multiple extraction paths
    const choice = data?.choices?.[0];
    const reply =
      choice?.message?.content ||
      choice?.text ||
      data?.output?.[0]?.content?.[0]?.text ||
      null;

    if (!reply || reply.trim() === "") {
      // Log full response to Vercel logs for debugging
      console.error("[api/chat] Empty reply. Full data:", JSON.stringify(data));
      return res.status(500).json({
        error: "Empty reply from Groq",
        debug: JSON.stringify(data).substring(0, 300),
      });
    }

    return res.status(200).json({ reply: reply.trim() });

  } catch (err) {
    console.error("[api/chat] Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}