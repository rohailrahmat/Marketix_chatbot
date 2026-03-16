import React, { useState } from "react";
import { CHATBOT_CONFIG } from "../config/chatbotConfig";

export function LeadCaptureForm({ onSubmit, onDismiss }) {
  const [form, setForm] = useState({ name: "", email: "", service: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  };

  const inputStyle = {
    background: "rgba(6,11,20,0.8)",
    border: "1px solid rgba(37,99,235,0.25)",
    borderRadius: "10px",
    padding: "8px 12px",
    fontSize: "13px",
    color: "#e2e8f0",
    width: "100%",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.15s",
  };

  return (
    <div className="flex-shrink-0 animate-slideUp"
      style={{ borderTop: "1px solid rgba(37,99,235,0.2)", background: "rgba(8,14,28,0.98)", padding: "16px" }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-white font-semibold text-[13px]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Book a Free Consultation
          </p>
          <p className="text-slate-500 text-[11px] mt-0.5">We'll get back to you within 24 hours</p>
        </div>
        <button onClick={onDismiss}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input style={inputStyle} placeholder="Your name *" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.7)"}
              onBlur={e => e.target.style.borderColor = "rgba(37,99,235,0.25)"}
            />
            {errors.name && <p className="text-red-400 text-[10px] mt-0.5 pl-1">{errors.name}</p>}
          </div>
          <div>
            <input style={inputStyle} placeholder="Email *" type="email" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.7)"}
              onBlur={e => e.target.style.borderColor = "rgba(37,99,235,0.25)"}
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-0.5 pl-1">{errors.email}</p>}
          </div>
        </div>

        <select style={{ ...inputStyle, cursor: "pointer" }} value={form.service}
          onChange={e => setForm({...form, service: e.target.value})}
          onFocus={e => e.target.style.borderColor = "rgba(37,99,235,0.7)"}
          onBlur={e => e.target.style.borderColor = "rgba(37,99,235,0.25)"}>
          <option value="">Select a service</option>
          {CHATBOT_CONFIG.services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <button type="submit"
          className="w-full py-2.5 rounded-xl text-white font-semibold text-[13px] transition-all duration-200 active:scale-[0.98] mt-1"
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
            boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
            fontFamily: "'Syne', sans-serif",
          }}>
          Book Free Consultation →
        </button>
      </form>
    </div>
  );
}
