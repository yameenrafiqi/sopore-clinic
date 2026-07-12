# Dr. Majid's Advanced Physiotherapy Clinic — Full-Stack Platform

A complete, production-ready medical website and management platform for **Dr. Majid's Advanced Physiotherapy Clinic**, Sopore, Jammu & Kashmir, India.

---

## ✨ Features

### Frontend (Patient-Facing)
| Feature | Details |
|---|---|
| **Hero Section** | Immersive React Three Fiber 3D scene with DNA helix, particles, and floating shapes |
| **GSAP Animations** | ScrollTrigger-powered scroll animations with stagger effects |
| **Framer Motion** | Page transitions, micro-interactions, and smooth component animations |
| **Treatments** | Searchable and filterable treatment explorer with expandable cards |
| **Facilities** | Interactive modal cards for all clinic equipment |
| **Photo Gallery** | Masonry layout with lightbox, zoom, and category filtering |
| **Patient Reviews** | Review carousel with star ratings and verified badges |
| **Appointment Booking** | 3-step form with date picker, time slots, and WhatsApp fallback |
| **AI Chatbot** | OpenAI GPT-powered assistant with rule-based local fallback |
| **Dark Mode** | System-aware, toggleable dark mode via `next-themes` |
| **Custom Cursor** | Animated dot + ring cursor for desktop |
| **SEO Optimised** | OpenGraph metadata, JSON-LD `MedicalBusiness` schema, semantic HTML |
| **Announcement Banner** | Auto-rotating, dismissible top banner (fetched from API) |
| **WhatsApp Button** | Floating bottom-right widget with pre-filled message |
| **Responsive** | Mobile-first, tested at all common breakpoints |

### Admin Panel (`/admin`)
| Feature | Details |
|---|---|
| **JWT Authentication** | Secure login, session stored in `localStorage` |
| **Dashboard** | Stats overview (bookings today/week, reviews, gallery count) |
| **Bookings** | View all, filter by status, confirm / reject / complete each booking |
| **Reviews** | Publish, hide, delete patient reviews |
| **Announcements** | Create expiring or permanent banners with priority ordering |
| **Gallery** | Upload via Cloudinary, categorise, feature, delete images |

### Patient Portal (`/dashboard`)
| Feature | Details |
|---|---|
| **Login by phone** | Passwordless — log in with registered phone number |
| **My Appointments** | View all bookings with live status indicators |
| **Recovery Progress** | Visual progress bar based on treatment milestones |
| **Exercise Library** | Curated home exercises per treatment type |

### Backend REST API
| Resource | Public Endpoints | Admin Endpoints |
|---|---|---|
| Auth | `POST /login`, `POST /register` | – |
| Bookings | `POST /` (create) | `GET, PATCH status, DELETE` |
| Reviews | `GET /`, `POST /` | `PATCH, DELETE` |
| Announcements | `GET /` (active only) | `GET /all`, `POST`, `PATCH`, `DELETE` |
| Gallery | `GET /` | `POST /upload`, `PATCH`, `DELETE` |
| Treatments | `GET /`, `GET /:slug` | `POST`, `PATCH`, `DELETE` |

---

## 🗂 Project Structure

```
Dr. Majids Clinic/
├── frontend/                   # Next.js 14 App Router
│   ├── app/
│   │   ├── layout.tsx          # Root layout, SEO schema, ThemeProvider
│   │   ├── page.tsx            # Homepage (all sections composed here)
│   │   ├── globals.css         # CSS custom properties, utilities, animations
│   │   ├── admin/page.tsx      # Admin dashboard (protected)
│   │   ├── dashboard/page.tsx  # Patient portal (protected)
│   │   └── booking/page.tsx    # Standalone booking page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ThreeScene.tsx      # React Three Fiber 3D hero background
│   │   ├── Statistics.tsx
│   │   ├── About.tsx
│   │   ├── Facilities.tsx
│   │   ├── Treatments.tsx
│   │   ├── Gallery.tsx
│   │   ├── Reviews.tsx
│   │   ├── Booking.tsx
│   │   ├── Footer.tsx
│   │   ├── AIChat.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── AnnouncementBanner.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── ScrollToTop.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── lib/
│   │   └── api.ts              # Axios instance with JWT interceptors
│   ├── public/
│   │   └── (static assets — add doctor photo, clinic images here)
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── tsconfig.json
│   └── .env.local.example
│
└── backend/                    # Node.js + Express REST API
    ├── src/
    │   ├── index.js            # Server entry point
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Booking.js
    │   │   ├── Review.js
    │   │   ├── Announcement.js
    │   │   ├── Gallery.js
    │   │   └── Treatment.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── bookingController.js
    │   │   ├── reviewController.js
    │   │   ├── announcementController.js
    │   │   ├── galleryController.js
    │   │   └── treatmentController.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── bookings.js
    │   │   ├── reviews.js
    │   │   ├── announcements.js
    │   │   ├── gallery.js
    │   │   └── treatments.js
    │   ├── middleware/
    │   │   ├── auth.js         # JWT protect + adminOnly guards
    │   │   └── upload.js       # Multer + Cloudinary storage
    │   └── utils/
    │       └── email.js        # Nodemailer email templates
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or later
- **npm** v9 or later
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works)
- **Cloudinary** account (free tier) — for image uploads
- **Gmail** account (or SMTP provider) — for email notifications

---

### 1. Clone the repository

```bash
git clone <your-repo-url> "Dr. Majids Clinic"
cd "Dr. Majids Clinic"
```

---

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:

```ini
# Backend API URL (adjust port if changed)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Optional: OpenAI key for AI chatbot
NEXT_PUBLIC_OPENAI_KEY=sk-...your-key...

# Site URL (for OpenGraph)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
# App runs at http://localhost:3000
```

---

### 3. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```ini
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/dr-majid-clinic
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dr-majid-clinic

# JWT
JWT_SECRET=replace-with-a-random-256-bit-secret
JWT_EXPIRES_IN=7d

# Default admin credentials (auto-created on first run)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@12345
ADMIN_EMAIL=majidkirmani@gmail.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password   # Gmail App Password (not account password)

# Admin notification email
ADMIN_EMAIL=drmajid@example.com
ADMIN_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
# API server runs at http://localhost:5000
```

> **First run:** The server automatically creates a default admin user with the credentials set in `.env`. Change the password immediately after first login.

---

## 🔐 Authentication

### Admin Panel
1. Visit [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with:
   - **Username:** `admin` (or value of `ADMIN_USERNAME` in `.env`)
   - **Password:** `Admin@12345` (or value of `ADMIN_PASSWORD` in `.env`)
3. Change the password via MongoDB Compass or by updating the env and restarting.

### Patient Portal
1. A patient account is created automatically when a booking is confirmed with an email address.
2. Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
3. Login with the phone number used when booking.

---

## 🌐 Environment Variables Reference

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL |
| `NEXT_PUBLIC_OPENAI_KEY` | Optional | OpenAI API key for AI chatbot |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL for SEO |

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Strong random secret (min 32 chars) |
| `JWT_EXPIRES_IN` | Optional | Token lifespan, default `7d` |
| `ADMIN_USERNAME` | ✅ | Default admin username |
| `ADMIN_PASSWORD` | ✅ | Default admin password |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `EMAIL_HOST` | Optional | SMTP host, default `smtp.gmail.com` |
| `EMAIL_PORT` | Optional | SMTP port, default `587` |
| `EMAIL_USER` | Optional | SMTP username |
| `EMAIL_PASS` | Optional | SMTP password / app password |
| `ADMIN_EMAIL` | Optional | Admin notification recipient |

---

## 📦 Tech Stack

### Frontend
| Library | Version | Purpose |
|---|---|---|
| Next.js | 14.x | React framework, App Router, SSR/SSG |
| TypeScript | 5.x | Type safety |
| TailwindCSS | 3.x | Styling |
| Framer Motion | 11.x | UI animations and transitions |
| GSAP + ScrollTrigger | 3.12.x | Scroll-driven animations |
| Three.js | 0.160.x | 3D rendering |
| @react-three/fiber | 8.x | React bindings for Three.js |
| @react-three/drei | 9.x | Three.js helpers |
| Axios | 1.x | HTTP client |
| React Hook Form | 7.x | Form management |
| next-themes | 0.x | Dark mode |
| Lucide React | 0.x | Icons |

### Backend
| Library | Version | Purpose |
|---|---|---|
| Express.js | 4.x | Web framework |
| Mongoose | 8.x | MongoDB ODM |
| jsonwebtoken | 9.x | JWT authentication |
| bcryptjs | 2.x | Password hashing |
| Nodemailer | 6.x | Email sending |
| Multer | 1.x | File upload middleware |
| multer-storage-cloudinary | 4.x | Cloudinary upload storage |
| Cloudinary | 2.x | Cloud image storage |
| Helmet | 7.x | Security HTTP headers |
| express-rate-limit | 7.x | Rate limiting |
| CORS | 2.x | Cross-Origin Resource Sharing |
| morgan | 1.x | HTTP request logging |

---

## 🚢 Deployment

### Frontend — Vercel (Recommended)

1. Push the `frontend/` folder to a GitHub repository.
2. Import the project at [vercel.com](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Add environment variables in the Vercel dashboard.
5. Deploy — Vercel handles builds automatically on every push.

### Backend — Railway / Render / VPS

#### Railway
1. Create a new project at [railway.app](https://railway.app).
2. Connect your GitHub repository.
3. Set **Root Directory** to `backend`.
4. Add all `.env` variables in the Railway dashboard.
5. Railway auto-deploys on push.

#### Render
1. Create a **Web Service** at [render.com](https://render.com).
2. Set **Root Directory** to `backend` and **Build Command** to `npm install`.
3. Set **Start Command** to `npm start`.
4. Add environment variables.

#### Self-Hosted (Ubuntu/VPS)
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and install
git clone <repo> app && cd app/backend && npm install --production

# Install PM2 process manager
npm install -g pm2

# Start with PM2
pm2 start src/index.js --name "dr-majid-api"
pm2 startup
pm2 save

# Nginx reverse proxy (optional but recommended)
# proxy_pass http://localhost:5000;
```

### MongoDB Atlas (Free Cloud DB)
1. Create an account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster.
3. Create a database user and whitelist your server IP.
4. Copy the connection string and set it as `MONGODB_URI` in your `.env`.

### 🌐 Connecting Your GoDaddy Domain (drmajidphysio.co.in)

The public website (Hero, About, Reviews, Gallery) is static and works with just the **frontend** deployed — so you can get the domain live first and add the backend later. Do this **after** the frontend is on Vercel.

**Step 1 — Add the domain in Vercel**
- Open your project → **Settings → Domains → Add Domain**.
- Enter `drmajidphysio.co.in`. When prompted, also add `www.drmajidphysio.co.in`.
- Vercel then shows the **exact DNS records** to create — always use those values (the `www` CNAME is unique per project).

**Step 2 — Set the DNS records in GoDaddy**
- GoDaddy → **My Products → your domain → DNS → Manage DNS**.
- Remove any GoDaddy "parked" `A`/`CNAME` records on `@` and `www`, then add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` *(or the IP Vercel shows)* | 600 |
| `CNAME` | `www` | the `xxxxxxxx.vercel-dns-###.com` value shown in Vercel | 600 |

> ⚠️ The Vercel dashboard is the source of truth — copy the values it displays exactly.
> Alternative: you can instead set GoDaddy's **nameservers** to Vercel's, but the A + CNAME method above keeps DNS (and any email) in GoDaddy.

**Step 3 — Wait for propagation**
- Usually 10–60 minutes. Vercel auto-issues a free SSL certificate once the records resolve, and the domain flips to **"Valid Configuration."**

**Step 4 — (For bookings/admin) wire the frontend to the live backend**
- Deploy the backend (Railway/Render — see above) and point `MONGODB_URI` at MongoDB Atlas.
- In Vercel → **Settings → Environment Variables**, set `NEXT_PUBLIC_BACKEND_URL = https://<your-backend-host>/api`, then redeploy.
- On the backend host, set `FRONTEND_URL = https://drmajidphysio.co.in`.
- CORS is already configured for `drmajidphysio.co.in` and `www.drmajidphysio.co.in` in `backend/src/index.js`.

---

## 📸 Adding Real Photos

1. Add the doctor's photo to `frontend/public/doctor.jpg`.
2. Add clinic/facility photos via the **Admin Panel → Gallery**.
3. Update the `About` component to reference `/doctor.jpg`.

---

## 🔍 API Reference

Base URL: `http://localhost:5000/api`

```
POST   /auth/admin/login          — Admin login
POST   /auth/patient/login        — Patient login
POST   /auth/patient/register     — Register patient
GET    /auth/me                   — Get logged-in user (🔒)

POST   /bookings                  — Create booking (public)
GET    /bookings                  — List all bookings (🔒 admin)
GET    /bookings/stats            — Booking statistics (🔒 admin)
GET    /bookings/:id              — Get booking by ID (🔒 admin)
PATCH  /bookings/:id/status       — Update status (🔒 admin)
DELETE /bookings/:id              — Delete booking (🔒 admin)
GET    /bookings/patient/:phone   — Patient's bookings (🔒 patient|admin)

GET    /reviews                   — List published reviews (public)
POST   /reviews                   — Submit review (public)
PATCH  /reviews/:id               — Update review (🔒 admin)
DELETE /reviews/:id               — Delete review (🔒 admin)

GET    /announcements             — Active announcements (public)
GET    /announcements/all         — All announcements (🔒 admin)
POST   /announcements             — Create announcement (🔒 admin)
PATCH  /announcements/:id         — Update announcement (🔒 admin)
DELETE /announcements/:id         — Delete announcement (🔒 admin)

GET    /gallery                   — List gallery images (public)
POST   /gallery/upload            — Upload image (🔒 admin, multipart)
PATCH  /gallery/:id               — Update image metadata (🔒 admin)
DELETE /gallery/:id               — Delete image (🔒 admin)

GET    /treatments                — List treatments (public)
GET    /treatments/:slug          — Get treatment details (public)
POST   /treatments                — Create treatment (🔒 admin)
PATCH  /treatments/:id            — Update treatment (🔒 admin)
DELETE /treatments/:id            — Delete treatment (🔒 admin)
```

---

## 🤖 AI Chatbot Configuration

The AI chatbot (`components/AIChat.tsx`) supports two modes:

1. **OpenAI mode** — Set `NEXT_PUBLIC_OPENAI_KEY` in `.env.local`. The chatbot uses GPT-3.5-turbo with a physiotherapy system prompt.

2. **Local fallback mode** — No key required. Answers common questions about:
   - Back pain, neck pain, knee pain, sciatica, shoulder issues
   - Booking appointments
   - Home exercises
   - Clinic hours and location

---

## 📞 Clinic Contact Details

| | |
|---|---|
| **Clinic** | Dr. Majid's Advanced Physiotherapy Clinic |
| **Location** | Main Chowk, Sopore, Jammu & Kashmir — 193201 |
| **Phone** | +91-9906044455 |
| **WhatsApp** | [wa.me/919906044455](https://wa.me/919906044455) |
| **Hours** | Mon–Sat: 9 AM – 7 PM |

---

## 📄 License

This project is proprietary and built exclusively for Dr. Majid's clinic.
All rights reserved © 2024 Dr. Majid's Advanced Physiotherapy Clinic.
