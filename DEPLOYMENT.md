# 🚀 Deployment Guide - Netlify + Supabase

## Aim
Deploy your Study Plan Tracker to Netlify with Supabase for cloud-based progress storage.

---

## Step 1: Create Supabase Project (FREE)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Choose:
   - **Organization**: Create new or use existing
   - **Project Name**: "study-tracker" (or your choice)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
5. Wait 2-3 minutes for project to initialize

---

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL:

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
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
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

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to manage their own tasks
CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** (bottom right)
5. You should see "Success. No rows returned"

---

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, click **Settings** (gear icon)
2. Go to **API** section
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string under "Project API keys")

---

## Step 4: Deploy to Netlify

### Option A: Using Netlify UI (Easiest)

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up/login
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub/GitLab (or drag & drop the build folder)
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Add Environment Variables:
   - Click **"Site settings"** → **"Environment variables"**
   - Add two variables:
     - `REACT_APP_SUPABASE_URL` = your Supabase project URL
     - `REACT_APP_SUPABASE_ANON_KEY` = your anon key
7. Click **"Deploy"**

### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Create .env file (don't commit this!)
echo "REACT_APP_SUPABASE_URL=your-url-here" > .env
echo "REACT_APP_SUPABASE_ANON_KEY=your-key-here" >> .env

# Build the app
npm run build

# Deploy
netlify deploy --prod
```

When prompted:
- Choose "Create & configure a new site"
- Choose your team
- Site name: (choose a name)
- Publish directory: `build`

---

## Step 5: Add Environment Variables to Netlify

If you used Option B, add environment variables:

```bash
netlify env:set REACT_APP_SUPABASE_URL "your-supabase-url"
netlify env:set REACT_APP_SUPABASE_ANON_KEY "your-anon-key"
```

Or in Netlify UI:
1. Go to your site dashboard
2. **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add both variables

---

## Step 6: Redeploy (if needed)

After adding environment variables:
- Netlify UI: Click **"Trigger deploy"** → **"Deploy site"**
- Or: `netlify deploy --prod` in CLI

---

## How It Works

### Dual Storage System

Your app now uses **BOTH** localStorage AND Supabase:

#### **localStorage** (Browser)
- ✅ Instant saves
- ✅ Works offline
- ✅ No setup required
- ❌ Device-specific

#### **Supabase** (Cloud Database)
- ✅ Syncs across devices
- ✅ Accessible from anywhere
- ✅ Free tier (500MB, 50K rows)
- ❌ Requires internet

#### **Automatic Sync**
- Changes save to localStorage immediately
- After 1 second, syncs to Supabase (if online)
- On app load, pulls from Supabase (if configured)
- Falls back to localStorage if Supabase unavailable

---

## Free Tier Limits

### Supabase Free Tier:
- ✅ 500 MB database space
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth
- ✅ Unlimited API requests
- ✅ No credit card required

**Your app needs:** ~400 tasks × ~500 bytes = ~200 KB (well within limits!)

### Netlify Free Tier:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ No credit card required

---

## Testing Your Deployment

1. Visit your Netlify URL (something like `https://your-app-name.netlify.app`)
2. Open browser DevTools → Console
3. Look for sync status messages
4. Check a task - it should save to Supabase
5. Open app in another browser/device - progress should sync!

---

## Troubleshooting

### "Supabase not configured" warning
- Check environment variables are set in Netlify
- Redeploy after adding env vars
- Check variable names match exactly

### Data not syncing
- Check browser console for errors
- Verify Supabase URL and key are correct
- Check internet connection
- Verify RLS policies are set correctly

### Offline mode
- App still works offline using localStorage
- Changes sync when you come back online

---

## Alternative: Use Without Supabase

The app works perfectly **without Supabase** using only localStorage:

1. Don't set environment variables
2. Deploy to Netlify normally
3. Progress saves to browser only
4. Use CSV export for backups

---

## Observations

- Free deployment with no costs
- Data persists across sessions
- Works offline with localStorage fallback
- Automatic cloud sync when online
- Can access from multiple devices
- CSV export for backups
- Scales to handle all tasks easily

