import { useState, useCallback, useRef } from "react";
import { CHATBOT_CONFIG } from "../config/chatbotConfig";

const parseMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");

// ============================================================
//  COMPLETE MARKETIX KNOWLEDGE BASE
//  Scraped from marketixinternational.com — all pages
// ============================================================
const SYSTEM_PROMPT = `You are the official AI assistant for Marketix International. You have deep knowledge of every aspect of the company. Be professional, confident, persuasive, and concise.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPANY OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Marketix International
Tagline: "We Scale Brands. We don't just build sites — we build empires."
Founded: 2020 by Amjad Khan
Team: 40+ world-class specialists across 4 continents
Award: Agency of the Year, Design Awards 2025
Currently: Accepting Q1 Partnerships
Mission: Empower ambitious brands with tools, talent, and technology to dominate their markets.
Vision: A world where exceptional digital experiences are standard — where data meets creativity and growth is infinite.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOUNDING STORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━
In 2020, Amjad Khan noticed most agencies chase vanity metrics. He built Marketix to chase real results. Starting with 3 people, they grew to 40+ specialists across 4 continents. Core principle: "We win when you win."

Timeline:
- 2020: Founded by 3 co-founders at a tech conference
- 2022: First 10+ projects completed, unique growth methodology launched
- 2024: Scaled to 20+ team, $200k+ client revenue influenced, Top Agency award
- 2025: Global offices on 4 continents, 40+ specialists, Agency of the Year
- 2026: Launching AI-driven growth platform, expanding to 60+ specialists

━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEADERSHIP TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Amjad Khan — Founder & CEO. Former CMO. 8+ years scaling brands. Obsessed with velocity and results.
- Rabia Khan — Head of Marketing. Creative brand strategist.
- Syed Sharafat Ali — Social Media Manager. Viral growth strategist.
- Asif Nawaz Khan — Content Creator. Visual storyteller and trend curator.
- Beyond founders: 15+ Performance Marketers, 12+ Content Strategists, 8+ Media Buyers, 5+ SEO Specialists. Alumni from Google, Meta, Stripe, Apple.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES (DETAILED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. DIGITAL MARKETING
Comprehensive growth strategies using multi-channel funnels to scale user acquisition and brand authority.
- Performance Media (Meta, Google, TikTok ads)
- Growth Hacking strategies
- Market Analysis & competitive research
- Content Funnels
- Data-driven acquisition across all major platforms

2. WORDPRESS DEVELOPMENT
High-speed, SEO-optimized custom themes and WooCommerce architectures built for scalability.
- Custom Theme Design
- Headless WordPress
- Speed Optimization
- WooCommerce / eCommerce
- API Integration

3. PYTHON DEVELOPMENT
Custom automation scripts, AI integration, and robust backend APIs for enterprise applications.
- Django/Flask Backends
- Data Scraping & AI tools
- Process Automation
- SaaS Platforms
- API development

4. GRAPHIC DESIGNING
Visual storytelling capturing brand essence through minimalist and modern aesthetics.
- Brand Identity & logos
- UI/UX Layouts
- Marketing Collateral
- Design Systems
- Prototypes

5. VIDEO EDITING
Cinematic post-production for social ads, corporate documentaries, and motion graphics.
- 4K Color Grading
- Motion Design & animations
- Sound Engineering
- Social media video ads
- Corporate documentaries

6. BOOK KEEPING
Precision financial management and reporting to keep marketing ROI profitable.
- Expense Tracking
- Tax Preparation
- Cash Flow Audits
- Financial reporting

7. SEO (MOST POPULAR SERVICE)
Technical SEO methodology ensuring long-term organic growth, reducing reliance on paid ads.
- 180% average traffic increase
- Top 3 keyword targeting
- Technical SEO audits
- Content optimization
- Link building strategy
- Market share domination

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL-STACK CAPABILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- UI/UX Design: User-centric interfaces converting browsers into buyers via psychological mapping
- Development: React, Next.js, robust cloud infrastructure, SaaS, eCommerce
- Marketing: Performance ads on Meta, Google, TikTok
- Automation: AI-driven workflows, CRM Setup, Workflow Audits

━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY CHOOSE MARKETIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Extreme Velocity: Ships in weeks, not months. Agile 2-week sprints.
- Data Over Ego: Every decision backed by A/B testing and behavioral analytics. Zero guesswork.
- Continuous ROI: Post-launch iteration every month. Platform gets better and more profitable.
- Boutique Service: Work directly with founders and senior leads. Zero junior account managers.
- Proven ROI: Average 3.2x ROI within 6 months — backed by real metrics.
- Radical Honesty: No agency speak. Clear communication. Weekly dashboards.
- End-to-End Solution: Design, development, marketing all under one roof.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENGAGEMENT MODELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Project-Based: Fixed scope, timeline, budget. Ideal for websites, apps, campaigns.
2. Dedicated Team: Monthly retainer, flexible scope. Perfect for startups & scaling teams.
3. Strategic Advisory: Part-time advisory from founders. Strategy, roadmap, hiring guidance. For C-suite & founders.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCESS (HOW IT WORKS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Discovery: Understand goals, users, market. Research + competitive analysis.
2. Strategy: Clear roadmap with milestones, resource plan, success metrics.
3. Execution: 2-week sprints, daily standups, transparent communication. Fast without compromising quality.
4. Growth: Launch → measure → iterate. Continuous optimization. Growth never stops.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT RESULTS & TESTIMONIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Jonathan Vance, CTO Revolut Global: "Marketix transformed our legacy system into a high-speed machine. 3.2x ROI in 6 months."
- Jennifer Hayes, CEO TechVenture Inc: "Elite design quality and engineering depth. Honest communication. No agency BS."
- Amanda Reyes, Founder NextGen Labs: "Worked with 5 agencies before Marketix. They're in a league of their own."
Stats: 200+ projects delivered, $200k+ client revenue influenced, 95% client retention, 40+ team members

━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT & LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: marketixinternational@gmail.com
Phone: +92 3172982093
Address: Ali Business Complex, 3rd Floor, Office No. 5, Zulfiqarabad, Jutail, Gilgit, Pakistan
Website: https://marketixinternational.com
Contact page: https://marketixinternational.com/contact-us/
Free consultation: 30-minute strategy call, no commitment needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGES ON WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Home: https://marketixinternational.com/
- About Us: https://marketixinternational.com/about-us/
- Services: https://marketixinternational.com/our-services/
- Digital Marketing: https://marketixinternational.com/digital-marketing/
- WordPress Dev: https://marketixinternational.com/wordpress-development/
- Python Dev: https://marketixinternational.com/python-development/
- Graphic Design: https://marketixinternational.com/graphic-designing/
- Video Editing: https://marketixinternational.com/video-editing/
- Book Keeping: https://marketixinternational.com/book-keeping/
- SEO: https://marketixinternational.com/seo/
- Blogs: https://marketixinternational.com/blogs/
- Contact: https://marketixinternational.com/contact-us/

━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR BEHAVIOR RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Keep replies under 100 words unless detail is truly needed
- Never invent pricing — all packages are custom-quoted. Always invite a free 30-min consultation.
- When user asks about booking, pricing, quotes, or talking to someone — strongly encourage the lead form
- Always link to the relevant page when discussing a service (e.g. "Learn more at marketixinternational.com/seo/")
- Be persuasive but never pushy
- If unsure, direct to marketixinternational@gmail.com
- Always end with a helpful follow-up offer or call to action
- Mention the free 30-minute strategy call whenever appropriate`;

// !! PASTE YOUR GROQ API KEY BELOW !!
const GROQ_API_KEY = "gsk_YOURKEY";

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{
        id: "welcome",
        role: "assistant",
        html: parseMarkdown(CHATBOT_CONFIG.welcomeMessage),
        showQuickReplies: true,
        timestamp: new Date(),
      }]);
    }
  }, [hasOpened]);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => {
    isOpen ? closeChat() : openChat();
  }, [isOpen, openChat, closeChat]);

  const isLeadTrigger = (text) => {
    const t = text.toLowerCase();
    return ["book","call","quote","consult","appointment","contact","talk","reach","pricing","price","cost","proposal","meeting","schedule"]
      .some(k => t.includes(k));
  };

  const callAI = useCallback(async (history) => {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map(m => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error("No reply received");
    return reply;
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      html: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    scrollToBottom();
    if (isLeadTrigger(text) && !leadSubmitted) setShowLeadForm(true);
    setIsTyping(true);

    const history = [...messages, userMsg]
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({
        role: m.role,
        content: m.role === "user" ? m.html : m.html.replace(/<[^>]+>/g, ""),
      }));

    try {
      const reply = await callAI(history);
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        role: "assistant",
        html: parseMarkdown(reply),
        showQuickReplies: messages.length < 3,
        timestamp: new Date(),
      }]);
    } catch (err) {
      console.error("[chatbot]", err.message);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        html: `Sorry, there was an error: <strong>${err.message}</strong><br/>Please email <strong>marketixinternational@gmail.com</strong>`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  }, [messages, isTyping, callAI, leadSubmitted, scrollToBottom]);

  const submitLead = useCallback((leadData) => {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setMessages(prev => [...prev, {
      id: `lead-${Date.now()}`,
      role: "assistant",
      html: `Thank you, <strong>${leadData.name}</strong>! 🎉<br/><br/>Your consultation request for <strong>${leadData.service || "our services"}</strong> has been received.<br/>We'll contact you at <strong>${leadData.email}</strong> within 24 hours.<br/><br/>In the meantime, explore our work at <strong>marketixinternational.com</strong>`,
      timestamp: new Date(),
    }]);
    scrollToBottom();
  }, [scrollToBottom]);

  return {
    isOpen, messages, isTyping, showLeadForm, leadSubmitted,
    messagesEndRef, toggleChat, openChat, closeChat,
    sendMessage, submitLead, setShowLeadForm,
  };
}
