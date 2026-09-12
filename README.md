# ReadyRole

An AI-powered mock interview platform that helps job seekers practice real interviews through natural voice conversations — powered by an AI interviewer (PrepPilot) — and get instant, structured feedback on their performance.

🔗 **Live demo:** [interview-agent-22ug5iy31-ucois-projects.vercel.app](https://interview-agent-22ug5iy31-ucois-projects.vercel.app/)

## Features

- 🔐 **Authentication** — secure sign-up/sign-in with Firebase Auth, session cookies, and protected routes
- 🎙️ **Voice-based AI interviews** — real-time conversational interviews powered by [Vapi](https://vapi.ai), with natural speech-to-text and text-to-speech
- 🤖 **AI-generated interview questions** — tailored to role, seniority level, tech stack, and interview type (technical, behavioral, or mixed) using Google Gemini
- 📊 **Automated feedback & scoring** — after each interview, the AI analyzes the full transcript and scores the candidate across five categories (Communication, Technical Knowledge, Problem-Solving, Cultural Fit, Confidence & Clarity), plus strengths, areas for improvement, and a final written assessment
- 📁 **Persistent interview history** — all interviews and feedback are saved to Firestore, so users can revisit past sessions or retake interviews
- 🎨 **Polished, responsive UI** — built with Tailwind CSS and shadcn/ui, dark-themed design system

## Tech Stack

**Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
**Backend:** Next.js Server Actions & API Routes, Firebase Admin SDK
**Auth & Database:** Firebase Authentication, Firestore
**AI:** Google Gemini (via Vercel AI SDK) for question generation and feedback scoring
**Voice AI:** Vapi (voice agent orchestration, speech-to-text, text-to-speech)
**Validation:** Zod, React Hook Form

## How It Works

1. **Sign up / sign in** — Firebase-backed auth with protected routes
2. **Generate an interview** — a voice conversation with an AI assistant gathers your target role, experience level, tech stack, and interview focus, then generates a custom set of interview questions via Gemini
3. **Take the interview** — a second AI voice agent conducts the actual interview, asking the generated questions and engaging naturally based on your responses
4. **Get feedback** — once the interview ends, the full transcript is analyzed by Gemini and scored across five key categories, with a detailed breakdown, strengths, and areas to improve
5. **Track your progress** — all past interviews and feedback are saved and viewable from your dashboard

## Getting Started

```bash
git clone https://github.com/ucoi/Interview_Agent.git
cd Interview_Agent
npm install
```

Create a `.env.local` file with the following variables:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=


Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## What I Learned

Building this project deepened my understanding of:
- Structuring a full-stack Next.js app with the App Router, Server Components, and Server Actions
- Integrating third-party AI voice infrastructure (Vapi) with a custom backend
- Prompt engineering for structured, schema-validated AI outputs (Zod + Gemini)
- Firebase Authentication and Firestore data modeling in a real production-style app
- Debugging real-world issues across the stack — deployment errors, module bundling, async data races, and client/server component boundaries in Next.js
