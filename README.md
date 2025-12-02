# 📚 Flexible AI Study Planner

## Aim
A flexible, week-based React application for learning GenAI, Agentic AI, System Design (HLD), and DSA. **No fixed dates** - start and pause whenever you want!

## ✨ Key Features

### 🎯 Week-Based Learning
- **8 Months Core Content** (4 weeks each = 32 focused weeks)
- **Final Prep Section** (do when ready)
- No fixed dates - progress at your own pace
- Each month has exactly 4 weeks - consistent and manageable

### 📊 Smart Organization
- **Main Content**: 8 months of structured learning
  - GenAI & RAG
  - Agentic AI & Multi-Agent Systems
  - System Design (HLD)
  - DSA & Algorithms
- **Final Prep**: Separate section for
  - Portfolio Projects
  - Mock Interviews
  - Resume & Applications
  - Job Search

### 🔧 Advanced Functionality
- 🚀 **Guest Mode**: Use instantly without login
- 🔐 **Optional Authentication**: Sign up for cloud sync
- ✅ **Task-Level Tracking**: Check off individual tasks
- 📝 **Notes**: Add notes to any task
- 🔍 **Filtering & Search**: Filter by month, category, status
- 📊 **Sorting**: Sort by any column
- ⬇️ **CSV Export**: Export your progress
- 🎨 **Category Badges**: Color-coded (GenAI, Agentic AI, HLD, DSA)
- 🏆 **Difficulty Indicators**: Easy, Moderate, Hard
- 📱 **Responsive Design**: Works on all devices
- ☁️ **Cloud Sync**: Multi-device support (when logged in)
- 📡 **Offline Support**: Works offline with localStorage

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

## 📋 App Structure

### 🏠 Dashboard
- Overview of all 8 months
- Progress rings and cards
- Category breakdown
- Quick stats

### 📅 Month View
- 4 weeks per month
- Week-by-week breakdown
- Progress tracking
- Difficulty indicators

### 📝 Week View
- Task breakdown by category
- Check off tasks as you complete them
- Add notes for each task
- Resource links

### 📋 Task Database
- Excel-like spreadsheet view
- Filter by month, category, status
- Sort by any column
- Search functionality
- Expandable rows with notes

### 📊 Progress Analytics
- Overall completion percentage
- Category-wise progress
- Difficulty breakdown
- Month-by-month tracking
- Motivational insights

### 🎯 Final Prep
- Portfolio projects checklist
- Mock interview tracker
- Resume & application tasks
- **Do these when you're ready - no pressure!**

## 🎨 Design Features

- **Dark Mode**: Eye-friendly design
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Framer Motion powered
- **Gradient Accents**: Purple-indigo theme
- **Progress Rings**: Circular progress indicators
- **Badge System**: Color-coded categories & difficulties

## 📊 Study Plan Structure

### 8-Month Core (32 Weeks)

**Month 1**: GenAI Foundations + HLD Basics + Easy DSA  
**Month 2**: RAG Pipeline + System Design Patterns  
**Month 3**: Advanced RAG + DB Internals + DP  
**Month 4**: Agentic AI Foundations + Case Studies  
**Month 5**: Agent Workflows + Advanced Systems  
**Month 6**: Multi-Agent Systems + Distributed Systems  
**Month 7**: Production Agents + Scaling  
**Month 8**: Integration + Real Projects  

### Final Prep (When Ready)

**Portfolio Projects**: 3 production-ready projects  
**Mock Interviews**: DSA + HLD + Agentic AI  
**Resume & Portfolio**: Polish everything  
**Applications**: Job search & networking  

## 💾 Data Storage & Authentication

### 🚀 Guest Mode (Default - No Login)
- Click "Continue as Guest" on first visit
- Data saves to browser's local storage
- Works instantly - no email or password
- 100% local - no data sent anywhere
- Perfect for trying out the app
- ⚠️ Data stays on ONE device only

### ☁️ Authenticated Mode (Optional - With Login)
- Click "Sign In for Cloud Sync"
- Create account with email/password
- Data syncs to Supabase cloud database
- Access from ANY device
- Multi-device support
- Data backed up in the cloud
- See `SECURE_DATABASE_SETUP.md` for setup

**Best of both worlds**: Start as guest, sign up later to sync your progress!

## 🚀 Deployment

### Quick Deploy (Guest Mode Only)
Deploy to Vercel/Netlify - works immediately! Users can:
- Use app without login
- All data stored locally
- No backend needed

### Full Deploy (Guest + Cloud Sync)
Ready for cloud sync? See guides:
- **[OPTIONAL_AUTH_GUIDE.md](OPTIONAL_AUTH_GUIDE.md)** - How optional auth works
- **[SECURE_DATABASE_SETUP.md](SECURE_DATABASE_SETUP.md)** - Supabase setup
- **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)** - Vercel deployment

**Note**: App works perfectly without Supabase! Cloud sync is optional.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Card.js
│   │   ├── ProgressRing.js
│   │   ├── ProgressBar.js
│   │   ├── CategoryBadge.js
│   │   └── DifficultyBadge.js
│   ├── Navigation.js           # Glassmorphic navigation
│   └── SyncStatus.js          # Cloud sync indicator
├── pages/
│   ├── Login.js               # Login/signup (optional)
│   ├── Dashboard.js           # Main dashboard
│   ├── MonthView.js           # Month details
│   ├── WeekView.js            # Week tasks
│   ├── Progress.js            # Analytics
│   ├── TaskDatabase.js        # Excel-like view
│   └── FinalPrep.js           # Portfolio & interview prep
├── context/
│   ├── AuthContext.js         # Authentication (guest/logged in)
│   └── TaskDatabaseContext.js # Global state management
├── data/
│   └── fullScheduleData.js    # Study plan data
└── index.css                  # Tailwind + custom styles
```

## 🛠️ Technologies

- **React 18**: Frontend framework
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Supabase**: Optional cloud database
- **LocalStorage**: Offline persistence

## 💡 Philosophy

### Flexible & Stress-Free
- **No fixed dates**: Start Monday, Tuesday, whenever!
- **Pause anytime**: Life happens, resume when ready
- **Week-based**: Focus on completing weeks, not racing calendars
- **4 weeks = 1 month**: Simple, consistent structure

### Core First, Extras Later
- **8 months core**: Focus here first
- **Final prep separate**: Do when you feel ready
- **No pressure**: Quality over speed

### Realistic & Achievable
- ~400 tasks total
- Clear difficulty levels
- Focused weekly themes
- Manageable chunks

## 📈 Progress Tracking

- ✅ 400+ tasks across 32 weeks
- 📊 Real-time progress tracking
- 🎯 Category-wise analytics
- 📈 Visual progress indicators
- ⬇️ CSV export for backups

## 🎯 Perfect For

- Self-paced learners
- Career switchers
- Working professionals
- Anyone wanting to learn AI Engineering systematically

## 📚 Resources Included

- LeetCode problem links
- System design course references
- OpenAI documentation
- LangChain guides
- RAG tutorials
- Vector database docs

## 🌟 Highlights

- **Premium UI/UX**: Apple × Notion × Linear aesthetic
- **Production-Ready**: Build and deploy immediately
- **Fully Responsive**: Desktop, tablet, mobile
- **Offline-First**: Works without internet
- **Cloud-Optional**: Add Supabase when needed

## 📝 Notes

- All resources are links to external sites
- Customize the schedule to fit your pace
- Add your own notes and resources
- Export your progress anytime

---

**Start your AI engineering journey today - at your own pace!** 🚀

### 📖 Documentation

- **[OPTIONAL_AUTH_GUIDE.md](OPTIONAL_AUTH_GUIDE.md)** - How optional authentication works
- **[SECURE_DATABASE_SETUP.md](SECURE_DATABASE_SETUP.md)** - Step-by-step Supabase setup
- **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)** - Deploying to Vercel

**Quick Start**: Just deploy - guest mode works out of the box! ✨**
