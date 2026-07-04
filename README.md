
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


# License

This project is open for research, education, and non‑commercial use.

<p align="center">
    <a href="https://sheddydev.netlify.app"><img src="https://img.shields.io/badge/Blog-sheddydev.netlify.app-purple.svg"></a>
    <a href="https://sheddysilicon.netlify.app"><img src="https://img.shields.io/badge/Author-sheddysilicon.netlify.app-green.svg"></a>
    <a href="mailto:mwalyangashadrack@gmail.com"><img src="https://img.shields.io/badge/Email-mwalyangashadrack%40gmail.com-red.svg"></a>
</p>
