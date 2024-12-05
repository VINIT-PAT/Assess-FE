import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = ({ userRole }) => {
  return (
    <div>
      <h1>Coding Challenge Platform</h1>
      {userRole === 'teacher' && (
        <div>
          <h2>Teacher Dashboard</h2>
          <ul>
            <li><Link to="/add-question">Add Question</Link></li>
            <li><Link to="/questions">View Questions</Link></li>
            <li><Link to="/review-submissions">Review Submissions</Link></li>
          </ul>
        </div>
      )}
      {userRole === 'student' && (
        <div>
          <h2>Student Dashboard</h2>
          <ul>
            <li><Link to="/my-submissions">My Submissions</Link></li>
            <li><Link to="/take-test">Take Test</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
