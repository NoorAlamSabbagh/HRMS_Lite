from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date

class EmployeeBase(BaseModel):
    employee_id: str = Field(..., description="Unique Employee ID")
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    pass

class AttendanceBase(BaseModel):
    employee_id: str
    date: str
    status: str  # "Present" or "Absent"

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    pass
