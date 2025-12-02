# 🎨 Design System Documentation

## Overview

This document describes the premium design system implemented for the 10-Month AI Engineering Study Plan Tracker, following Apple/Notion/Linear/Airtable aesthetics.

---

## 🎯 Design Philosophy

- **Dark-first**: Optimized for dark mode with deep slate backgrounds
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradient accents**: Purple-to-indigo gradients for CTAs and highlights
- **Micro-interactions**: Smooth animations and hover effects
- **Accessibility**: High contrast, readable typography, semantic HTML

---

## 🎨 Color Palette

### Primary Colors
```
primary-50:  #eef2ff
primary-100: #e0e7ff
primary-200: #c7d2fe
primary-300: #a5b4fc
primary-400: #818cf8
primary-500: #6366f1 (Base)
primary-600: #4f46e5
primary-700: #4338ca
primary-800: #3730a3
primary-900: #312e81
```

### Accent Colors
```
accent-teal:   #14b8a6
accent-indigo: #6366f1
accent-purple: #8b5cf6
accent-blue:   #3b82f6
```

### Category Colors
```
GenAI:      #3b82f6 (Blue)
Agentic AI: #8b5cf6 (Purple)
HLD:        #14b8a6 (Teal)
DSA:        #f59e0b (Amber)
Revision:   #6366f1 (Indigo)
Project:    #10b981 (Green)
Break:      #64748b (Slate)
```

### Difficulty Colors
```
Easy:     #10b981 (Green)
Moderate: #f59e0b (Amber)
Hard:     #ef4444 (Red)
Flexible: #8b5cf6 (Purple)
```

### Dark Mode Backgrounds
```
dark-bg:    #0f172a (slate-900)
dark-card:  #1e293b (slate-800)
dark-hover: #334155 (slate-700)
```

---

## 🔤 Typography

### Font Family
```css
font-sans: Inter, SF Pro Display, system-ui, sans-serif
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800
- Black: 900

### Type Scale
```
text-xs:   0.75rem  (12px)
text-sm:   0.875rem (14px)
text-base: 1rem     (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem  (20px)
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)
text-5xl:  3rem     (48px)
```

---

## 🧩 Component Library

### 1. Cards
```jsx
// Glass card with hover effect
<Card hover onClick={handleClick}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Props:**
- `hover`: boolean - Enable hover animations
- `className`: string - Additional CSS classes
- `onClick`: function - Click handler

---

### 2. Progress Ring
```jsx
<ProgressRing 
  progress={75} 
  size={120} 
  strokeWidth={8}
  showLabel={true}
/>
```

**Props:**
- `progress`: number (0-100) - Progress percentage
- `size`: number - Diameter in pixels
- `strokeWidth`: number - Ring thickness
- `showLabel`: boolean - Show percentage label

---

### 3. Progress Bar
```jsx
<ProgressBar 
  progress={60} 
  height={8}
  showLabel={false}
  className="mb-4"
/>
```

**Props:**
- `progress`: number (0-100)
- `height`: number - Bar height in pixels
- `showLabel`: boolean - Show percentage
- `className`: string - Additional classes

---

### 4. Category Badge
```jsx
<CategoryBadge 
  category="GenAI" 
  showIcon={true}
  animate={true}
/>
```

**Supported Categories:**
- GenAI (🤖)
- Agentic AI (🧠)
- HLD (🏗️)
- DSA (💻)
- Revision (📝)
- Project (🚀)
- Break (☕)

---

### 5. Difficulty Badge
```jsx
<DifficultyBadge 
  difficulty="HARD" 
  showIcon={true}
  animate={true}
/>
```

**Supported Difficulties:**
- EASY (✓)
- MODERATE (◐)
- HARD (⚡)
- FLEXIBLE (~)

---

## 🎬 Animations

### Built-in Animations
```css
animate-fade-in     /* Fade in effect */
animate-slide-up    /* Slide up from bottom */
animate-slide-in    /* Slide in from right */
animate-scale-in    /* Scale up from center */
animate-glow        /* Pulsing glow effect */
animate-progress    /* Progress bar animation */
```

### Framer Motion Variants
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

---

## 🎨 Utility Classes

### Glassmorphism
```css
.glass           /* Basic glass effect */
.glass-card      /* Glass card with gradient background */
```

### Buttons
```css
.btn             /* Base button */
.btn-primary     /* Primary gradient button */
.btn-secondary   /* Secondary glass button */
```

### Badges
```css
.badge           /* Base badge */
.badge-genai     /* GenAI category */
.badge-agentic   /* Agentic AI category */
.badge-hld       /* HLD category */
.badge-dsa       /* DSA category */
.badge-easy      /* Easy difficulty */
.badge-moderate  /* Moderate difficulty */
.badge-hard      /* Hard difficulty */
```

### Hover Effects
```css
.card-hover      /* Card lift on hover */
```

### Text Gradients
```css
.text-gradient   /* Primary gradient text */
```

### Scrollbars
```css
.custom-scrollbar /* Styled scrollbar */
```

---

## 📐 Layout System

### Grid
```jsx
// 3-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Spacing Scale
```
0.5: 0.125rem (2px)
1:   0.25rem  (4px)
2:   0.5rem   (8px)
3:   0.75rem  (12px)
4:   1rem     (16px)
6:   1.5rem   (24px)
8:   2rem     (32px)
12:  3rem     (48px)
16:  4rem     (64px)
```

### Border Radius
```
rounded:    0.25rem (4px)
rounded-lg: 0.5rem  (8px)
rounded-xl: 1rem    (16px)
rounded-2xl: 1.5rem (24px)
rounded-3xl: 2rem   (32px)
rounded-full: 9999px
```

---

## 🎯 Page Templates

### Dashboard
- Hero section with gradient background
- Overall progress with ProgressRing
- Category breakdown with ProgressBars
- Month grid (3-4 columns)
- Quick stats cards

### Month View
- Breadcrumb navigation
- Month header with progress
- Week timeline (vertical list)
- Each week card shows:
  - Week name & dates
  - Difficulty badge
  - Category badges
  - Progress ring
  - Task count

### Week View
- Task grid with checkboxes
- Expandable task details
- Editable dates (inline inputs)
- Notes textarea
- Resource links

### Task Database
- Filter bar (search, month, category, status)
- Excel-like table
- Sortable columns
- Inline editing
- Expandable rows
- CSV export button

### Progress
- Overall progress ring
- Category breakdown charts
- Difficulty breakdown
- Month progress bars
- Performance summary

---

## 🚀 Best Practices

### Performance
- Use `useMemo` for expensive calculations
- Implement list virtualization for large tables
- Lazy load images and heavy components
- Use `React.memo` for pure components

### Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast text ratios

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly tap targets (min 44x44px)
- Horizontal scroll on mobile for tables

### Animation
- Keep animations under 300ms
- Use `ease-out` for entries
- Use `ease-in` for exits
- Respect `prefers-reduced-motion`

---

## 📦 Component Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Card.js              # Card components
│   │   ├── ProgressRing.js      # Circular progress
│   │   ├── ProgressBar.js       # Linear progress
│   │   ├── CategoryBadge.js     # Category badges
│   │   └── DifficultyBadge.js   # Difficulty badges
│   ├── Navigation.js            # Glassmorphic nav
│   └── SyncStatus.js            # Sync indicator
├── pages/
│   ├── Dashboard.js             # Main dashboard
│   ├── MonthView.js             # Month detail
│   ├── WeekView.js              # Week detail
│   ├── Progress.js              # Analytics
│   └── TaskDatabase.js          # Excel view
├── context/
│   └── TaskDatabaseContext.js   # Global state
├── data/
│   └── fullScheduleData.js      # Schedule data
└── index.css                    # Tailwind + custom styles
```

---

## 🎨 Figma Export Guide

### Colors
1. Export as CSS Variables
2. Map to Tailwind config
3. Test in dark mode

### Components
1. Export as React components
2. Add Framer Motion animations
3. Implement accessibility features

### Spacing
1. Use 8px grid system
2. Consistent padding/margins
3. Responsive breakpoints

---

## 📚 Resources

- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- Inter Font: https://fonts.google.com/specimen/Inter
- Figma: https://figma.com
- v0.dev: https://v0.dev

---

**Last Updated:** Dec 2, 2025
**Version:** 2.0.0
**Design System Owner:** AI Study Planner Team

