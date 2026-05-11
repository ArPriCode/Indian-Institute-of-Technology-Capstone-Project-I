<div align="center">

# 🎓 EduNexa
### Smart Skill-Based Online Tutoring Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-10.12-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

> **IIT Patna — Capstone Project I**
> A next-generation Web3-style glassmorphism learning platform connecting students with expert instructors through AI-powered matching, real-time progress tracking, and structured skill-based learning paths.

<br/>

---

## 🔗 Important Links

| | Link |
|---|---|
| 🌐 **Live Demo** | [https://indian-institute-of-technology-caps-sigma.vercel.app](https://indian-institute-of-technology-caps-sigma.vercel.app) |
| 📁 **GitHub Repo** | [https://github.com/ArPriCode/Indian-Institute-of-Technology-Capstone-Project-I](https://github.com/ArPriCode/Indian-Institute-of-Technology-Capstone-Project-I) |
| 📊 **Presentation (PPT)** | [View on Google Drive](https://drive.google.com/file/d/1wF_JCYK5EZoag7l-lwTFLcdrF1IkY7Vn/view) |

---

## 👨‍💻 Project Info

| Field | Details |
|-------|---------|
| **Student** | Arun Kumar Giri |
| **Roll No** | UA2504AIH48 |
| **Institution** | IIT Patna |
| **Program** | Hybrid Program in Full Stack Development |
| **Project** | Capstone Project I |
| **Submission Date** | 6 May, 2026 |
| **Instructor** | IIT Patna |

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Pages & Routes](#-pages--routes)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)

---

## 🌟 Overview

**EduNexa** is a full-stack skill-based online tutoring platform built as part of the **IIT Patna Capstone Project I**. The platform bridges the gap between learners seeking skill development and educators with domain expertise.

### 🎯 Problem Statement
Traditional learning systems lack:
- ❌ Personalization and adaptive learning
- ❌ Real-time performance tracking
- ❌ Structured skill-based learning paths
- ❌ Direct teacher-student connection
- ❌ Gamified engagement systems

### ✅ EduNexa Solution
- 🤖 Smart instructor-student matching
- 📊 Real-time XP, level & progress tracking
- 🎯 Structured skill-based learning paths
- 💬 Direct real-time messaging
- 🏆 Gamified learning with badges & leaderboard
- 📜 Auto-generated certificates on completion
- 🧠 Quiz system with instant scoring

---

## 🚀 Live Demo

**👉 [https://indian-institute-of-technology-caps-sigma.vercel.app](https://indian-institute-of-technology-caps-sigma.vercel.app)**

### Test Credentials
| Role | How to Login |
|------|-------------|
| Student | Click "Get Started" → Select Student → Google Login |
| Teacher | Click "Become a Teacher" → Select Teacher → Google Login |

---

## ✨ Features

### 👨‍🎓 Student Module

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Google, GitHub, Email/Password via Firebase Auth |
| 📊 **Dashboard** | XP points, level, streak counter, activity charts |
| 📚 **Course Catalog** | 8+ courses with search, category & level filters |
| 🎬 **Video Lessons** | YouTube-embedded course player with curriculum |
| 📈 **Progress Tracking** | Radar charts, bar charts, activity heatmap calendar |
| 🏆 **Achievements** | 12 badges, XP rewards, global leaderboard |
| 🧠 **Quiz System** | Per-course quizzes with instant scoring & XP rewards |
| 📜 **Certificates** | Auto-generated on 100% course completion |
| 💬 **Messaging** | Real-time chat with instructors |
| 👤 **Profile** | Skills, bio, social links, avatar management |
| ⚙️ **Settings** | Notifications, privacy, appearance toggles |

### 👨‍🏫 Teacher Module

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Student enrollment charts, recent activity |
| 📝 **Course Builder** | Section + lesson curriculum editor with YouTube embed |
| 📈 **Analytics** | Enrollment trends, completion rates, ratings charts |
| 👥 **Student Management** | Progress tracking, filtering, status monitoring |
| 💬 **Messaging** | Direct communication with students |
| 🎓 **Profile** | Qualifications, expertise areas, institution |
| ⚙️ **Settings** | Notification preferences |

### 🎨 Design System

| Element | Value |
|---------|-------|
| Background | Pure `#000000` Black |
| Cards | `rgba(30,30,45,0.95)` Dark Glass |
| Border | `rgba(255,255,255,0.1)` |
| Primary Gradient | `indigo-400 → purple-400 → pink-400` |
| Orbs | 8% opacity animated blobs |
| Font | Inter (system-ui fallback) |
| Style | Web3 Glassmorphism |

---

## 🛠️ Tech Stack

```
Frontend              Backend/DB            UI/UX
─────────             ──────────            ─────
Next.js 15.3.9        Firebase Auth         Tailwind CSS 3.4
React 18.3.1          Firestore DB          Framer Motion 11
TypeScript 5.4        Firebase Storage      Lucide Icons
                      Firestore Rules       Recharts 2.12
                                            React Hot Toast
```

### Full Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.3.9 | React Framework with App Router |
| `firebase` | 10.12.0 | Auth + Firestore + Storage |
| `framer-motion` | 11.2.10 | Page & component animations |
| `tailwindcss` | 3.4.1 | Utility-first CSS framework |
| `recharts` | 2.12.7 | Data visualization charts |
| `lucide-react` | 0.468.0 | Icon library |
| `react-hot-toast` | 2.4.1 | Toast notifications |
| `react-firebase-hooks` | 5.1.1 | Firebase React hooks |
| `clsx` + `tailwind-merge` | latest | Class name utilities |
| `autoprefixer` | 10.4.19 | CSS vendor prefixing |

---

## 📁 Project Structure

```
edunexa/
├── 📄 .env.local                         # Firebase config (gitignored)
├── 📄 .npmrc                             # legacy-peer-deps=true
├── 📄 next.config.js
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
│
└── src/
    ├── app/
    │   ├── 📄 layout.tsx                 # Root layout + providers
    │   ├── 📄 page.tsx                   # Landing page
    │   ├── 📄 globals.css                # Global styles + glassmorphism
    │   │
    │   ├── auth/
    │   │   ├── login/                    # Login (Google/GitHub/Email)
    │   │   ├── register/                 # Register as Student/Teacher
    │   │   └── reset-password/           # Password reset
    │   │
    │   ├── student/
    │   │   ├── dashboard/                # 📊 Student home
    │   │   ├── courses/                  # 📚 Course catalog
    │   │   │   └── [id]/                 # 🎬 Course detail + player
    │   │   ├── progress/                 # 📈 Learning analytics
    │   │   ├── achievements/             # 🏆 Badges + leaderboard
    │   │   ├── quiz/[courseId]/          # 🧠 Quiz system
    │   │   ├── certificate/[courseId]/   # 📜 Certificate generator
    │   │   ├── messages/                 # 💬 Chat with teachers
    │   │   ├── profile/                  # 👤 Student profile
    │   │   └── settings/                 # ⚙️ App settings
    │   │
    │   └── teacher/
    │       ├── dashboard/                # 📊 Teacher home
    │       ├── courses/                  # 📚 Course management
    │       ├── create-course/            # 📝 Course builder
    │       ├── analytics/                # 📈 Teaching analytics
    │       ├── students/                 # 👥 Student management
    │       ├── messages/                 # 💬 Chat with students
    │       ├── profile/                  # 🎓 Teacher profile
    │       └── settings/                 # ⚙️ App settings
    │
    ├── components/
    │   ├── 📄 Sidebar.tsx                # Role-aware navigation
    │   ├── 📄 DashboardLayout.tsx        # Auth-protected layout
    │   └── 📄 NotificationBell.tsx       # Real-time notifications
    │
    └── lib/
        ├── 📄 firebase.ts                # Firebase initialization
        ├── 📄 auth-context.tsx           # Auth state management
        ├── 📄 firestore-helpers.ts       # DB helper functions
        ├── 📄 courses-data.ts            # Course catalog data
        └── 📄 utils.ts                   # XP/Level/format helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Firebase account (free Spark plan)

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

Open **[http://localhost:3000](http://localhost:3000)**

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔥 Firebase Setup

### Step 1 — Create Project
[console.firebase.google.com](https://console.firebase.google.com) → Create project → `edunexa`

### Step 2 — Enable Authentication
`Build → Authentication → Get started`
- ✅ Email/Password
- ✅ Google
- ✅ GitHub (optional)

### Step 3 — Create Firestore Database
`Build → Firestore Database → Create database`
- Mode: **Test mode**
- Location: **asia-south1** (Mumbai)

### Step 4 — Firestore Security Rules
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

### Step 5 — Firestore Collections Schema

```
users/
  └── {uid}/
        ├── displayName, email, photoURL
        ├── role: "student" | "teacher"
        ├── xp, level, streak
        ├── enrolledCourses[], skills[]
        └── createdAt

enrollments/
  └── {uid_courseId}/
        ├── uid, courseId, progress
        ├── completedLessons[]
        └── enrolledAt

chats/
  └── {chatId}/
        └── messages/
              ├── from, to, text
              └── createdAt

notifications/
  └── {notifId}/
        ├── uid, title, message
        ├── type, read
        └── createdAt

quizResults/
  └── {resultId}/
        ├── uid, courseId, score
        ├── total, percentage
        └── submittedAt
```

---

## 🗺️ Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page with hero & features | Public |
| `/auth/login` | Login with Google/GitHub/Email | Public |
| `/auth/register` | Register as Student or Teacher | Public |
| `/auth/reset-password` | Password reset via email | Public |
| `/student/dashboard` | Student home with stats & charts | Student |
| `/student/courses` | Browse & enroll in courses | Student |
| `/student/courses/[id]` | Course player + curriculum | Student |
| `/student/progress` | Learning analytics & charts | Student |
| `/student/achievements` | Badges & global leaderboard | Student |
| `/student/quiz/[courseId]` | Course quiz with scoring | Student |
| `/student/certificate/[courseId]` | Certificate generator | Student |
| `/student/messages` | Chat with teachers | Student |
| `/student/profile` | Edit profile + skills | Student |
| `/student/settings` | Notifications + privacy | Student |
| `/teacher/dashboard` | Teacher overview & charts | Teacher |
| `/teacher/create-course` | Build new course | Teacher |
| `/teacher/courses` | Manage published courses | Teacher |
| `/teacher/analytics` | Performance analytics | Teacher |
| `/teacher/students` | Student management table | Teacher |
| `/teacher/messages` | Chat with students | Teacher |
| `/teacher/profile` | Teacher profile | Teacher |
| `/teacher/settings` | Teacher settings | Teacher |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT BROWSER                     │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │           Next.js 15 App Router              │    │
│  │                                              │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │  Student  │  │ Teacher  │  │   Auth   │  │    │
│  │  │  Module   │  │  Module  │  │  Pages   │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  │    │
│  │                                              │    │
│  │  ┌──────────────────────────────────────┐   │    │
│  │  │     React Components + Tailwind CSS   │   │    │
│  │  └──────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  FIREBASE BACKEND                    │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │  Firebase    │  │  Firestore   │  │ Firebase │  │
│  │    Auth      │  │   Database   │  │ Storage  │  │
│  │              │  │              │  │          │  │
│  │ • Google     │  │ • users      │  │ • Avatars│  │
│  │ • GitHub     │  │ • enrollments│  │ • Thumbs │  │
│  │ • Email/Pass │  │ • chats      │  │          │  │
│  └──────────────┘  │ • notifs     │  └──────────┘  │
│                    │ • quizResults│                  │
│                    └──────────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

```
User Opens App
      │
      ▼
Firebase Auth Check
      │
   ┌──┴──┐
   │     │
Not    Logged In
Logged     │
In         ▼
│    Fetch Firestore Profile
│          │
▼          ▼
Login   Role Check
Page    │        │
      Student  Teacher
        │        │
        ▼        ▼
    Student   Teacher
    Dashboard Dashboard
        │        │
        ▼        ▼
    Real-time Firestore Updates
    (XP, Progress, Messages, Notifications)
```

---

## 🎮 Gamification System

```
Lesson Complete  → +50 XP
Quiz Perfect     → +200 XP
Quiz Partial     → +XP proportional to score
Badge Earned     → +50 to +2000 XP
Course Complete  → Certificate unlocked

XP Formula:
Level = floor(XP / 500) + 1
Progress % = ((XP - (level-1)*500) / 500) * 100
```

---

## 📄 License

This project is part of **IIT Patna Capstone Project I** academic curriculum.

---

<div align="center">

**Built with 🖤 by Arun Kumar Giri**

*Roll No: UA2504AIH48 | IIT Patna | Capstone Project I | May 2026*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-6366f1?style=for-the-badge)](https://indian-institute-of-technology-caps-sigma.vercel.app)
[![PPT](https://img.shields.io/badge/📊_Presentation-Google_Drive-ea4335?style=for-the-badge)](https://drive.google.com/file/d/1wF_JCYK5EZoag7l-lwTFLcdrF1IkY7Vn/view)
[![Repo](https://img.shields.io/badge/📁_GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ArPriCode/Indian-Institute-of-Technology-Capstone-Project-I)

</div>
