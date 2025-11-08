# 🧑‍💻 MERN User Post Application

A simple **MERN stack** project where users can **sign up, log in, and create posts**.  
All posts are visible to every user in a public feed, showing the most recent posts first.

---

## 🚀 Features

### 1. **User Authentication**
- Users can **register** using email and password.
- After registration, users can **log in** to access the website.
- Once logged in, the user's **name or profile** appears in the top navigation bar.

### 2. **Create Post**
- Logged-in users can **create a post** with text content (like “Hello world!”).
- Each post includes:
  - ✍️ User’s name  
  - 💬 Post text  
  - 🕒 Timestamp (when it was created)

### 3. **View All Posts**
- All registered users can view **a public feed** of all posts.
- Posts are displayed in **reverse chronological order** (latest first).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Token) |
| **Styling** | CSS / Tailwind / Bootstrap (your choice) |

---

## ⚙️ Setup & Run Instructions

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ArpanBarik001/Linkedin_Clone.git
cd mern-user-post-app

# 2️⃣ Setup and run the backend
cd backend
npm install

npm start
# Backend will run on http://localhost:5000

# 3️⃣ Setup and run the frontend
cd ../frontend
npm install
npm start
# Frontend will run on http://localhost:3000
