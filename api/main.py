from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session

from database import EmployeeDB, AttendanceDB, get_db
from models import EmployeeCreate, Employee, AttendanceCreate, Attendance

app = FastAPI(title="HRMS Lite API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to HRMS Lite API with NeonDB (PostgreSQL)"}

# --- Employee Management ---

@app.post("/employees", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    # Check if employee_id already exists
    existing_employee = db.query(EmployeeDB).filter(EmployeeDB.employee_id == employee.employee_id).first()
    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with ID {employee.employee_id} already exists"
        )
    
    # Check if email already exists
    existing_email = db.query(EmployeeDB).filter(EmployeeDB.email == employee.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with email {employee.email} already exists"
        )

    db_employee = EmployeeDB(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/employees", response_model=List[Employee])
async def get_employees(db: Session = Depends(get_db)):
    return db.query(EmployeeDB).all()

@app.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    db_employee = db.query(EmployeeDB).filter(EmployeeDB.employee_id == employee_id).first()
    if not db_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    # Delete associated attendance records first
    db.query(AttendanceDB).filter(AttendanceDB.employee_id == employee_id).delete()
    
    db.delete(db_employee)
    db.commit()
    return None

# --- Attendance Management ---

@app.post("/attendance", response_model=Attendance, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    # Check if employee exists
    db_employee = db.query(EmployeeDB).filter(EmployeeDB.employee_id == attendance.employee_id).first()
    if not db_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )
    
    # Check if attendance already marked for this date
    existing_attendance = db.query(AttendanceDB).filter(
        AttendanceDB.employee_id == attendance.employee_id,
        AttendanceDB.date == attendance.date
    ).first()
    
    if existing_attendance:
        # Update existing record
        existing_attendance.status = attendance.status
        db.commit()
        db.refresh(existing_attendance)
        return existing_attendance
    
    # Create new record
    db_attendance = AttendanceDB(**attendance.dict())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

@app.get("/attendance/{employee_id}", response_model=List[Attendance])
async def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    # Check if employee exists
    db_employee = db.query(EmployeeDB).filter(EmployeeDB.employee_id == employee_id).first()
    if not db_employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
        
    attendance_records = db.query(AttendanceDB).filter(AttendanceDB.employee_id == employee_id).all()
    # Sort by date descending
    attendance_records.sort(key=lambda x: x.date, reverse=True)
    return attendance_records

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
