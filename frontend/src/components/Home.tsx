import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-4 fw-bold mb-3">Welcome to HRMS Lite</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            A lightweight, efficient solution for managing employee records and tracking daily attendance. 
            Designed for professional HR administration with simplicity and ease of use.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 transition-hover">
              <Card.Body className="p-4 text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-people-fill fs-1"></i>
                  <span className="fs-1">👥</span>
                </div>
                <Card.Title className="fw-bold mb-3">Manage Employees</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Easily view, search, and delete employee records. Keep your organization's data organized.
                </Card.Text>
                <Button as={Link} to="/employees" variant="outline-primary" className="rounded-pill px-4">
                  View Records
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 transition-hover">
              <Card.Body className="p-4 text-center">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-1">📅</span>
                </div>
                <Card.Title className="fw-bold mb-3">Track Attendance</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Mark daily attendance for each employee and view their historical records with a simple interface.
                </Card.Text>
                <Button as={Link} to="/attendance" variant="outline-success" className="rounded-pill px-4">
                  Mark Attendance
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 transition-hover">
              <Card.Body className="p-4 text-center">
                <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-1">➕</span>
                </div>
                <Card.Title className="fw-bold mb-3">Add Employee</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Onboard new team members by adding their unique ID, name, email, and department.
                </Card.Text>
                <Button as={Link} to="/add-employee" variant="outline-warning" className="rounded-pill px-4">
                  Add New
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mt-5 border-0 shadow-sm overflow-hidden rounded-4">
          <Card.Body className="p-0">
            <Row className="g-0">
              <Col md={6} className="bg-primary text-white p-5 d-flex flex-column justify-content-center">
                <h2 className="fw-bold mb-4">Fast & Responsive</h2>
                <p className="mb-4">
                  HRMS Lite is built with performance in mind, using FastAPI on the backend and React on the frontend to ensure a smooth, professional user experience.
                </p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">✅ Real-time data updates</li>
                  <li className="mb-2">✅ Mobile-responsive design</li>
                  <li className="mb-2">✅ Robust error handling</li>
                  <li>✅ Persistent MongoDB storage</li>
                </ul>
              </Col>
              <Col md={6} className="bg-white p-5 d-flex align-items-center justify-content-center">
                <div className="text-center p-4 border rounded-4 bg-light shadow-inner w-100">
                  <h4 className="text-muted mb-3">System Statistics</h4>
                  <p className="display-6 fw-bold text-primary mb-1">Lite Version</p>
                  <p className="text-muted">Production Ready 🚀</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
