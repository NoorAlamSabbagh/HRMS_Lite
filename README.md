# HRMS Lite - Human Resource Management System

HRMS Lite is a lightweight, professional Human Resource Management System designed to handle essential HR operations. It allows administrators to manage employee records and track daily attendance with a clean and intuitive interface.

## 🚀 Features

- **Employee Management**
  - Add new employees with unique IDs, full names, emails, and departments.
  - View a comprehensive list of all employees.
  - Delete employee records (automatically cleans up associated attendance data).
- **Attendance Management**
  - Mark daily attendance (Present/Absent) for each employee.
  - View historical attendance records for individual employees.
- **Professional UI/UX**
  - Built with React and Bootstrap for a modern, responsive design.
  - Features loading states, empty states, and robust error handling.
- **Robust Backend**
  - Powered by FastAPI for high-performance RESTful APIs.
  - NeonDB (PostgreSQL) integration for reliable and persistent data storage.
  - Server-side validation for data integrity.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Bootstrap, Axios, React Router
- **Backend:** Python, FastAPI, SQLAlchemy, Pydantic
- **Database:** NeonDB (PostgreSQL)

## � Vercel Deployment

This project is configured for a one-click deployment on Vercel as a monorepo.

### 1. Push your code to GitHub
Create a new repository on GitHub and push all the files in the project root (including `vercel.json`).

### 2. Deploy on Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"New Project"**.
2. Import your GitHub repository.
3. In the **Environment Variables** section, add:
   - `DATABASE_URL`: Your NeonDB PostgreSQL connection string.
   - `VITE_API_URL`: `/api` (this routes frontend requests to your FastAPI serverless function).
4. Click **Deploy**.

### 3. Database Setup
The system automatically creates the necessary tables (`employees` and `attendance`) in your NeonDB database upon the first request.

## ⚙️ Local Development

### Prerequisites
- **Python:** 3.8+
- **Node.js:** 16+
- **NeonDB:** A PostgreSQL connection string from [neon.tech](https://neon.tech)

### Backend Setup
```bash
cd api
pip install -r requirements.txt
# Set DATABASE_URL in .env
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
# Set VITE_API_URL in .env
npm run dev
```

## 📄 License
This project is licensed under the MIT License.
