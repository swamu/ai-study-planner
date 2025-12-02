# 🚀 Complete Deployment Guide: GitHub + Netlify + Supabase

## What You'll Get
- ✅ Auto-deploy on every code change (GitHub → Netlify)
- ✅ Cloud database for multi-device sync (Supabase)
- ✅ Free hosting with custom domain
- ✅ HTTPS automatically
- ✅ Works offline + syncs when online

---

## Step 1: Setup Supabase Database (5 minutes)

### 1.1 Create Supabase Account
1. Go to **https://supabase.com**
2. Sign up (free - no credit card needed)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `ai-study-planner`
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
5. Wait 2 minutes for setup

### 1.2 Create Database Table
1. In Supabase dashboard, click **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  month_id INTEGER NOT NULL,
  week_id INTEGER NOT NULL,
  month_name TEXT NOT NULL,
  week_name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_goal TEXT,
  task_text TEXT NOT NULL,
  difficulty TEXT,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  resources TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, task_id)
);

-- Create index for faster queries
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_month_week ON tasks(month_id, week_id);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow all operations (simplified for single user)
CREATE POLICY "Enable all operations for all users"
  ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"** (bottom right)
5. You should see "Success. No rows returned"

### 1.3 Get Supabase Credentials
1. Go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string)

**Keep these safe! You'll need them for Netlify.**

---

## Step 2: Push to GitHub (5 minutes)

### 2.1 Initialize Git
Open terminal in your project folder:

```bash
cd /Users/swmukherjee/Documents/schedule

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Study Planner with light theme"
```

### 2.2 Create GitHub Repository
1. Go to **https://github.com/new**
2. Repository name: `ai-study-planner` (or your choice)
3. Description: "Flexible 8-month AI engineering study plan tracker"
4. Make it **Public** or **Private** (your choice)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### 2.3 Push to GitHub
Copy the commands from GitHub and run them:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ai-study-planner.git

# Push
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Step 3: Deploy to Netlify (5 minutes)

### 3.1 Connect to Netlify
1. Go to **https://netlify.com**
2. Sign up/login (can use GitHub to login)
3. Click **"Add new site"** → **"Import an existing project"**
4. Click **"GitHub"**
5. Authorize Netlify to access your repositories
6. Select your `ai-study-planner` repository

### 3.2 Configure Build Settings
```
Build command:    npm run build
Publish directory: build
```

**Don't deploy yet!** Click **"Show advanced"** first.

### 3.3 Add Environment Variables
Click **"Add environment variables"** and add these 2:

**Variable 1:**
- **Key**: `REACT_APP_SUPABASE_URL`
- **Value**: (paste your Supabase Project URL)

**Variable 2:**
- **Key**: `REACT_APP_SUPABASE_ANON_KEY`
- **Value**: (paste your Supabase anon key)

### 3.4 Deploy!
Click **"Deploy site"**

Wait 2-3 minutes... ☕

✅ Your site is live!

---

## Step 4: Configure Custom Domain (Optional)

### Your current URL:
`https://random-name-12345.netlify.app`

### To customize:
1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change to: `ai-study-planner` (or whatever you want)
4. New URL: `https://ai-study-planner.netlify.app`

### To add your own domain (like studyplan.com):
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Netlify: **Domain settings** → **"Add custom domain"**
3. Follow DNS configuration instructions

---

## Step 5: Test Everything (2 minutes)

### 5.1 Test the App
1. Visit your Netlify URL
2. Complete a task (check a checkbox)
3. Open in a different browser/device
4. You should see the same progress! ☁️

### 5.2 Test Auto-Deploy
1. Make a small change in your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update: test auto-deploy"
   git push
   ```
3. Go to Netlify → **Deploys**
4. Watch it auto-deploy! 🚀

---

## What You Have Now

### ✅ Features
- 📚 8-month flexible study plan
- ✅ Task tracking with checkboxes
- 💾 Local storage (instant saves)
- ☁️ Cloud sync via Supabase
- 📱 Works on any device
- 🌐 Auto-deploys on code changes
- 🎨 Clean professional light theme
- 📊 Progress analytics
- 📋 Excel-like task database
- 🎯 Final prep section

### ✅ Infrastructure
- **Frontend**: Netlify (free)
- **Database**: Supabase (free)
- **Hosting**: Global CDN
- **SSL**: Automatic HTTPS
- **Deployment**: Auto on push
- **Domain**: Custom URL available

### ✅ Free Tier Limits
**Netlify:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Supabase:**
- 500 MB database
- 50K monthly users
- 2 GB bandwidth
- Unlimited API requests

**Your app uses ~400 tasks × ~500 bytes = ~200 KB**
You're well within limits! 💰

---

## Troubleshooting

### Issue: Build fails on Netlify
**Solution:** Check build logs, usually missing dependencies
```bash
# Locally test build
npm run build
```

### Issue: Supabase not connecting
**Solution:** 
1. Check environment variables in Netlify
2. Make sure they start with `REACT_APP_`
3. Redeploy after adding variables

### Issue: Data not syncing
**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify Supabase URL and key are correct
4. Check internet connection

### Issue: Changes not deploying
**Solution:**
1. Check Netlify → Deploys tab
2. Make sure GitHub webhook is set up
3. Try manual deploy: Netlify → Deploys → "Trigger deploy"

---

## Maintenance

### Update Code:
```bash
# Make changes
git add .
git commit -m "Your update message"
git push
# Auto-deploys!
```

### Monitor Usage:
- **Netlify**: Dashboard shows bandwidth/builds
- **Supabase**: Dashboard shows DB size/requests

### Backup Data:
Use the CSV export feature in the app to backup your progress.

---

## Next Steps

### Optional Enhancements:
1. **Custom Domain**: Buy and connect your domain
2. **Analytics**: Add Google Analytics or Plausible
3. **Authentication**: Add user login (Supabase Auth)
4. **Email Notifications**: Send progress reminders
5. **Mobile App**: Convert to PWA or native app

### Share Your App:
- Tweet your Netlify URL
- Add to portfolio
- Share with friends
- Post on LinkedIn

---

## 🎉 Congratulations!

You now have a **production-ready, cloud-synced, auto-deploying study planner**!

**Your Stack:**
- Frontend: React + Tailwind CSS
- Database: PostgreSQL (Supabase)
- Hosting: Netlify CDN
- Version Control: GitHub
- CI/CD: Automatic

**Cost:** $0 (100% free!)

---

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev

---

**Ready to deploy?** Follow the steps above! 🚀

Each step is detailed and straightforward. You'll be live in about 15-20 minutes total!

