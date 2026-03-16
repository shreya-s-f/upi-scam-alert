# 🛡️ UPI Guard — Scam Alert App

> Community-powered UPI fraud protection for every Indian.
> Check any UPI ID or phone number against reported scams — **free, instant, no login needed.**

![React](https://img.shields.io/badge/React-18-blue)
![Firebase](https://img.shields.io/badge/Firebase-10-orange)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## 🚀 Live Demo
> **[your-app.vercel.app](https://your-app.vercel.app)**  ← replace after deployment

---

## 💡 Problem Solved
India loses **₹7,000+ crore** to UPI fraud every year. Scammers use fake
UPI IDs and phone numbers to steal money from millions of people. There is
no free, simple, community-powered tool for regular people to check a UPI
ID before paying. This app solves that.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Check any UPI ID / Phone** | Instant risk score from community database |
| 🚨 **Report Scams** | Submit in 30 seconds, no login needed |
| 📰 **Community Feed** | See latest reported scams with filter by type |
| 🛡️ **Risk Levels** | Safe / Suspicious / High Risk based on report count |
| 📱 **Mobile Responsive** | Works perfectly on any device |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite 5
- **Routing:** React Router v6
- **Database:** Firebase Firestore
- **Styling:** CSS Modules (no extra libraries)
- **Deployment:** Vercel

---

## 📂 Folder Structure

```
upi-scam-alert/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Navbar.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── RiskBadge.jsx       # Safe/Warning/Danger badge
│   │   └── RiskBadge.module.css
│   ├── firebase/
│   │   └── config.js           # Firebase project config (YOU FILL THIS)
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Check.jsx           # Search + result page
│   │   ├── Report.jsx          # Submit report form
│   │   └── Feed.jsx            # Community reports feed
│   ├── utils/
│   │   └── firebaseHelpers.js  # All Firestore functions
│   ├── App.jsx                 # Routes
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + variables
├── firestore.rules             # Database security rules
├── firestore.indexes.json      # Composite indexes
├── vercel.json                 # SPA routing for Vercel
├── vite.config.js
└── package.json
```

---

## ⚙️ Setup — Step by Step

### Step 1 — Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/upi-scam-alert.git
cd upi-scam-alert
npm install
```

---

### Step 2 — Create a Firebase Project

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**
2. Click **"Add project"** → name it `upi-scam-alert` → click through
3. On the dashboard, click **"Web" icon (</>)** to register a web app
4. Name it `upi-guard` → click **"Register App"**
5. **Copy the `firebaseConfig` object** shown on screen

---

### Step 3 — Add Firebase Config

Open `src/firebase/config.js` and paste YOUR config:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId:             "1:123...",
};
```

---

### Step 4 — Set Up Firestore Database

1. In Firebase Console → **Firestore Database** → **Create database**
2. Choose **"Start in test mode"** (we'll add rules next) → pick a region → Done
3. Go to **Rules tab** → paste the contents of `firestore.rules` → **Publish**
4. Go to **Indexes tab** → paste the contents of `firestore.indexes.json`
   (or let Firebase auto-create them when you first run a query)

---

### Step 5 — Run Locally

```bash
npm run dev
```

Open **http://localhost:5173** — your app is running! 🎉

---

### Step 6 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: UPI Scam Alert App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/upi-scam-alert.git
git push -u origin main
```

---

### Step 7 — Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New Project"** → Import your `upi-scam-alert` repo
3. Framework preset: **Vite** (auto-detected)
4. Click **Deploy** — done in ~60 seconds ✅

Your app is now live at `https://upi-scam-alert.vercel.app` 🚀

---

## 🔒 Security Notes

- UPI IDs in the Feed are **partially masked** (e.g. `scam***er@paytm`)
- Reports are **immutable** — nobody can edit or delete them (Firestore rules)
- No user authentication required — lower friction = more reports
- No IP addresses or personal data stored

---

## 📈 Resume Talking Points

- "Built a community-powered fraud detection platform with **X reports submitted**"
- "Serves **Y monthly users** protecting them from UPI scams"
- "Full-stack app: React frontend, Firebase Firestore, deployed on Vercel"
- "Designed Firestore security rules to prevent data tampering"

---

## 🗺️ Future Ideas (v2)

- [ ] SMS/WhatsApp alert when someone searches a flagged ID
- [ ] Admin dashboard to moderate false reports
- [ ] Login to upvote/confirm existing reports
- [ ] Share report as an image (for WhatsApp forwarding)
- [ ] ML-based risk scoring

---

## 🤝 Contributing

Pull requests welcome. Open an issue first to discuss.

---

## 📄 License

MIT — free to use, fork, and build on.

---

*Built with ❤️ to protect people. Not affiliated with NPCI, any bank, or government body.*
