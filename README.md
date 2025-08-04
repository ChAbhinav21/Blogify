# Blogify

**Blogify** is a full-stack blogging platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**.  
It includes user auth, blog CRUD, comments, and JWT-based route protection.

---

## 🚀 Features

- User registration & login (hash + salt password)
- JWT-based authentication & cookie management
- Create, edit, delete blogs
- Comment on posts
- Responsive UI (views in EJS)
- View user dashboards, profile images (upload)
- URL shortening & analytics (if included)

---

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Backend     | Node.js, Express.js    |
| Database    | MongoDB + Mongoose     |
| Frontend    | EJS, Bootstrap (if used) |
| Auth        | JWT + Cookies          |
| Secrets     | dotenv                 |

---

## 📁 Installation

```bash
git clone https://github.com/ChAbhinav21/Blogify.git
cd Blogify
npm install

```
Create a .env file(not included in repo):
PORT=3000
MONGO_URL = your_mongo_connection_string

then =>
```bash
npm start
http://localhost:3000/
u will navigated to home page
```
Directory Structure
/routes
/models
/views
/public
middleware/authentication.js
app.js

this is the crystal clear view of this project

ThankYou
