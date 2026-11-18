# SM Vision Pixel — Official Creative Agency Web Platform

> **Positioning:** Creative Media & Branding Studio  
> **Tagline:** Creative Ideas. Stronger Brands.  
> **Contact:** smvisionpixel@gmail.com | +91 6386775945 | [@sm_vision_pixel](https://instagram.com/sm_vision_pixel)  
> **Domain (Planned):** smvisionpixel.com  

---

## 🚀 Overview

**SM Vision Pixel** is a production-grade, full-stack website built for a modern digital creative agency. It combines a minimal, high-end corporate-creative frontend with a fast, reliable Node.js / Express backend and SQLite database for real-time contact and quotation inquiry management.

---

## 🎨 Technology Stack

### Frontend (`client/`)
- **React.js (v18+)** + **Vite** — High-speed reactive user interface
- **Tailwind CSS** — Clean, modern styling using custom agency color palette (Navy Blue `#0A192F`, Royal Blue `#2563EB`, Off-white `#FAFAFC`)
- **React Router (v6)** — Smooth single-page client routing with auto scroll-to-top
- **Lucide React** — Modern, crisp icon system
- **Framer Motion** — Tasteful, non-distracting micro-animations

### Backend (`server/`)
- **Node.js (v20+)** + **Express.js** — Fast REST API with structured architecture
- **SQLite Database** — Built-in native SQLite engine with zero compile dependencies
- **JWT & bcryptjs** — Secure admin authentication with password hashing
- **Rate Limiting & Honeypot Spam Protection** — Shields forms against bot abuse
- **Resend Email Integration** — Optional instant notification delivery

---

## 📁 Project Structure

```text
shahi's businessl/
├── package.json              # Root project manager (runs client & server together)
├── README.md                 # Complete guide & documentation
├── .env.example              # Master environment variable template
│
├── client/                   # Frontend React Application
│   ├── public/
│   │   ├── favicon.svg       # SM Vision Pixel SVG logo monogram
│   │   ├── robots.txt        # SEO bot crawling rules
│   │   ├── sitemap.xml       # Full XML site map
│   │   └── placeholders/     # Portfolio, team & banner SVG placeholders
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer, Main Layout
│   │   │   ├── common/       # Button, Card, Badge, Modal, SectionHeading, IconHelper
│   │   │   ├── home/         # Hero, ServicesPreview, PortfolioPreview, WhyChooseUs, WorkProcess, TeamPreview, CtaBanner
│   │   │   ├── forms/        # ContactForm, QuoteModal
│   │   │   └── admin/        # ProtectedRoute
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Page 1: Home
│   │   │   ├── About.jsx     # Page 2: About Us & Leadership
│   │   │   ├── Services.jsx  # Page 3: 13 Agency Services
│   │   │   ├── Portfolio.jsx # Page 4: Project Gallery with Lightbox & Modals
│   │   │   ├── Pricing.jsx   # Page 5: Transparent Individual Pricing
│   │   │   ├── Contact.jsx   # Page 6: Contact Us & Quick Inquiry
│   │   │   ├── AdminLogin.jsx# Protected Admin Sign-in
│   │   │   ├── AdminDashboard.jsx # Admin Lead Management
│   │   │   └── NotFound.jsx  # Custom 404 Error Page
│   │   ├── context/          # AuthContext (JWT session management)
│   │   ├── services/         # api.js (Fetch API Client)
│   │   ├── data/             # servicesData.js, portfolioData.js, teamData.js
│   │   ├── App.jsx           # Master Route Configuration
│   │   ├── main.jsx          # App Entrypoint
│   │   └── index.css         # Tailwind & Custom Typography CSS
│   ├── vite.config.js        # Vite config with /api proxy
│   ├── tailwind.config.js    # Color palette & font settings
│   └── package.json
│
└── server/                   # Backend Express & REST API
    ├── data/
    │   └── smvision.db       # Persistent SQLite Database file
    ├── scripts/
    │   └── init-db.js        # Seeds 13 services & default admin account
    ├── src/
    │   ├── config/           # Database configuration
    │   ├── controllers/      # contactController, serviceController, adminController
    │   ├── middleware/       # rateLimiter, validate, auth (JWT)
    │   ├── routes/           # contactRoutes, serviceRoutes, adminRoutes
    │   ├── utils/            # email.js (Optional Resend integration)
    │   └── app.js            # Express app setup & CORS
    ├── server.js             # Main server execution file
    ├── .env                  # Local backend configuration
    ├── .env.example
    └── package.json
```

---

## ⚡ Quick Start Guide (Beginner-Friendly)

### 1. Initialize the Database
Open your terminal in the project root and run:
```bash
npm run init-db
```
This automatically creates the SQLite database tables, seeds all 13 agency services, and initializes the secure admin account.

### 2. Run Both Frontend and Backend Simultaneously
From the root folder, run:
```bash
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Admin Management Portal:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🔐 Default Admin Credentials

When the database is first initialized, the initial admin account is created from `server/.env`:

- **Username / Email:** `admin@smvisionpixel.com`
- **Password:** `Admin@SMVision2025!`

> ⚠️ *Important:* In production, change the password and set a custom `JWT_SECRET` in `server/.env`.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service uptime and status | Public |
| `GET` | `/api/services` | Retrieve list of 13 agency services | Public |
| `POST` | `/api/contact` | Submit general contact message | Public (Rate-limited) |
| `POST` | `/api/quote` | Submit custom quotation request | Public (Rate-limited) |
| `POST` | `/api/admin/login` | Authenticate admin and receive JWT | Public (Rate-limited) |
| `GET` | `/api/admin/me` | Verify active admin JWT | Admin Token |
| `GET` | `/api/admin/inquiries`| Query inquiries with status/type filter | Admin Token |
| `PATCH`| `/api/admin/inquiries/:id/status` | Update status (New, Contacted, Completed) | Admin Token |
| `DELETE`| `/api/admin/inquiries/:id` | Remove inquiry record | Admin Token |

---

## 👥 Official Team Roster

Strictly included as specified:
1. **Shahil Rajpoot** – Founder
2. **Muskan Kashyap** – Co-Founder
3. **Priyanshi Rajpoot** – Manager
4. **Abhishek Rajpoot** – HR & Calling
5. **Shreya Rajpoot** – Designer
6. **Ashutosh** – website developer

---

## 💳 Service Pricing Reference

- **Social Media Poster Design:** ₹299/design
- **Short Video Editing:** ₹599/video
- **AI Voiceover Video:** ₹699/video
- **Presentation Design:** ₹200/page
- **Visiting Card Design:** ₹399/design
- **Basic Website Development:** ₹6,000+/project
- **Animation Video:** ₹5,000+/video
- **App Development:** Custom Quote
- **SEO, Social Media Marketing, Shoots:** Contact for Pricing

---

## 🖼️ How to Replace Placeholders

1. **Replace Agency Logo:**
   - In `client/src/components/layout/Navbar.jsx` and `Footer.jsx`, replace the `<div className="w-10 h-10...">SM</div>` block or drop your SVG/PNG into `client/src/assets/logo.svg`.
2. **Replace Team Photos:**
   - Place team portraits in `client/public/placeholders/` or `client/src/assets/` and update the `image` paths in `client/src/data/teamData.js`.
3. **Replace Portfolio Showcase:**
   - Add your finished project images or screenshots to `client/public/placeholders/` and update `client/src/data/portfolioData.js`.

---

## 🚢 Production Deployment

### Option A: Full-Stack on Render / Railway
1. Set Build Command: `npm run install:all && npm run build`
2. Set Start Command: `npm start`
3. Configure Environment Variables (`PORT`, `JWT_SECRET`, `CLIENT_URL`, etc.).

### Option B: Frontend on Vercel / Netlify + Backend on Render
1. Deploy `client/` to Vercel/Netlify. Set `VITE_API_BASE_URL=https://your-backend.onrender.com/api`.
2. Deploy `server/` to Render/Railway. Set `CLIENT_URL=https://your-frontend.vercel.app`.
