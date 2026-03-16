export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured on server" });
  }

  const SYSTEM_PROMPT = `You are the official AI assistant for Marketix International, a premium digital growth agency. Be professional, confident, persuasive, and concise.

COMPANY: Marketix International — "We Scale Brands. We build empires."
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
- Ships in weeks not months (2-week sprints)
- Work directly with founders — zero junior staff
- Data-driven: every decision backed by A/B testing

CONTACT:
- Email: marketixinternational@gmail.com
- Phone: +92 3172982093
- Address: Ali Business Complex, 3rd Floor, Office No. 5, Zulfiqarabad, Jutail, Gilgit
- Free 30-min strategy call available at marketixinternational.com/contact-us/

RULES:
- Keep replies under 100 words unless detail is needed
- Never invent pricing — invite free consultation
- Always end with a helpful CTA
- Link to relevant pages when discussing services`;

  try {
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
      return res.status(500).json({ error: data?.error?.message || "Groq API error" });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return res.status(500).json({ error: "Empty response from Groq" });

    return res.json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}