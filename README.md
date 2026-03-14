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
  - MongoDB integration for flexible and persistent data storage.
  - Server-side validation for data integrity.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Bootstrap, Axios, React Router
- **Backend:** Python, FastAPI, Motor (Async MongoDB Driver), Pydantic
- **Database:** MongoDB

## 📋 Prerequisites

- **Python:** 3.8+
- **Node.js:** 16+
- **MongoDB:** Running locally or accessible via a connection string

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "Ethra AI"
```

### 2. Backend Setup
```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file (optional, defaults provided in code)
# MONGODB_URL=mongodb://localhost:27017
# DATABASE_NAME=hrms_lite

# Start the server
python main.py
```
The backend will be running at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd ../frontend
# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be running at `http://localhost:5173` (or the port shown in your terminal).

## 🧪 Testing the API
A test script is provided in the backend directory to verify the API functionality:
```bash
cd backend
python test_api.py
```

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
