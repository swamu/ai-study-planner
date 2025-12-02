# 🚀 Deploy to Netlify - Quick Guide

## Option 1: Drag & Drop (Easiest - 2 minutes)

### Step 1: Build is Ready ✅
Your `build/` folder is already created and ready to deploy!

### Step 2: Deploy to Netlify
1. Go to **https://netlify.com**
2. Sign up/login (free account)
3. Click **"Add new site"** → **"Deploy manually"**
4. **Drag and drop** the `build` folder from your computer
5. Done! Your site will be live in seconds

Your URL will look like: `https://random-name-12345.netlify.app`

---

## Option 2: Netlify CLI (5 minutes)

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Deploy
```bash
cd /Users/swmukherjee/Documents/schedule

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

Follow the prompts:
- Create a new site? **Yes**
- Site name: (choose a name or leave blank for random)
- Deploy directory: **build** (already specified)

---

## Option 3: GitHub + Netlify (10 minutes, Auto-deploy on changes)

### Step 1: Push to GitHub
```bash
cd /Users/swmukherjee/Documents/schedule

# Initialize git if not done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Study Planner"

# Create repo on GitHub and push
# (Follow GitHub instructions)
```

### Step 2: Connect to Netlify
1. Go to **https://netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click **"Deploy"**

Every time you push to GitHub, it auto-deploys!

---

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to your site settings on Netlify
2. Click **"Domain settings"**
3. Add your custom domain
4. Update DNS records as instructed

---

## Environment Variables (For Supabase - Optional)

If you want cloud sync with Supabase:

1. In Netlify, go to **Site settings** → **Environment variables**
2. Add:
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your Supabase key
3. Redeploy

See `DEPLOYMENT.md` for full Supabase setup.

---

## 🎉 You're Done!

### What You Get:
- ✅ Free hosting
- ✅ HTTPS enabled
- ✅ Custom URL
- ✅ Fast CDN
- ✅ Auto SSL certificate

### Your App Features:
- 📚 8-month flexible study plan
- ✅ Task tracking with checkboxes
- 📊 Progress analytics
- 💾 localStorage (works offline)
- 🎨 Clean light theme
- 📱 Fully responsive

---

## Quick Commands Reference

```bash
# Build for production
npm run build

# Deploy with Netlify CLI
netlify deploy --prod --dir=build

# Check deployment status
netlify status

# Open your live site
netlify open
```

---

**Ready to deploy? Use Option 1 (Drag & Drop) - it's the fastest!** 🚀

Your `build/` folder is at:
`/Users/swmukherjee/Documents/schedule/build`

