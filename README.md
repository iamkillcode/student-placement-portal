# 🏫 Steadfast Academy - Student Management System

A modern, full-stack student management system for **Steadfast Academy** to track JHS students' mock test performance and predict Senior High School placement using real BECE logic and Ghana SHS categories.

---

## 📁 Project Structure

```
spp-frontend/   # React + Vite frontend (UI)
spp-backend/    # Node.js + Express + MongoDB backend (API, logic, seeding)
README.md       # This file
```

---

## 🌟 Features

- **Student Database**: Pre-loaded with 20 sample students (JHS 3A, 3B, 3C)
- **Mock Test Management**: Add and track multiple mock tests per student
- **Performance Tracking**: Monitor student progress and improvement
- **BECE Aggregate Calculation**: 4 core + best 2 electives (grades 1-9)
- **Raw Score Calculation**: View raw scores alongside aggregates
- **School Placement Prediction**: Uses real Ghana SHS Category A/B/C lists
- **Dashboard Analytics**: Overview of performance by class and category
- **Filtering & Search**: Filter by class, category, and more
- **Accessible UI**: High-contrast, readable tables and dropdowns
- **Easy Deployment**: Ready for local and cloud (Render, Railway, Vercel, Netlify)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- MongoDB (local or cloud, e.g. MongoDB Atlas)

### 1. Clone the repository
```bash
# In PowerShell:
git clone <repository-url>
cd SPP
```

### 2. Setup the Backend
```bash
cd spp-backend
npm install
# Set your MongoDB URI in .env (see .env.example)
# Seed the database with sample students and mock tests:
npm run seed
# Start the backend server:
npm run dev
# API runs at http://localhost:5000 by default
```

### 3. Setup the Frontend
```bash
cd ../spp-frontend
npm install
# Set API_BASE_URL in .env (see .env.example), e.g. http://localhost:5000
npm run dev
# App runs at http://localhost:5173
```

---

## 🌍 Deployment

- **Backend**: Deploy to [Render](https://render.com), [Railway](https://railway.app), or any Node/Mongo host.
- **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Set `API_BASE_URL` to your backend URL.
- **Serve Both Together**: Optionally, serve the frontend build from Express (see backend docs).
- **Temporary Sharing**: Use [ngrok](https://ngrok.com) to expose local servers for testing.

---

## 🧮 BECE Aggregate & Placement Logic

- **Aggregate Calculation**: 4 core subjects (English, Math, Science, Social) + best 2 electives (RME, ICT, Ghanaian Language, French). Each subject graded 1-9 (lower is better).
- **Raw Score**: Sum of all subject scores (0-600).
- **School Categories**:
  - **A**: Aggregate 1-6 (e.g. Achimota, PRESEC, Wesley Girls)
  - **B**: Aggregate 7-15 (e.g. Ghana National, St. Peter's)
  - **C**: Aggregate 16-36 (e.g. St. Monica's, St. John's)
- **Placement**: Students matched to real schools by category and aggregate.

---

## 🏗️ Architecture

- **Frontend**: React (Vite), API calls use `API_BASE_URL` from `.env` for backend communication.
- **Backend**: Node.js, Express, MongoDB. All BECE logic, seeding, and placement handled here.
- **Seeding**: `spp-backend/scripts/seedStudents.js` generates realistic students/tests.

---

## ⚙️ Configuration

- **API Base URL**: Set `API_BASE_URL` in `spp-frontend/.env` to your backend URL.
- **MongoDB URI**: Set `MONGODB_URI` in `spp-backend/.env`.
- **School Lists**: Edit `spp-backend/scripts/schoolLists.js` for real Ghana SHS data.

---

## 🖥️ Usage

- **Teachers/Admins**: View dashboards, add/edit students/tests, export reports.
- **Students**: View mock test history, placement predictions, and improvement analysis.

---

## 📝 Documentation & Support

- See code comments and each folder's README for more details.
- For issues, open a GitHub issue or contact the dev team.

---

**Made with ❤️ for Ghanaian students and educators.**
