# 🗄️ Supabase Database Setup (10 minutes)

## Step 1: Create Supabase Account (2 min)

### Go to: https://supabase.com

1. Click **"Start your project"**
2. Sign up with GitHub (easiest)
3. Authorize Supabase

---

## Step 2: Create New Project (3 min)

1. Click **"New Project"**
2. Choose or create an **Organization** (can use default)
3. Fill in:
   - **Name**: `ai-study-planner`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `us-east-1` for USA)
4. Click **"Create new project"**
5. **Wait 2-3 minutes** while it initializes ☕

---

## Step 3: Create Database Table (2 min)

1. In your project dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. **Copy and paste this entire SQL** into the editor:

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

-- Create indexes for faster queries
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_month_week ON tasks(month_id, week_id);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow all operations (simplified for personal use)
CREATE POLICY "Enable all operations for all users"
  ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update timestamp trigger
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
5. You should see: **"Success. No rows returned"** ✅

---

## Step 4: Get API Credentials (1 min)

1. Click **Settings** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. You'll see two important values:

### Copy These:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
(very long string)
```

**Save these somewhere safe!** You'll need them for Vercel.

---

## Step 5: Add to Vercel (2 min)

### Go to: https://vercel.com

1. Go to your project: **ai-study-planner**
2. Click **"Settings"** tab
3. Click **"Environment Variables"** (left menu)
4. Add **Variable 1**:
   - **Name**: `REACT_APP_SUPABASE_URL`
   - **Value**: (paste your Supabase Project URL)
   - Click **"Save"**
5. Add **Variable 2**:
   - **Name**: `REACT_APP_SUPABASE_ANON_KEY`
   - **Value**: (paste your Supabase anon key)
   - Click **"Save"**

---

## Step 6: Redeploy (1 min)

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait ~2 minutes

---

## Step 7: Test It! 🎉

1. Visit your Vercel URL
2. Check a task (click checkbox)
3. **Open the same URL on your phone** or another browser
4. You should see the same task checked! ☁️

---

## ✅ What You Have Now

- ✅ **App**: Deployed on Vercel
- ✅ **Database**: PostgreSQL on Supabase
- ✅ **Sync**: Multi-device cloud sync
- ✅ **Offline**: Works without internet
- ✅ **Auto-deploy**: Every git push
- ✅ **Free**: $0 cost

---

## 📊 How It Works

### Local Storage (Instant)
- Saves immediately to browser
- Works offline
- Device-specific

### Supabase (Cloud)
- Syncs after 1 second
- Available on all devices
- Requires internet

### Auto-Sync
1. You check a task → saves to localStorage (instant)
2. After 1 sec → syncs to Supabase (cloud)
3. On another device → loads from Supabase
4. Magic! ✨

---

## 🎯 Quick Reference

**Supabase Dashboard:** https://app.supabase.com/project/YOUR_PROJECT_ID

**Vercel Dashboard:** https://vercel.com/swamu/ai-study-planner

**Your Live App:** https://ai-study-planner.vercel.app (or your URL)

---

## Troubleshooting

**Data not syncing?**
- Check browser console (F12) for errors
- Verify environment variables in Vercel
- Make sure you redeployed after adding variables

**Build fails?**
- Check Vercel build logs
- Verify all dependencies are in package.json

**Can't see Supabase table?**
- Go to Supabase → Table Editor → Should see "tasks" table

---

**Follow the steps above to enable cloud sync!** 🚀

Start with: https://supabase.com

