# Your Neighbourhood Market — MERN Stack Lab

A product catalog + shopping cart app (React) paired with a full MERN task-tracker feature, backed by MongoDB Atlas.

## Description

- **Product Catalog & Cart**: Browse, search, and filter products by category/price, add items to a shopping cart, and adjust quantities. Cart runs entirely client-side.
- **Task Tracker (MERN)**: A to-do list demonstrating the full MERN stack — React fetches/adds tasks from an Express API, which stores them in MongoDB Atlas via Mongoose.

## Stack

- **M**ongoDB Atlas (cloud database)
- **E**xpress.js (REST API)
- **R**eact + Vite (frontend)
- **N**ode.js (runtime)

## Project Structure

```
mern-market/
├── client/     React frontend (Vite)
└── server/     Express backend + MongoDB models/routes
```

## How to Run

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then paste your MongoDB Atlas connection string into .env
npm run dev             # starts server on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev              # starts app on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The frontend proxies `/api` calls to the backend automatically.

> See the full setup guide (MongoDB Atlas account, cluster, connection string, Node install, etc.) provided separately for step-by-step instructions.
