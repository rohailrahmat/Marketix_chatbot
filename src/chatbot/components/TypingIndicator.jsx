import React from "react";
import { CHATBOT_CONFIG } from "../config/chatbotConfig";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fadeIn">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold"
        style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", fontFamily: "'Syne', sans-serif" }}>
        {CHATBOT_CONFIG.avatar}
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: "rgba(15,28,50,0.95)", border: "1px solid rgba(37,99,235,0.2)" }}>
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay, i) => (
            <span key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ background: "#3b82f6", animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
