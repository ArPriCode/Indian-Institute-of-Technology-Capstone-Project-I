<div align="center">

# 🎓 EduNexa
### Smart Skill-Based Online Tutoring Platform

<img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-10.12-orange?style=for-the-badge&logo=firebase&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-11.2-purple?style=for-the-badge&logo=framer&logoColor=white" />

<br/>

> **IIT Patna — Capstone Project I**
> A next-generation Web3-style glassmorphism learning platform connecting students with expert instructors through AI-powered matching, real-time progress tracking, and structured skill-based learning paths.

<br/>

![EduNexa Banner](https://img.shields.io/badge/🖤_Pure_Black_Glassmorphism_UI-EduNexa-6366f1?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Pages & Routes](#-pages--routes)
- [Screenshots](#-screenshots)
- [Team](#-team)

---

## 🌟 Overview

**EduNexa** is a full-stack skill-based online tutoring platform built as part of the **IIT Patna Capstone Project I**. The platform bridges the gap between learners seeking skill development and educators with domain expertise.

### 🎯 Problem Statement
Traditional learning systems lack:
- ❌ Personalization
- ❌ Real-time performance tracking
- ❌ Structured skill-based paths
- ❌ Direct teacher-student connection

### ✅ EduNexa Solution
- 🤖 AI-powered instructor matching
- 📊 Real-time XP & progress tracking
- 🎯 Structured learning paths
- 💬 Direct messaging between students & teachers
- 🏆 Gamified learning with badges & leaderboard

---

## ✨ Features

### 👨‍🎓 Student Module

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Google, GitHub, Email/Password via Firebase |
| 📊 **Dashboard** | XP points, level, streak, activity charts |
| 📚 **Course Catalog** | 850+ courses with search & filters |
| 🎬 **Video Lessons** | YouTube-embedded course player |
| 📈 **Progress Tracking** | Radar charts, bar charts, activity calendar |
| 🏆 **Achievements** | Badges, XP rewards, global leaderboard |
| 💬 **Messaging** | Real-time chat with instructors |
| 👤 **Profile** | Skills, bio, social links management |

### 👨‍🏫 Teacher Module

| Feature | Description |
|---------|-------------|
| 📝 **Course Builder** | Drag-and-drop curriculum editor |
| 📊 **Analytics** | Enrollment trends, completion rates, ratings |
| 👥 **Student Management** | Progress tracking, filtering, messaging |
| 💬 **Messaging** | Direct communication with students |
| 🎓 **Profile** | Qualifications, expertise, institution |
| 📈 **Performance** | Revenue charts, student growth metrics |

### 🎨 Design System

- 🖤 **Pure Black** background (`#000000`)
- 🔮 **Glassmorphism** cards with backdrop blur
- ✨ **Animated orbs** (subtle 8% opacity)
- � **Gradient text** (indigo → purple → pink)
- 📱 **Fully responsive** design
- ⚡ **Framer Motion** animations throughout

---

## 🛠️ Tech Stack

```
Frontend          Backend/DB        UI/UX
─────────         ──────────        ─────
Next.js 14        Firebase Auth     Tailwind CSS
React 18          Firestore DB      Framer Motion
TypeScript 5      Firebase Storage  Lucide Icons
                                    Recharts
                                    React Hot Toast
```

### Full Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.3 | React Framework |
| `firebase` | 10.12.0 | Auth + Database |
| `framer-motion` | 11.2.10 | Animations |
| `tailwindcss` | 3.4.1 | Styling |
| `recharts` | 2.12.7 | Data Charts |
| `lucide-react` | 0.379.0 | Icons |
| `react-hot-toast` | 2.4.1 | Notifications |
| `react-firebase-hooks` | 5.1.1 | Firebase Hooks |
| `clsx` + `tailwind-merge` | latest | Class Utils |

---

## 📁 Project Structure

```
edunexa/
├── 📄 .env.local                    # Firebase config (gitignored)
├── 📄 next.config.js
├── 📄 tailwind.config.ts
├── � tsconfig.json
│
└── src/
    ├── app/
    │   ├── 📄 layout.tsx            # Root layout + providers
    │   ├── 📄 page.tsx              # Landing page
    │   │
    │   ├── auth/
    │   │   ├── login/               # Login page
    │   │   ├── register/            # Registration page
    │   │   └── reset-password/      # Password reset
    │   │
    │   ├── student/
    │   │   ├── dashboard/           # 📊 Student home
    │   │   ├── courses/             # 📚 Course catalog
    │   │   │   └── [id]/            # 🎬 Course detail + player
    │   │   ├── progress/            # 📈 Learning analytics
    │   │   ├── achievements/        # 🏆 Badges + leaderboard
    │   │   ├── messages/            # 💬 Chat with teachers
    │   │   ├── profile/             # 👤 Student profile
    │   │   └── settings/            # ⚙️ App settings
    │   │
    │   └── teacher/
    │       ├── dashboard/           # 📊 Teacher home
    │       ├── courses/             # 📚 Course management
    │       ├── create-course/       # 📝 Course builder
    │       ├── analytics/           # 📈 Teaching analytics
    │       ├── students/            # 👥 Student management
    │       ├── messages/            # 💬 Chat with students
    │       ├── profile/             # 🎓 Teacher profile
    │       └── settings/            # ⚙️ App settings
    │
    ├── components/
    │   ├── 📄 Sidebar.tsx           # Navigation sidebar
    │   └── 📄 DashboardLayout.tsx   # Auth-protected layout
    │
    └── lib/
        ├── 📄 firebase.ts           # Firebase initialization
        ├── 📄 auth-context.tsx      # Auth state management
        ├── 📄 courses-data.ts       # Course catalog (8 courses)
        └── 📄 utils.ts              # XP/Level helpers
```

---

## � Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (free)

### 1. Clone the Repository

```bash
git clone https://github.com/ArPriCode/Indian-Institute-of-Technology-Capstone-Project-I.git
cd Indian-Institute-of-Technology-Capstone-Project-I/edunexa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create `.env.local` in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** 🚀

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔥 Firebase Setup

### Step 1 — Create Project
Go to [console.firebase.google.com](https://console.firebase.google.com) → Create project → `edunexa`

### Step 2 — Enable Authentication
`Build → Authentication → Get started`
- ✅ Email/Password
- ✅ Google
- ✅ GitHub (optional)

### Step 3 — Create Firestore Database
`Build → Firestore Database → Create database`
- Mode: **Test mode**
- Location: **asia-south1** (Mumbai)

### Step 4 — Firestore Rules
`Firestore → Rules tab` → Paste:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
→ Click **Publish**

### Step 5 — Get Config
`⚙️ Project Settings → Your apps → Config` → Copy to `.env.local`

---

## �️ Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/auth/login` | Login (Google/GitHub/Email) | Public |
| `/auth/register` | Register as Student/Teacher | Public |
| `/auth/reset-password` | Password reset | Public |
| `/student/dashboard` | Student home with stats | Student |
| `/student/courses` | Browse 850+ courses | Student |
| `/student/courses/[id]` | Course player + curriculum | Student |
| `/student/progress` | Learning analytics | Student |
| `/student/achievements` | Badges + leaderboard | Student |
| `/student/messages` | Chat with teachers | Student |
| `/student/profile` | Edit profile + skills | Student |
| `/student/settings` | Notifications + privacy | Student |
| `/teacher/dashboard` | Teacher overview | Teacher |
| `/teacher/create-course` | Build new course | Teacher |
| `/teacher/courses` | Manage courses | Teacher |
| `/teacher/analytics` | Performance charts | Teacher |
| `/teacher/students` | Student management | Teacher |
| `/teacher/messages` | Chat with students | Teacher |
| `/teacher/profile` | Teacher profile | Teacher |
| `/teacher/settings` | Teacher settings | Teacher |

---

## 🎨 Design Highlights

```
Background:  Pure #000000 Black
Cards:       rgba(10,10,10,0.8) + backdrop-blur-xl
Border:      rgba(255,255,255,0.08)
Gradient:    indigo-400 → purple-400 → pink-400
Orbs:        8% opacity animated blobs
Font:        Inter (system-ui fallback)
```

---

## 📊 Data Flow

```
User Login (Firebase Auth)
        ↓
Create/Fetch Profile (Firestore)
        ↓
Role Check (student / teacher)
        ↓
Redirect to Dashboard
        ↓
Real-time Data Updates (Firestore)
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│           Next.js 14 App            │
│         (App Router + RSC)          │
├──────────────┬──────────────────────┤
│  Auth Layer  │    UI Components     │
│  (Firebase)  │  (Tailwind + Framer) │
├──────────────┼──────────────────────┤
│  Firestore   │    Static Data       │
│  (User Data) │  (Course Catalog)    │
└──────────────┴──────────────────────┘
```

---

## 👨‍💻 Team

| Name | Role | Institute |
|------|------|-----------|
| **Arun Kumar Giri** | Full Stack Developer | IIT Patna |

**Capstone Project I — IIT Patna**
*Hybrid Program in Full Stack Development*

---

## 📄 License

This project is part of **IIT Patna Capstone Project I** academic curriculum.

---

<div align="center">

**Built with 🖤 by Arun Kumar Giri**

*IIT Patna Capstone Project I — 2026*

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-orange?style=flat&logo=firebase)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript)](https://typescriptlang.org)

</div>
