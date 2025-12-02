# 🚀 Deployment Guide

Quick guide to deploy your AI Study Planner with cloud sync.

---

## Quick Start (15 minutes)

### 1️⃣ Setup Supabase (5 min)

**Go to:** https://supabase.com

1. Sign up (free)
2. Create project: `ai-study-planner`
3. SQL Editor → New Query → Run this:

```sql
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

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_month_week ON tasks(month_id, week_id);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations" ON tasks FOR ALL USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Settings → API → Copy:
   - **Project URL**
   - **anon public key**

---

### 2️⃣ Push to GitHub (3 min)

```bash
cd /Users/swmukherjee/Documents/schedule

# Create repo on GitHub: https://github.com/new
# Name: ai-study-planner

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-study-planner.git

# Push
git push -u origin main
```

---

### 3️⃣ Deploy on Netlify (5 min)

**Go to:** https://netlify.com

1. Sign up with GitHub
2. Import project → Choose `ai-study-planner`
3. Build settings:
   - Command: `npm run build`
   - Directory: `build`
4. Add environment variables:
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your anon key
5. Deploy!

---

### 4️⃣ Done! 🎉

Your site is live! Every push to GitHub auto-deploys.

**Customize URL:** Netlify → Site settings → Change site name

---

## What You Get

- ✅ Live website (free forever)
- ✅ Cloud database (multi-device sync)
- ✅ Auto-deploy on git push
- ✅ HTTPS automatic
- ✅ Global CDN

**Cost: $0**

---

## Troubleshooting

**Build fails?** Check Netlify build logs

**Data not syncing?** Verify environment variables in Netlify

**Need detailed guide?** See `FULL_DEPLOYMENT_GUIDE.md`

---

**That's it! You're live in 15 minutes.** 🚀
