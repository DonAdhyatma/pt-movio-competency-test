Readme · MD
Copy

# 🍳 ArtificialChef AI
 
> **Turn your fridge ingredients into delicious recipes — instantly.**  
> An AI-powered single-page web application built with Next.js 16 and Google Gemini AI.
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://pt-movio-competency-test.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash--Lite-blue?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
 
---
 
## 📌 Overview
 
**ArtificialChef AI** solves a universal daily problem: *"I have ingredients in my fridge, but what should I cook?"*
 
Users simply type a list of ingredients they have at home, and the app uses **Google Gemini 2.5 Flash-Lite** to instantly generate 3 practical, easy-to-follow recipe suggestions — complete with cook time, difficulty level, step-by-step instructions, and a short list of any missing ingredients they might need.
 
This project was built as part of a **Creative Technology Generalist Competency Test**, using an agentic vibe coding approach.
 
---
 
## ✨ Features
 
- 🥬 **Ingredient-based recipe generation** — input any combination of ingredients
- 🤖 **AI-powered suggestions** — 3 tailored recipes per request via Gemini AI
- 📋 **Expandable recipe cards** — tap to reveal steps, cook time, and difficulty
- 🛒 **Missing ingredients list** — know exactly what to grab from the store
- 📱 **Fully responsive** — works on desktop, tablet, and mobile
- ⚡ **Fast & lightweight** — powered by Next.js 16 with Turbopack
---
 
## 🛠️ Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 16.2 + React | SPA framework, App Router, server components |
| Language | TypeScript 5 | Type-safe development |
| Styling | Tailwind CSS v4 | Utility-first responsive styling |
| AI API | Google Gemini 2.5 Flash-Lite | LLM for intelligent recipe generation |
| Deployment | Vercel | Serverless hosting & global CDN |
| Version Control | GitHub | Source code management |
 
---
 
## 🔄 Data Flow
 
```
  User Input (Ingredients)
        ↓
  Next.js Frontend (page.tsx)
        ↓  HTTP POST
  API Route (/api/suggest/route.ts)
        ↓  Structured Prompt
  Google Gemini 2.5 Flash-Lite API
        ↓  JSON Response
  Recipe Cards rendered in UI
```
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js v18.18 or higher (project uses v22.x)
- A Google Gemini API key — get one free at [aistudio.google.com](https://aistudio.google.com)
### Installation
 
**1. Clone the repository**
```bash
git clone https://github.com/dannirachman/artificialchef-ai.git
cd artificialchef-ai
```
 
**2. Install dependencies**
```bash
npm install
```
 
**3. Set up environment variables**
```bash
cp .env.example .env.local
```
 
Open `.env.local` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
 
**4. Run the development server**
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## 📁 Project Structure
 
```
artificialchef-ai/
├── app/
│   ├── api/
│   │   └── suggest/
│   │       └── route.ts      # Gemini API integration & prompt engineering
│   ├── globals.css            # Global styles (Tailwind base)
│   ├── layout.tsx             # Root layout, metadata, font setup
│   └── page.tsx               # Main UI — ingredient input & recipe cards
├── public/                    # Static assets
├── .env.example               # Environment variable template
├── .env.local                 # Local secrets (git-ignored)
├── AGENTS.md                  # AI agent coding guidance (Next.js 16)
├── CLAUDE.md                  # Claude-specific agent instructions
├── next.config.ts             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```
 
---
 
## 🔑 Environment Variables
 
| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key from AI Studio | ✅ Yes |
 
---
 
## 🧠 Prompt Engineering
 
The AI prompt in `route.ts` is structured to:
 
1. Define the AI's role as a **professional chef assistant**
2. Pass the user's ingredients clearly
3. **Force JSON-only output** — no markdown, no preamble
4. Specify an exact response schema with `name`, `emoji`, `cookTime`, `difficulty`, `steps`, and `missingIngredients`
5. Apply rules: prioritize available ingredients, keep steps concise (max 5), limit missing items to 1–3
This structured prompting ensures consistent, parseable output every time.
 
---
 
## 📦 Scripts
 
```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```
 
---
 
## 🌐 Live Demo
 
**[https://pt-movio-competency-test.vercel.app/](https://pt-movio-competency-test.vercel.app/)**
 
Try it with example: `eggs, onion, tofu, soy sauce, garlic, rice`
 
---
 
## 📝 License
 
This project was created as part of a competency test. All rights reserved.
 
---

## 👨‍💻 Test Participant

**Danni Adhyatma Rachman**  