# 📝 Blogit – MERN Blogging Platform

Blogit is a full-stack blogging platform built using the MERN stack (MongoDB, Express, React, Node.js) that enables users to create, edit, like, comment, and manage blogs with rich social interactions and authentication (including Google login and password recovery).

## It’s designed for writers who want an intuitive blogging experience with gamified features like ranks, reach, and reaction counts 🔥🚀⭐.

## 🚀 Tech Stack

| Category                 | Technologies                                                           |
| ------------------------ | ---------------------------------------------------------------------- |
| **Frontend**             | React, Redux Toolkit, Formik + Yup, Tailwind CSS, Axios, Framer Motion |
| **Backend**              | Node.js, Express.js, MongoDB, Mongoose                                 |
| **Authentication**       | JWT, Cookies, Google OAuth 2.0, Passport.js                            |
| **AI Integration**       | Gemini API for grammar correction                                      |
| **Email Service**        | Nodemailer (OTP verification & password reset)                         |
| **Uploads & Storage**    | Multer for image uploads                                               |
| **Validation**           | Yup + Formik                                                           |
| **Deployment Ready For** | Render / Railway (backend), Netlify / Vercel (frontend), MongoDB Atlas |

---

## 🌟 Features

### 🔐 Authentication

- Secure JWT-based auth with cookies
- Google OAuth 2.0 login
- Forgot password with OTP email verification
- Reset password flow

### 🧑‍💻 User Features

- Update username, avatar, password, and country code
- Delete account permanently
- View personal profile and stats (reach, likes, rank)
- View other users’ profiles and blogs

### ✍️ Blogging

- Create, update, and delete blogs
- Upload blog images
- Add meta tags & categories
- Auto grammar correction with **Gemini AI**
- Like & react to blogs (🔥 Fire, 🚀 Rocket, ⭐ Star)
- Comment on blogs (real-time-like experience)

### 🏆 Ranking System

- Track **top writers** and **top blogs**
- Calculate total reach based on user engagement

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/chaouchhoussemeddine/Blogit.git
cd Blogit-MERN
```

### 2️⃣ Install dependencies

# Server

```bash
cd server
npm install
```

```bash
# Client
cd ../client
npm install
```

### 3️⃣ Configure environment variables

```bash
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/blogit
SECRETKEY=your_jwt_secret

# Gmail (Nodemailer)
SERVICE=gmail
HOST=smtp.gmail.com
PORT_EMAIL=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_google_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:3000

```

### 4️⃣ Run the project

```bash
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm start
```

Your app will be live at 👉 http://localhost:3000

## 🧱 Folder Structure

```bash
Blogit-MERN/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── images/
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layout/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── README.md
```

## ⚡ Future Enhancements

-We plan to make Blogit even better with the following features:
-Real-time notifications: Notify users when someone likes or comments on their blogs
-Advanced search & filters: Search blogs by keywords, category, and tags
-Dark mode support: For better accessibility and user experience
-Social sharing: Share blogs directly to Twitter, LinkedIn, or Facebook
-Analytics dashboard: Show user statistics and blog performance trends
-Admin panel: Manage users, blogs, and comments centrally
-Mobile app: A React Native version for iOS and Android
-Multi-language support: Localize the UI for multiple languages

## 🧑‍💻 Author

chaouchhoussem eddine
Fullstack Developer & UI Designer passionate about full-stack web apps and AI integrations

## 🤝 Contributing

Contributions are welcome! If you want to help improve Blogit

## 📄 License

Licensed under the MIT License – free for personal and commercial use
