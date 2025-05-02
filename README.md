# 🚀 Full-Stack Vite & Node.js Project

This project is a full-stack web application using a **Vite-powered React frontend** and a **Node.js/Express backend** with **MongoDB** and **Nodemailer** integration.

---

## 🧰 Tech Stack

- **Frontend:** Vite + React  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Emailing:** Nodemailer  

---

## 🛠 Getting Started

### 1️⃣ Backend Setup (Node.js + Express)

Ensure you have [Node.js](https://nodejs.org/) installed.

```sh
cd backend
npm install
npm run dev
````

> 🔹 Runs on `http://localhost:5000` by default
> 🔹 Make sure to configure your `.env` file

---

### 2️⃣ Frontend Setup (Vite + React)

```sh
cd frontend
npm install
npm run dev
```

> 🔹 Runs on `http://localhost:5173` by default
> 🔹 Vite supports fast refresh and instant updates

---

## ⚙️ Configuration

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

> 🔸 `EMAIL_USER` and `EMAIL_PASS` are used by **Nodemailer** to send emails

---

### Frontend (`frontend/src/config.js`)

```js
export const API_BASE_URL = `http://${window.location.hostname}:5000`;
// Automatically adapts to localhost or LAN IP
```

---

## 📜 Available Scripts

### Backend

* `npm start` – Start the server
* `npm run dev` – Start with **nodemon** (auto-restart on changes)

### Frontend

* `npm run dev` – Start the development server
* `npm run build` – Build for production
* `npm run preview` – Preview the production build locally

---

## 🌐 Deployment

### Deploying the Backend

1. Use platforms like **Render**, **Railway**, **Heroku**, or your own VPS
2. Configure the `.env` file with production credentials
3. Use `npm install && npm start` to launch

### Deploying the Frontend

1. Run `npm run build`
2. Deploy the `dist/` folder to:

   * [Netlify](https://www.netlify.com/)
   * [Vercel](https://vercel.com/)
   * Any static file host

---

## 📖 Documentation & Resources

* [Vite Documentation](https://vitejs.dev/)
* [React Documentation](https://reactjs.org/)
* [Express Documentation](https://expressjs.com/)
* [MongoDB Docs](https://www.mongodb.com/docs/)
* [Nodemailer Docs](https://nodemailer.com/about/)

---

## ❓ Troubleshooting

* **CORS issues:** Ensure your backend has CORS enabled (`cors` package).
* **Email not sending:** Double-check `EMAIL_USER` and app passwords if using Gmail or similar.
* **Port conflicts:** Change ports in `.env` or `vite.config.js` if defaults are already in use.

