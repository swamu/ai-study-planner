# 🚀 Deploy to Vercel (Easier than Netlify!)

## Quick Deploy (5 minutes)

### Go to: https://vercel.com

1. **Sign up** with GitHub (fastest)
2. Click **"Add New"** → **"Project"**
3. **Import** your repository: `swamu/ai-study-planner`
4. Vercel auto-detects React settings ✅
5. **Configure** (should be pre-filled):
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. **Add Environment Variables** (if using Supabase):
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your Supabase key
7. Click **"Deploy"**

---

## ✅ What Happens

- Builds in ~2 minutes
- Gets a URL like: `https://ai-study-planner.vercel.app`
- Auto-deploys on every `git push`
- HTTPS automatic
- Edge network (super fast globally)

---

## 🎯 After Deploy

### Customize Your URL:
1. Project settings → Domains
2. Add: `ai-study-planner.vercel.app` (or custom domain)

### Test:
1. Visit your Vercel URL
2. Check a task
3. Open on another device
4. Should sync via Supabase!

---

## 🔄 Auto-Deploy

Every time you:
```bash
git add .
git commit -m "Update"
git push
```

Vercel automatically deploys! 🚀

---

## Why Vercel?

- ✅ Zero config (auto-detects React)
- ✅ Fastest deploys (~2 min)
- ✅ Best for React apps
- ✅ Free tier is generous
- ✅ Easy custom domains
- ✅ Great analytics

---

## Free Tier

- ✅ 100 GB bandwidth
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ No credit card needed

---

**Go to https://vercel.com and import your GitHub repo!** 

It's literally 3 clicks and you're live! 🎉

