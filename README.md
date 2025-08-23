# 🏡 RealState Application Backend

Backend for RealState App using **Node.js, Express, and MongoDB**.  
Provides APIs for authentication, property management, bought list, and contact forms.

---

## 🚀 Features
- JWT Auth & Role-based Access (Admin, Client, Ops)
- Property CRUD (Add, Update, Delete, List)
- User Bought Properties List
- Contact Form Submissions
- Secure File Uploads

---

## ⚙️ Setup
```bash
git clone https://github.com/your-username/RealState-Application-Backend.git
cd RealState-Application-Backend
npm install

Create .env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Run:
npm run dev

📡 API Routes
POST /api/auth/register – Register
POST /api/auth/login – Login
GET /api/properties – List properties
POST /api/properties – Add property (Admin)
GET /api/user/bought – Bought properties
POST /api/contact – Submit contact
