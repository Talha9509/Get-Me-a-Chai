# ☕ GetMeaChai! — Crowdfunding Platform for Creators

GetMeaChai is a modern crowdfunding platform where creators can receive support in the form of small payments ("buy me a chai ☕") from fans and followers. It supports multi-user profiles, secure payment via Razorpay, and login via Google, GitHub, and Facebook.

---

## 🌟 Features

### 🔐 Authentication
- OAuth login with:
  - ✅ Google
  - ✅ Facebook
  - ✅ GitHub
- Powered by **NextAuth.js**
- Automatic user creation in MongoDB on first login

### 👤 Creator Profiles
- Unique profile for each creator at `/username`
- Editable username, name, bio, cover photo, profile picture
- Displays:
  - Number of payments
  - Total amount raised
  - Leaderboard of supporters with messages

### 💸 Razorpay Integration
- Accept payments via **Razorpay**
- Razorpay **Order Creation**, **Checkout**, **Signature Validation**
- Supports test and live Razorpay keys
- Donors can choose custom amount, name, and message
- Razorpay callback (`/api/razorpay`) verifies and updates DB

### 🔁 Real-Time Updates
- After successful payment, users are redirected to `?paymentdone=true`
- Toast notification confirms success
- New payment shows immediately on the supporter list

### 👥 Multi-User Support
- Every user has their own dashboard and Razorpay credentials
- Payments go to the correct user based on `username`

### 🛡️ Secure & Modern Stack
- MongoDB for data storage
- Server components + client hydration (Next.js 13+)
- Environment variables for all sensitive credentials

---

## 🛠️ Tech Stack

| Layer        | Tech             |
|--------------|------------------|
| Frontend     | React + Next.js  |
| Backend      | Next.js API Routes |
| Auth         | NextAuth.js      |
| Database     | MongoDB + Mongoose |
| Payments     | Razorpay         |
| Styling      | Tailwind CSS     |
| Deployment   | Vercel / Node.js |

---

## 🧠 How It Works

1. User signs in with Google, Facebook, or GitHub
2. A MongoDB user is created if not already there
3. The user enters their Razorpay Key/Secret in the backend
4. Supporters visit `/username`, enter details, and donate
5. Razorpay processes payment and redirects to `/api/razorpay`
6. Signature is verified → payment saved → `done: true`
7. Supporter list updates in real-time

---

## ⚙️ Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/getmeachai.git
cd getmeachai
```

### 2. Install dependencies
```
npm install
```
### 3. Configure environment variables

```
MONGODB_URI=your_mongodb_uri

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

FACEBOOK_ID=your_facebook_app_id
FACEBOOK_SECRET=your_facebook_app_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
Note: Each user can store their own Razorpay credentials in the database for payment routing.

🚀 Run the App Locally
bash
Copy
Edit
npm run dev
Visit http://localhost:3000