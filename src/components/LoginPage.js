// LoginPage.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TeacherLogin from '../assets/images/Teacherbck.jpg'; // Import the image

const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { role } = useParams();
  const navigate = useNavigate();

  const handleLogin = () => {
    const defaultPassword = '1234';
    if (password === defaultPassword) {
      onLogin(role);
      navigate(role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Section with Image */}
          <div
            className="col-md-6 d-none d-md-block"
            style={{
              backgroundImage: `url(${TeacherLogin})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Right Section with Login Form */}
          <div
            className="col-md-6 d-flex align-items-center justify-content-center"
            style={{
              background: 'linear-gradient(135deg, #009C85, #006B5D)',
            }}
          >
            <div
              className="p-5 rounded shadow-lg"
              style={{
                width: '90%',
                maxWidth: '400px',
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <h2
                className="text-center mb-4"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
              >
                Welcome, {role === 'student' ? 'Student' : 'Teacher'}!
              </h2>
              <p
                className="text-center mb-4"
                style={{ color: '#ffffff', fontSize: '1.1rem' }}
              >
                Enter your password to continue
              </p>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '10px 15px',
                  }}
                />
              </div>
              <button
                onClick={handleLogin}
                className="btn w-100 mb-3"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#009C85',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: '20px',
                  padding: '10px',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#00E0B6')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#ffffff')
                }
              >
                Login
              </button>
              {error && (
                <p
                  className="text-danger text-center mt-3"
                  style={{ color: '#FFBABA', fontWeight: 'bold' }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
