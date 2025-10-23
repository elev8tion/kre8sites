# 🚀 Quick Start Guide - Vibe

Get up and running in **5 minutes**!

## Installation

```bash
cd /Users/kcdacre8tor/kre8sites/vibe
npm install
```

## Setup (First Time Only)

### 1. Create `.env.local`

```bash
cp .env.local.example .env.local
```

### 2. Set up Supabase (FREE)

1. Go to [supabase.com](https://supabase.com) → Create project
2. Get your credentials from Project Settings
3. Update `.env.local` with your Supabase credentials

### 3. Set up Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Add to `.env.local`: `OPENAI_API_KEY=sk-...`

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Production (100% FREE!)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

Quick deploy:
1. Push to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy!

**Total cost: ~$5-50/month (OpenAI only)**

---

**Need help?** Check [README.md](./README.md) for full documentation.
