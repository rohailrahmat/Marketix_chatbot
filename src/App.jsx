import React from "react";
import { Chatbot } from "./chatbot/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #060b14 60%)" }}>
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1d4ed8, transparent)" }} />

      <div className="text-center relative z-10 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">Now Accepting Q1 Partnerships</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", background: "linear-gradient(135deg, #fff 0%, #93c5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          MARKETIX
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide mb-2">
          Premium Digital Growth Agency
        </p>
        <p className="text-slate-600 text-sm">
          We don't just build sites — we build empires.
        </p>
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-500 text-sm animate-bounce">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-blue-400">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <span className="text-blue-400">Chat with our AI assistant →</span>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
