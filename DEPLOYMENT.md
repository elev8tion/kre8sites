# Deployment Guide - Vibe AI Website Builder

## 🚀 Quick Deployment (100% FREE)

This guide will help you deploy Vibe with **$0/month** infrastructure costs!

## Prerequisites

- ✅ GitHub account
- ✅ Supabase account (free)
- ✅ Netlify account (free)
- ✅ OpenAI API key (paid)

## Step 1: Set Up Supabase (FREE)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Click "New Project"
5. Fill in:
   - Name: `vibe-production`
   - Database Password: (save this!)
   - Region: Choose closest to your users
6. Click "Create new project"

### 1.2 Get Connection Details

1. Go to Project Settings → Database
2. Copy the Connection String (replace `[YOUR-PASSWORD]` with your database password)
3. Save as `DATABASE_URL`

### 1.3 Get API Keys

1. Go to Project Settings → API
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 1.4 Set Up Database Schema

```bash
# From your local project
npx prisma db push
```

This creates all tables in your Supabase database.

### 1.5 Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create new bucket"
3. Name: `generated-websites`
4. Public bucket: **Yes**
5. Click "Create bucket"

## Step 2: Deploy Edge Function (FREE)

### 2.1 Install Supabase CLI

```bash
npm install -g supabase
```

### 2.2 Login to Supabase

```bash
supabase login
```

### 2.3 Link Your Project

```bash
supabase link --project-ref <your-project-ref>
```

Find your project ref in Project Settings → General → Reference ID

### 2.4 Deploy Edge Function

```bash
supabase functions deploy generate-website
```

### 2.5 Set Environment Variables for Edge Function

```bash
supabase secrets set OPENAI_API_KEY=sk-your-openai-key
```

### 2.6 Test Edge Function

```bash
supabase functions invoke generate-website \
  --body '{"prompt":"Build a simple todo app","userId":"test-user"}'
```

## Step 3: Deploy to Netlify (FREE)

### 3.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Vibe AI Website Builder"
git branch -M main
git remote add origin https://github.com/yourusername/vibe.git
git push -u origin main
```

### 3.2 Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify
5. Select your `vibe` repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - Click "Show advanced"
   - Add environment variables (see below)

### 3.3 Environment Variables

Add these in Netlify:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Supabase connection string | `postgresql://postgres:...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGc...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | Storage bucket name | `generated-websites` |

### 3.4 Deploy!

Click "Deploy site"

Netlify will:
1. Build your Next.js app
2. Deploy to CDN
3. Give you a FREE `yoursite.netlify.app` domain

## Step 4: Configure Custom Domain (Optional)

1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

## Step 5: Test Your Deployment

1. Visit your Netlify URL
2. Sign up for an account
3. Try generating a website
4. Verify credits decrease
5. Check dashboard for saved projects

## 📊 Cost Monitoring

### FREE Services (No Credit Card Required)

- **Supabase FREE Tier**:
  - 500MB database storage
  - 1GB file storage
  - 2GB bandwidth
  - 500K Edge Function invocations
  - Unlimited auth users
  
- **Netlify FREE Tier**:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Automatic HTTPS
  - Deploy previews

### Paid Service

- **OpenAI API**:
  - GPT-4: $0.03 per 1K input tokens, $0.06 per 1K output tokens
  - Estimated: $0.10-0.50 per generation
  - **Monthly cost**: ~$5-50 depending on usage

## 🔧 Post-Deployment

### Monitor Usage

**Supabase Dashboard**:
- Database usage
- Edge Function invocations
- Storage usage
- Auth users

**Netlify Dashboard**:
- Build status
- Bandwidth usage
- Deploy logs

**OpenAI Dashboard**:
- API usage
- Costs
- Rate limits

### Set Up Alerts

1. **Supabase**: Project Settings → Usage → Set usage alerts
2. **OpenAI**: Account → Usage limits → Set monthly budget

## 🚨 Troubleshooting

### Build Fails on Netlify

```bash
# Check build logs in Netlify dashboard
# Common issues:
- Missing environment variables
- Node version mismatch (ensure NODE_VERSION=22 in netlify.toml)
- TypeScript errors
```

### Edge Function Errors

```bash
# View logs
supabase functions logs generate-website

# Test locally
supabase functions serve generate-website

# Common issues:
- Missing OPENAI_API_KEY
- Supabase connection issues
- OpenAI API errors
```

### Database Connection Issues

```bash
# Test connection
npx prisma db push

# Check:
- DATABASE_URL is correct
- Database password has no special characters that need escaping
- IP restrictions in Supabase (should be disabled for Netlify)
```

## 📈 Scaling Beyond FREE Tier

If you exceed FREE limits:

**Supabase**:
- Pro plan: $25/month (8GB database, 100GB bandwidth)

**Netlify**:
- Pro plan: $19/month (1TB bandwidth, 1000 build minutes)

**Optimization Tips**:
- Cache OpenAI responses
- Implement rate limiting
- Use cheaper OpenAI models for simple requests
- Enable Supabase read replicas (Pro)

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema deployed (prisma db push)
- [ ] Storage bucket created
- [ ] Edge Function deployed
- [ ] Environment variables set in Edge Function
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] Environment variables set in Netlify
- [ ] Site deployed successfully
- [ ] Sign up tested
- [ ] Website generation tested
- [ ] Credits system working
- [ ] Dashboard showing projects
- [ ] Custom domain configured (optional)
- [ ] Usage alerts set up

## 🎉 You're Live!

Your AI Website Builder is now live with:
- ✅ $0/month infrastructure (except OpenAI)
- ✅ Automatic deployments from GitHub
- ✅ Secure authentication
- ✅ Scalable database
- ✅ Global CDN
- ✅ HTTPS enabled
- ✅ Professional domain (optional)

**Share your creation**: `https://yoursite.netlify.app`

---

**Questions?** Check the main README.md or create an issue on GitHub.
