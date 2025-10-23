# KRE8SITES - AI-Powered SaaS Website Builder

![KRE8SITES Banner](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991?style=for-the-badge&logo=openai)

## 🚀 Features

- **AI Code Generation**: Generate complete Next.js applications from text prompts
- **Live Preview**: Real-time preview of generated code using StackBlitz WebContainers
- **User Authentication**: Secure authentication with Supabase Auth
- **Credit System**: Free credits for users (2 free generations)
- **Project Management**: Save and manage all your generated projects
- **Database Persistence**: PostgreSQL database via Supabase
- **Background Jobs**: Long-running AI generation via Supabase Edge Functions
- **100% FREE Hosting**: Deploy on Netlify with FREE tier

## 💰 Cost Breakdown

| Service | Cost | Features |
|---------|------|----------|
| **Supabase** | $0/month | 500MB database, unlimited auth, 1GB storage |
| **Netlify** | $0/month | 100GB bandwidth, auto-deployment |
| **StackBlitz** | $0/month | Browser-based code execution |
| **OpenAI** | ~$5-50/month | Pay-per-use (only paid service) |
| **Total** | **$5-50/month** | Production-ready SaaS! |

## 🛠️ Tech Stack

### Frontend
- Next.js 15.3.4 with App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zustand (State Management)
- React Hook Form + Zod
- Lucide React Icons

### Backend & Database
- PostgreSQL (via Supabase - FREE 500MB)
- Prisma ORM 6.10.1
- Supabase Auth (FREE unlimited users)
- Supabase Storage (FREE 1GB)
- Supabase Edge Functions (FREE 500k/month)

### AI & APIs
- OpenAI API (GPT-4)
- StackBlitz WebContainers

### Hosting
- Netlify (FREE 100GB bandwidth/month)

## 📦 Installation

### Prerequisites
- Node.js 22.15.1 or higher
- npm 11.4.1 or higher
- Supabase account (free)
- OpenAI API key
- Netlify account (free)

### Step 1: Clone and Install

```bash
git clone <your-repo>
cd kre8sites
npm install
```

### Step 2: Set Up Supabase

1. Create a FREE Supabase project at [supabase.com](https://supabase.com)
2. Get your connection details from the Supabase dashboard
3. Copy `.env.local.example` to `.env.local`
4. Add your Supabase credentials

### Step 3: Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
# Supabase Database (FREE 500MB)
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Supabase Auth & API (FREE unlimited users)
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# OpenAI (PAID - only paid service required)
OPENAI_API_KEY="sk-your-openai-key"

# Supabase Storage bucket name
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET="generated-websites"
```

### Step 4: Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (will create tables in Supabase)
npx prisma db push

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

### Step 5: Deploy Supabase Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy the Edge Function
supabase functions deploy generate-website

# Set environment variables for the Edge Function
supabase secrets set OPENAI_API_KEY=sk-your-key
```

### Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment (FREE!)

### Deploy to Netlify

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Netlify**
- Go to [app.netlify.com](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `.next`

3. **Add Environment Variables**

Go to Netlify Dashboard → Site Settings → Environment Variables and add all the vars from `.env.local`

4. **Deploy!**

Netlify will automatically deploy your site. You'll get a FREE `yoursite.netlify.app` domain!

## 📚 Project Structure

```
kre8sites/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/              # Website builder interface
│   │   └── page.tsx
│   ├── dashboard/            # User dashboard
│   │   └── page.tsx
│   ├── api/
│   │   └── generate/         # API route to trigger Edge Function
│   │       └── route.ts
│   └── globals.css           # Global styles
├── components/
│   └── generated/            # Reactinator-generated components
│       ├── PrimaryButton.tsx
│       ├── TemplateCard.tsx
│       └── ProjectsTable.tsx
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── utils.ts              # Utility functions
│   ├── theme.ts              # Theme configuration
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server client
│   └── stores/
│       └── builderStore.ts   # Zustand state management
├── prisma/
│   └── schema.prisma         # Database schema
├── supabase/
│   └── functions/
│       └── generate-website/ # Edge Function for AI generation
│           └── index.ts
├── .env.local.example        # Environment variables template
├── components.json           # shadcn/ui config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

## 🎯 Usage

### For Users

1. **Sign Up/Login**: Create a free account
2. **Start Building**: Click "Start Building" or choose a template
3. **Describe Your App**: Write a detailed prompt
4. **Generate**: Click "Generate App" (uses 1 credit)
5. **Preview**: View your generated app in real-time
6. **Save**: All projects are automatically saved to your dashboard

### Template Examples

- Netflix Clone
- Admin Dashboard
- Kanban Board
- File Manager
- YouTube Clone
- E-commerce Store
- Airbnb Clone
- Spotify Clone

## 🔧 Development

### Database Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database (dev only!)
npx prisma migrate reset
```

### Edge Function Commands

```bash
# Test Edge Function locally
supabase functions serve generate-website

# View logs
supabase functions logs generate-website

# Deploy Edge Function
supabase functions deploy generate-website
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🎨 Customization

### Adding New Templates

Edit `app/page.tsx`:

```typescript
const templates = [
  { id: "your-template", name: "Your Template", icon: "🎨" },
  // ... more templates
];
```

### Customizing Theme

Edit `lib/theme.ts` to change colors, typography, spacing, etc.

### Modifying AI Prompts

Edit `supabase/functions/generate-website/index.ts` to customize the system prompt.

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db push

# Check Supabase dashboard for connection string
```

### Edge Function Errors
```bash
# Check logs
supabase functions logs generate-website

# Test locally
supabase functions serve generate-website
```

### Build Errors
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Prisma Documentation](https://prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or building your own SaaS!

## 🎉 Built With

- **Reactinator MCP**: Used to generate production-ready React components
- **Next.js 15**: The React Framework for Production
- **Supabase**: Open Source Firebase Alternative (100% FREE for this project!)
- **OpenAI**: AI-powered code generation
- **Netlify**: FREE hosting and deployment
- **Prisma**: Next-generation ORM
- **Zustand**: Bear necessities for state management
- **Tailwind CSS**: Utility-first CSS framework

---

**Made with ❤️ using Reactinator MCP Server**

Total Monthly Cost: **~$5-50** (OpenAI only) | Everything else is **100% FREE!**
