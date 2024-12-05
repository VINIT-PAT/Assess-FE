import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentDashboard.css'; // Import the custom CSS file
import studentback from '../assets/images/seo5.jpg';
import sub from '../assets/images/Sub.jpg';
import test from '../assets/images/Test.jpg';

const StudentDashboard = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle logout
  const handleLogout = () => {
    // Perform any necessary logout logic here (e.g., clearing authentication tokens)
    
    // Redirect to RoleSelection page
    navigate('/role-selection'); // Redirects the user to RoleSelection page
  };

  return (
    <div className="student-dashboard container-fluid p-0">
      <div className="row g-0 vh-100">
        {/* Left Section - Full Image */}
        <div className="col-md-6 p-0">
          <img
            src={studentback}
            alt="Dashboard Image"
            className="dashboard-image"
          />
        </div>

        {/* Right Section - Cards with Fancy Design */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-3 text-white" style={{ background: 'linear-gradient(135deg, #ff9800, #f44336)' }}>
          <div className="text-center mb-5">
            <h1 className="display-4 text-light font-weight-bold">Student Dashboard</h1>
            <p className="lead fw-semibold">Navigate through your portal with ease and speed.</p>
          </div>

          

          {/* First Card */}
          <div className="card mb-4 shadow-lg border-0 rounded-3 hover-effect card-custom">
            <div className="card-body text-center">
              <div className="icon-container mb-2">
                <img
                  src={test}
                  className="mb-3 card-icon"
                />
              </div>
              <h5 className="card-title">Take a Test</h5>
              <p className="card-text text-dark fw-semibold">
                Ready to test your knowledge? Start your exam now.
              </p>
              <Link to="/take-test" className="btn btn-primary btn-lg shadow-lg rounded-pill">
                Start Test
              </Link>
            </div>
          </div>

          {/* Second Card */}
          <div className="card shadow-lg border-0 rounded-3 hover-effect card-custom">
            <div className="card-body text-center">
              <div className="icon-container mb-2">
                <img
                  src={sub}
                  className="mb-3 card-icon"
                />
              </div>
              <h5 className="card-title">My Submissions</h5>
              <p className="card-text fw-semibold text-dark">
                View and manage your past submissions, see feedback.
              </p>
              <Link to="/my-submissions" className="btn btn-primary btn-lg shadow-lg rounded-pill">
                View Submissions
              </Link>
            </div>
          </div>
          {/* Logout Button */}
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger-outline btn-lg fw-bold text-warning shadow-lg rounded-pill" onClick={handleLogout}>
              Log-out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
