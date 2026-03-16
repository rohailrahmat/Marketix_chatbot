import React from "react";
import { CHATBOT_CONFIG } from "../config/chatbotConfig";

export function ChatMessage({ message, onQuickReply }) {
  const isBot = message.role === "assistant";

  return (
    <div className={`flex items-end gap-2.5 animate-fadeIn ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      {/* Bot avatar */}
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shadow-lg"
          style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", fontFamily: "'Syne', sans-serif" }}>
          {CHATBOT_CONFIG.avatar}
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[80%] ${isBot ? "items-start" : "items-end"}`}>
        {/* Bubble */}
        <div
          className={`px-4 py-3 text-[13.5px] leading-relaxed rounded-2xl shadow-sm ${
            isBot
              ? "text-slate-100 rounded-bl-sm"
              : "text-white rounded-br-sm"
          }`}
          style={isBot
            ? { background: "rgba(15,28,50,0.95)", border: "1px solid rgba(37,99,235,0.2)" }
            : { background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }
          }
          dangerouslySetInnerHTML={{ __html: message.html }}
        />

        {/* Quick reply chips */}
        {isBot && message.showQuickReplies && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {CHATBOT_CONFIG.quickReplies.map((qr) => (
              <button
                key={qr.label}
                onClick={() => onQuickReply(qr.prompt)}
                className="text-[11.5px] px-3 py-1.5 rounded-xl font-medium transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.3)",
                  color: "#93c5fd",
                  fontFamily: "'DM Sans', sans-serif"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "rgba(37,99,235,0.25)";
                  e.target.style.borderColor = "rgba(37,99,235,0.6)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "rgba(37,99,235,0.1)";
                  e.target.style.borderColor = "rgba(37,99,235,0.3)";
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-600 px-1">
          {message.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
