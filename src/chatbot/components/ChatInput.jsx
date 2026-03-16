import React, { useState, useRef, useEffect } from "react";

export function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = Math.min(ref.current.scrollHeight, 100) + "px";
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex-shrink-0 px-4 py-3 flex items-end gap-3"
      style={{ borderTop: "1px solid rgba(37,99,235,0.15)", background: "rgba(6,11,20,0.95)" }}>
      
      <textarea
        ref={ref}
        rows={1}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        disabled={disabled}
        placeholder="Ask me anything..."
        className="flex-1 resize-none text-[13.5px] text-slate-100 placeholder-slate-600 outline-none leading-relaxed max-h-24 bg-transparent"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />

      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: text.trim() && !disabled
            ? "linear-gradient(135deg, #1d4ed8, #2563eb)"
            : "rgba(37,99,235,0.15)",
          boxShadow: text.trim() && !disabled ? "0 4px 16px rgba(37,99,235,0.4)" : "none",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white translate-x-[1px]">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  );
}
