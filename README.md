# 🧠 LocalMind AI

> A private, local AI assistant dashboard powered by Ollama — your own ChatGPT that runs entirely on your Mac.

## ✨ Features

- 💬 Chat with local AI models (Qwen, DeepSeek, Gemma)
- 🔒 100% private — nothing leaves your Mac
- ⚡ Quick prompt buttons (business ideas, summarize, code, email)
- 🔄 Model switcher — swap AI models on the fly
- 🌙 Dark mode UI

## 🚀 Getting Started

### 1. Install Ollama
Install Ollama via brew install ollama, then run ollama pull qwen3:1.7b and ollama serve

### 2. Clone and Run
git clone https://github.com/KippieG/localmind-ai.git
cd localmind-ai
npm install
npm run dev

### 3. Open browser
http://localhost:3000

## 🛠 Tech Stack

- Next.js 16 + TypeScript + Tailwind CSS
- Ollama local LLM server
- Models: Qwen3, DeepSeek-R1, Gemma

## 📌 Roadmap

- Chat history
- Memory system
- Agent mode
- File upload and summarize
- Electron desktop app

## 👤 Author

Built by @KippieG
