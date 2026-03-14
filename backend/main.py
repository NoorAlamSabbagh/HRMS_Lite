from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime
from pydantic import EmailStr

from database import employees_collection, attendance_collection, employee_helper, attendance_helper
from models import EmployeeCreate, Employee, AttendanceCreate, Attendance

app = FastAPI(title="HRMS Lite API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to HRMS Lite API"}

# --- Employee Management ---

@app.post("/employees", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate):
    # Check if employee_id already exists
    existing_employee = await employees_collection.find_one({"employee_id": employee.employee_id})
    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with ID {employee.employee_id} already exists"
        )
    
    # Check if email already exists
    existing_email = await employees_collection.find_one({"email": employee.email})
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with email {employee.email} already exists"
        )

    new_employee_data = employee.dict()
    result = await employees_collection.insert_one(new_employee_data)
    
    created_employee = await employees_collection.find_one({"_id": result.inserted_id})
    return employee_helper(created_employee)

@app.get("/employees", response_model=List[Employee])
async def get_employees():
    employees = []
    async for employee in employees_collection.find():
        employees.append(employee_helper(employee))
    return employees

@app.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str):
    delete_result = await employees_collection.delete_one({"employee_id": employee_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    # Also delete associated attendance records
    await attendance_collection.delete_many({"employee_id": employee_id})
    return None

# --- Attendance Management ---

@app.post("/attendance", response_model=Attendance, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate):
    # Check if employee exists
    employee = await employees_collection.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )
    
    # Check if attendance already marked for this date
    existing_attendance = await attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": attendance.date
    })
    
    if existing_attendance:
        # Update existing record
        await attendance_collection.update_one(
            {"_id": existing_attendance["_id"]},
            {"$set": {"status": attendance.status}}
        )
        updated_attendance = await attendance_collection.find_one({"_id": existing_attendance["_id"]})
        return attendance_helper(updated_attendance)
    
    # Create new record
    new_attendance_data = attendance.dict()
    result = await attendance_collection.insert_one(new_attendance_data)
    created_attendance = await attendance_collection.find_one({"_id": result.inserted_id})
    return attendance_helper(created_attendance)

@app.get("/attendance/{employee_id}", response_model=List[Attendance])
async def get_employee_attendance(employee_id: str):
    # Check if employee exists
    employee = await employees_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
        
    attendance_records = []
    async for attendance in attendance_collection.find({"employee_id": employee_id}):
        attendance_records.append(attendance_helper(attendance))
    
    # Sort by date descending
    attendance_records.sort(key=lambda x: x["date"], reverse=True)
    return attendance_records

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
