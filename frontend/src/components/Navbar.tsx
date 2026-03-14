import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <span className="text-primary">HRMS</span> Lite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/employees" className={({ isActive }) => isActive ? 'active fw-bold' : ''}>
              Manage Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-employee" className={({ isActive }) => isActive ? 'active fw-bold' : ''}>
              Add Employee
            </Nav.Link>
            <Nav.Link as={NavLink} to="/attendance" className={({ isActive }) => isActive ? 'active fw-bold' : ''}>
              Track Attendance
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
