import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Card, Container, Spinner, Row, Col } from 'react-bootstrap';

interface Employee {
  employee_id: string;
  full_name: string;
}

interface AttendanceRecord {
  employee_id: string;
  date: string;
  status: string;
}

const Attendance: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees');
      setEmployees(response.data);
    } catch (err: any) {
      setError('Failed to fetch employees');
    }
  };

  const fetchAttendance = useCallback(async (employeeId: string) => {
    if (!employeeId) return;
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/attendance/${employeeId}`);
      setAttendanceRecords(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendance(selectedEmployee);
    }
  }, [selectedEmployee, fetchAttendance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) {
      setError('Please select an employee');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/attendance', {
        employee_id: selectedEmployee,
        date,
        status,
      });
      alert('Attendance marked successfully!');
      fetchAttendance(selectedEmployee);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Mark Attendance</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee</Form.Label>
                  <Form.Select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {emp.full_name} ({emp.employee_id})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-secondary text-white">
              <h4 className="mb-0">Attendance History</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              {!selectedEmployee ? (
                <Alert variant="info">Select an employee to view history.</Alert>
              ) : loading ? (
                <div className="text-center p-5"><Spinner animation="border" /></div>
              ) : attendanceRecords.length === 0 ? (
                <Alert variant="info">No attendance records for this employee.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>
                          <span className={`badge bg-${record.status === 'Present' ? 'success' : 'danger'}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Attendance;
