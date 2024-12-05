import React from 'react';
import { Link } from 'react-router-dom';
import Teacher from '../assets/images/Teacher.png';
import Student2 from '../assets/images/Student-2.jpg';

const RoleSelection = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 p-3">
      <div className="row w-100 w-md-75 rounded shadow-lg p-4 role-selection-container">
        
        {/* Header */}
        <div className="col-12 text-center mb-4">
          <h1 className="display-5 fw-bold">Welcome! Choose Your Role</h1>
          <p className="text-muted">Select your role to proceed to the dashboard.</p>
        </div>
        
        {/* Teacher Section */}
        <div className="col-12 col-md-6 text-center p-3 p-md-5 border-end bg-teacher">
          <div className="d-flex flex-column align-items-center">
            <img
              src={Teacher}
              alt="Teacher Role Icon"
              className="img-fluid mb-3"
              style={{ width: '100%', maxWidth: '280px', height: 'auto' }} 
            />
            <h2 className="mb-3">I am a Teacher</h2>
            <p className="text-muted">Manage assignments, track students, and evaluate submissions with ease.</p>
            <Link to="/login/teacher">
              <button type="button" className="btn btn-primary btn-lg rounded-pill mt-3 shadow-sm">
                Go to Teacher Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Student Section */}
        <div className="col-12 col-md-6 text-center p-3 p-md-5 bg-student">
          <div className="d-flex flex-column align-items-center">
            <img
              src={Student2}
              alt="Student Role Icon"
              className="img-fluid mb-3"
              style={{ width: '100%', maxWidth: '280px', height: 'auto' }}
            />
            <h2 className="mb-3">I am a Student</h2>
            <p className="text-muted">Take tests, submit solutions, and track your learning journey.</p>
            <Link to="/login/student">
              <button type="button" className="btn btn-success btn-lg rounded-pill mt-3 shadow-sm">
                Go to Student Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
