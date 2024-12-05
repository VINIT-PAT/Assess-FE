import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import question from '../assets/images/question.jpg';
import list from '../assets/images/List1.jpg';
import submission from '../assets/images/submission.jpg';
import back from '../assets/images/back2.jpg';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or authentication tokens if needed
    navigate('/role-selection');
  };

  const styles = {
    dashboard: {
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: '2rem',
    },
    card: {
      background: 'linear-gradient(to bottom right, #10AC51, #009C85)',
      color: 'white',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
    image: {
      maxHeight: '120px',
      borderRadius: '10px',
    },
    header: {
      color: '#10AC51',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.dashboard}>
      <div className="text-center mb-5">
        <h1 className="display-3" style={styles.header}>
          Teacher Dashboard
        </h1>
        <p className="lead text-muted">
          Manage your exams, questions, and student submissions effortlessly.
        </p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {[
            {
              image: question,
              title: 'Add Question',
              description: 'Create questions to add to the exam repository.',
              link: '/add-question',
            },
            {
              image: list,
              title: 'View Questions',
              description: 'Browse and manage all the available questions.',
              link: '/questions',
            },
            {
              image: submission,
              title: 'Review Submissions',
              description: 'Evaluate and grade student submissions efficiently.',
              link: '/review-submissions',
            },
          ].map((card, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card shadow-lg h-100"
                style={styles.card}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
              >
                <div className="card-body text-center p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="img-fluid mb-3"
                    style={styles.image}
                    loading="lazy"
                  />
                  <h5 className="card-title fw-bold">{card.title}</h5>
                  <p className="card-text mb-4">{card.description}</p>
                  <Link to={card.link} className="btn btn-light btn-lg">
                    {card.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Need help?{' '}
            <Link to="/support" className="fw-bold" style={{ color: 'blue' }}>
              Contact Support
            </Link>
            .
          </p>
          <button
            onClick={handleLogout}
            className="btn btn-outline-dark btn-sm fw-bold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TeacherDashboard);
