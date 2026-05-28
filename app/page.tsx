"use client";
import { useState, useRef, useEffect } from "react";
const MODELS = ["qwen3:1.7b", "deepseek-r1", "gemma"];
const QUICK_PROMPTS = [
  { label: "💡 Business ideeën", prompt: "Geef me 5 creatieve business ideeën voor AI automation in 2025." },
  { label: "📝 Samenvatten", prompt: "Vat de volgende tekst samen in 3 bullet points: " },
  { label: "💻 Code schrijven", prompt: "Schrijf een Python script dat " },
  { label: "📧 Email opstellen", prompt: "Schrijf een professionele email over " },
];
export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(MODELS[0]);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  async function sendMessage(text?: string) {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: msg }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, model }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Ollama niet bereikbaar. Draait ollama serve?" }]);
    }
    setLoading(false);
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">🧠 LocalMind AI</h1>
          <p className="text-xs text-gray-400">Lokale AI — privacy first</p>
        </div>
        <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg border border-gray-700">
          {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="flex gap-2 p-3 border-b border-gray-800 flex-wrap">
        {QUICK_PROMPTS.map((q) => (
          <button key={q.label} onClick={() => sendMessage(q.prompt)} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full border border-gray-700 transition">
            {q.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-4xl mb-3">🧠</p>
            <p className="text-lg font-medium">LocalMind AI</p>
            <p className="text-sm">Stel een vraag of klik een quick prompt.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-800 text-gray-100 rounded-bl-sm"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-2 rounded-2xl text-sm text-gray-400 animate-pulse">AI denkt na...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Stel een vraag..." className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 text-sm" />
          <button onClick={() => sendMessage()} disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-medium transition">
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
