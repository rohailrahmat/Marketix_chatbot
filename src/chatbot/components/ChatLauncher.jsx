import React, { useEffect, useState } from "react";

export function ChatLauncher({ isOpen, onClick }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting bubble */}
      {!isOpen && pulse && (
        <div className="animate-fadeIn bg-white text-slate-800 text-[13px] font-medium px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl max-w-[200px] text-right leading-snug">
          👋 Hi! How can we help you today?
          <div className="absolute bottom-0 right-3 translate-y-full w-0 h-0" />
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={onClick}
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-95 group"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #1e3a5f, #1d4ed8)"
            : "linear-gradient(135deg, #1d4ed8, #2563eb)",
          boxShadow: isOpen
            ? "0 4px 20px rgba(29,78,216,0.3)"
            : "0 8px 32px rgba(37,99,235,0.5), 0 0 0 0 rgba(37,99,235,0.4)",
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Ping ring when idle */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }} />
        )}

        <span className="transition-transform duration-300 group-hover:scale-110">
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
