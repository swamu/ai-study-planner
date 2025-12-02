# 🔐 Secure Database Setup with Authentication

## Overview
This guide sets up Supabase with authentication so only YOU can access your study plan data.

---

## Step 1: Create Supabase Project (3 min)

### Go to: https://supabase.com

1. Sign up with GitHub
2. Click **"New Project"**
3. Fill in:
   - **Name**: `ai-study-planner`
   - **Database Password**: (create strong password - save it!)
   - **Region**: Choose closest (e.g., US East, EU West)
4. Click **"Create new project"**
5. ⏳ **Wait 2-3 minutes** for initialization

---

## Step 2: Create Secure Database Table (3 min)

### Go to: SQL Editor → New Query

Copy and paste this **SECURE** SQL:

```sql
-- Create tasks table with user authentication
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Create indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_month_week ON tasks(month_id, week_id);

-- Enable Row Level Security (RLS) - IMPORTANT FOR SECURITY
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- SECURE POLICY: Users can only see their own data
CREATE POLICY "Users can view their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);

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

Click **"Run"** ✅

---

## Step 3: Enable Email Authentication (2 min)

1. Go to **Authentication** (left sidebar)
2. Click **"Providers"**
3. Find **"Email"** and click to expand
4. Make sure these are enabled:
   - ✅ **Enable Email provider**
   - ✅ **Confirm email** (optional, can disable for ease)
5. Click **"Save"**

---

## Step 4: Get API Credentials (1 min)

1. Click **"Settings"** (gear icon)
2. Click **"API"**
3. Copy these TWO values:

**Project URL:**
```
https://xxxxx.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiI...
```

---

## Step 5: Add to Vercel (2 min)

### Go to: https://vercel.com/swamu/ai-study-planner

1. **Settings** → **Environment Variables**
2. Add these 2 variables:

   **Variable 1:**
   - Name: `REACT_APP_SUPABASE_URL`
   - Value: (your Supabase URL)

   **Variable 2:**
   - Name: `REACT_APP_SUPABASE_ANON_KEY`
   - Value: (your anon key)

3. Click **"Save"**

---

## Step 6: I'll Add Login to Your App

I'll now create a simple login page for your app. You'll be able to:
- ✅ Sign up with email/password
- ✅ Login
- ✅ Logout
- ✅ Only see YOUR data
- ✅ Data isolated from other users

---

## 🔐 Security Features

### What This Setup Provides:
- ✅ **Each user has their own account**
- ✅ **Data is isolated** (you can't see others' data)
- ✅ **Row Level Security** enforced by database
- ✅ **Secure authentication** via Supabase Auth
- ✅ **No password storage** in your app (Supabase handles it)

### How It Works:
1. User signs up → Creates account in Supabase
2. User logs in → Gets authentication token
3. App loads → Only fetches data for authenticated user
4. Database ensures → No cross-user data access

---

## 📝 What I'll Add to Your App

1. **Login Page** (`/login`)
   - Email + Password fields
   - Sign up / Sign in toggle
   - Clean, minimal design

2. **Auth Context**
   - Manages login state
   - Protects routes
   - Auto-redirects if not logged in

3. **Logout Button**
   - In navigation
   - Clears session

4. **Protected Routes**
   - Dashboard, Tasks, etc. require login
   - Redirects to /login if not authenticated

---

**Ready? Follow Steps 1-5 above, then I'll add the login functionality to your app!** 🔐

Let me know when you've completed the Supabase setup and I'll implement the authentication! 🚀

