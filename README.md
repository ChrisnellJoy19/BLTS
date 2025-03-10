# Full-Stack Vite & Node.js Project

This project is a full-stack web application with a **Vite-powered React frontend** and a **Node.js/Express backend**.

## 🚀 Getting Started

### 1️⃣ Backend Setup (Node.js + Express)

Ensure you have [Node.js](https://nodejs.org/) installed.

```sh
cd backend
npm install
npm start
```

- Runs on `http://localhost:5000` (default)
- Configure `.env` for environment variables

### 2️⃣ Frontend Setup (Vite + React)

```sh
cd frontend
npm install
npm run dev
```

- Runs on `http://localhost:5173` (default)
- Modify `vite.config.js` as needed

## 🔧 Configuration

### Backend (`backend/.env`)

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (`frontend/src/config.js`)

```js
export const API_BASE_URL = 'http://localhost:5173';
```

## 🛠 Available Scripts

### Backend
- `npm start` - Runs the server
- `npm run dev` - Runs with nodemon for live reload

### Frontend
- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build

## 🚀 Deployment

### Backend Deployment
1. Use a cloud platform like Heroku, Render, or VPS
2. Set up `.env` variables
3. Use `npm install && npm start`

### Frontend Deployment
1. Build the app: `npm run build`
2. Deploy `dist/` to Netlify, Vercel, or any static hosting provider

## 📖 Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Docs](https://reactjs.org/)
- [Express Docs](https://expressjs.com/)


