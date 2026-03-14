import requests

def test_create_employee():
    url = "http://localhost:8000/employees"
    data = {
        "employee_id": "EMP001",
        "full_name": "Test User",
        "email": "test@example.com",
        "department": "Test Dept"
    }
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_create_employee()
