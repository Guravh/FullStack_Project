# AURELIA — Fine Jewelry Store

A full-stack jewelry e-commerce app with a dark luxury aesthetic.

## Stack
**Frontend:** React 18 · Tailwind CSS v4 · Redux Toolkit · TanStack React Query · React Router v6 · react-medium-image-zoom · EmailJS · Lucide React · Vite  
**Backend:** Node.js · Express.js · sql.js (SQLite) · JWT Auth · bcryptjs

---

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
node src/index.js
# Runs on http://localhost:5000
# Demo login: demo@aurelia.com / demo123
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📧 EmailJS Setup (Cart Page)

1. Sign up at https://www.emailjs.com
2. Create a Service + Email Template with variables:
   - `{{customer_name}}` `{{customer_email}}` `{{order_items}}` `{{order_total}}` `{{order_date}}`
3. Open `frontend/src/pages/CartPage.jsx` and replace:
```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

---

## Pages & Features

| Page | Route | Auth Required |
|------|-------|---------------|
| Home | `/` | No |
| Collections | `/collections` | No |
| Category filter | `/collections/rings` etc | No |
| Product Detail | `/product/:id` | No |
| Cart + EmailJS Order | `/cart` | Login to checkout |
| Login | `/login` | Guest only |
| Register | `/register` | Guest only |
| Account + Orders | `/account` | ✅ Yes |
| Wishlist | `/wishlist` | ✅ Yes |

## Key Features
- 🔐 JWT authentication with Redux state persistence
- 🛒 Cart with localStorage persistence (survives refresh)
- 🔍 Product search via navbar
- 🔎 Image zoom on product pages (react-medium-image-zoom)
- ⏳ Skeleton loading states on all data fetches
- 📱 Responsive layout
- 💌 EmailJS order confirmation emails
- ❤️ Wishlist (authenticated users)
