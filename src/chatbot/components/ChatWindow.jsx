import React from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { ChatInput } from "./ChatInput";
import { CHATBOT_CONFIG } from "../config/chatbotConfig";

export function ChatWindow({ isOpen, messages, isTyping, showLeadForm, messagesEndRef, onClose, onSend, onQuickReply, onLeadSubmit, onLeadDismiss }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 flex flex-col overflow-hidden animate-chatSlideUp"
      style={{
        bottom: "96px",
        right: "24px",
        width: "min(400px, calc(100vw - 32px))",
        maxHeight: "min(620px, calc(100vh - 120px))",
        background: "linear-gradient(180deg, #070d1a 0%, #060b14 100%)",
        border: "1px solid rgba(37,99,235,0.2)",
        borderRadius: "24px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 flex items-center gap-3 relative"
        style={{ borderBottom: "1px solid rgba(37,99,235,0.15)", background: "rgba(10,20,40,0.8)" }}>
        
        {/* Subtle top shine */}
        <div className="absolute top-0 left-8 right-8 h-px opacity-30"
          style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />

        {/* Avatar with glow */}
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-black shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 0 20px rgba(37,99,235,0.4)"
            }}>
            {CHATBOT_CONFIG.avatar}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
            style={{ borderColor: "#070d1a" }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-[15px] leading-tight truncate"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {CHATBOT_CONFIG.agentName}
          </p>
          <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
            Online · Usually replies instantly
          </p>
        </div>

        {/* Close button */}
        <button onClick={onClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all duration-150"
          style={{ background: "rgba(255,255,255,0.05)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 min-h-0">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} onQuickReply={onQuickReply} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Lead form */}
      {showLeadForm && (
        <LeadCaptureForm onSubmit={onLeadSubmit} onDismiss={onLeadDismiss} />
      )}

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}
