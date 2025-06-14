# GraphQL (Goliath Assignment)

This is a fullstack GraphQL + React setup that includes:
- A custom JWT authentication system (via HTTP-only cookies)
- A GraphQL API with filtering and sorting on products
- A React frontend with Apollo Client and Tailwind CSS
- TypeScript on both frontend and backend

---

## 🔧 Tech Stack

- Backend: Express, Apollo Server, JWT, bcrypt
- Frontend: React, Apollo Client, Tailwind CSS
- GraphQL everywhere
- Cookies for auth (httpOnly)

---

## 🌱 Getting Started

### Prerequisites

Make sure you have:
- Node.js (v16 or higher)
- npm or yarn

---

## 🛠️ Setup

### 1. Clone this repo

```bash
git clone https://github.com/coderomm/goliath-assignment.git
cd goliath-assignment
````

---

## 📦 Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Create `.env` file

Make a `.env` file in the root of `backend`:

```env
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

(You can also check `.env.example`)

### 3. Run the dev server

```bash
npm run dev
```

GraphQL playground should be available at [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## 💻 Frontend Setup

### 1. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 2. Create `.env` file

Make a `.env` file in the root of `frontend`:

```env
VITE_GQL_API='http://localhost:4000/graphql'
```

(You can also check `.env.example`)

### 3. Start frontend dev server

```bash
npm start
```

The app should open at [http://localhost:5173](http://localhost:5173)

---

## 🔐 Demo Login

Try these credentials:

```txt
Email: admin@example.com
Password: admin123
```

Or:

```txt
Email: user@example.com
Password: user123
```

---

## 🔎 Features

### ✅ Auth Flow

* Login → backend verifies → JWT sent via cookie
* Authenticated requests auto-include the cookie
* Logout clears the cookie

### ✅ Product Table

* Filter by category, price range, stock
* Sort by name, category, price, stock
---

## ⚙️ Scripts

### Backend

```bash
npm run dev     # run with ts-node
npm run build   # compile to dist
npm start       # run compiled dist/index.js
```

### Frontend

```bash
npm start       # React dev server
```

---

## 📁 Folder Structure

```
app/
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── index.tsx
    │   └── index.css
    ├── tailwind.config.js
    ├── package.json
    └── .env
```

---