
# Swahiba

<p align="center">

This project presents a complete implementation of a frontend specifically designed for the mixed‑language communication style used across East Africa.

> **Please, refer to this repository, Where Model Development is taking place**  
>https://github.com/zuck30/swahili-llm-scratch

# Features

- Natural conversation supporting pure Kiswahili, pure English, and natural Kiswaenglish code-switching
- Multiple conversation management with create, switch, and delete functionality
- Real-time responses with typing indicators
- Persistent conversation history in local storage for now

# How to Run

Follow these steps to set up and run the chat application:

# 1. Install Dependencies

First, install all required npm packages:

```bash
npm install
```

# 2. Install Additional Packages

Install Heroicons for the icon set:

```bash
npm install @heroicons/react
```

# 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database schema and Edge Function setup.

# 4. Run Development Server

Start the Next.js development server:

```bash
npm run dev
```

# Backend Integration

The chat is served by a Supabase Edge Function that proxies to the DeepSeek API and logs consented conversations.

- **POST** `/api/chat` - Main chat endpoint

# Data Pipeline

Consented conversations are logged to Supabase. You can process them using the provided scripts:

1. **Clean Logs**: `npx ts-node scripts/clean_logs.ts` (Strips PII and saves to `data/cleaned_logs.json`)
2. **Export Multi-turn**: `npx ts-node scripts/export_instruct.ts` (Converts to multi-turn JSONL format for model training)

# How to Contribute

Contributions are welcome and easy to follow:

- **Code, ideas, and documentation** → submit via Pull Requests or open an Issue
- **Do NOT commit large data files or model weights** → these are too big for version control


## How Swahiba Works (Current Architecture)

Swahiba is being built in two parts, what's running today vs. what's in progress.

>Right now, live chat at [swahiba.vercel.app](https://swahiba.vercel.app)
is powered by the DeepSeek API, wrapped with prompt engineering tuned for
Tanzanian context and natural Kiswahili-English (Kiswaenglish) code-switching.
This is a deliberate **bootstrapping strategy**

- We don't yet have our own model that's ready to serve production traffic
  reliably for now as it's not perfect yet. Rather than wait, we use DeepSeek now so users get a genuinely
  useful assistant today.
- Every conversation (only with explicit user consent see the consent
  prompt in app) is logged, cleaned of personal information, and used as
  real training data.
- That data feeds into fine-tuning our own from-scratch Swahili/Kiswa-English
  model, built independently (no pretrained weights) in a separate repo:
  **[swahili-llm-scratch](https://github.com/zuck30/swahili-llm-scratch)**.
- As our own model improves, it will progressively take over more of what
  DeepSeek currently handles the goal is to reduce reliance on DeepSeek
  over time, not depend on it indefinitely.

- The model in `swahili-llm-scratch` is real
custom tokenizer, custom transformer architecture, trained from scratch, not
a wrapper around someone else's weights. It's currently a ~70M parameter
model still being instruction fine-tuned, which is why it isn't serving
Swahiba's live traffic yet. You can verify progress directly via the
training loss curves and checkpoints in that repo and on Hugging Face,
rather than taking our word for it.

If you're contributing to this repo, please keep this distinction clear in
any docs, blog posts, or announcements: Swahiba (this repo) is the product
and data pipeline. swahili-llm-scratch is the model. They are connected but
not the same thing, and conflating them causes confusion.

# License

This project is open for research, education, and non‑commercial use.

<p align="center">
    <a href="https://sheddydev.netlify.app"><img src="https://img.shields.io/badge/Blog-sheddydev.netlify.app-purple.svg"></a>
    <a href="https://sheddysilicon.netlify.app"><img src="https://img.shields.io/badge/Author-sheddysilicon.netlify.app-green.svg"></a>
    <a href="mailto:mwalyangashadrack@gmail.com"><img src="https://img.shields.io/badge/Email-mwalyangashadrack%40gmail.com-red.svg"></a>
</p>
