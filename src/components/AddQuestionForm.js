import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backimage from '../assets/images/Ques2.jpg'; // Ensure the correct path to the background image
require('dotenv').config();

const AddQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/questions`, {
        title,
        description,
        difficulty,
      });
      setNotification({
        show: true,
        message: 'Question successfully added!',
        variant: 'success',
      });
      setTitle('');
      setDescription('');
      setDifficulty('');
    } catch (error) {
      setNotification({
        show: true,
        message: 'Error adding question. Please try again.',
        variant: 'danger',
      });
    }
  };

  const handleViewQuestions = () => {
    navigate('/questions');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left Section - Form */}
      <div
        style={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          background: 'linear-gradient(to bottom right, #0CA85C, #098E4B, #046838)', // Gradient background
          color: 'white',
        }}
      >
        <div
          className="container p-4 rounded"
          style={{
            background: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white overlay
            color: 'white',
            maxWidth: '500px',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)', // Frosted glass effect
          }}
        >
          <h2 className="text-center mb-4">Add a New Question</h2>

          {/* Notification Alert */}
          {notification.show && (
            <Alert
              variant={notification.variant}
              onClose={() => setNotification({ show: false, message: '', variant: '' })}
              dismissible
            >
              {notification.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className="form-group mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Field */}
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                className="form-control"
                rows="4"
                placeholder="Enter question description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Difficulty Field */}
            <div className="form-group mb-4">
              <label htmlFor="difficulty" className="form-label">
                Difficulty:
              </label>
              <select
                id="difficulty"
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select difficulty level
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Buttons Section */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-light btn-lg px-4"
                style={{
                  color: '#0CA85C',
                  border: '2px solid white',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A1D9D0')} // Lighter shade on hover
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                Add Question
              </button>

              {/* View Questions Button */}
              <button
                type="button"
                className="btn btn-light btn-lg px-4 ms-4"
                style={{
                  color: '#0CA85C',
                  border: '2px solid white',
                  transition: 'all 0.3s',
                }}
                onClick={handleViewQuestions}
              >
                View Questions
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div
        style={{
          flex: '1 1 50%',
          backgroundImage: `url(${backimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Media Query for Responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='flex: 1 1 50%'] {
            flex: 1 1 100%;
          }
          div[style*='background: rgba(255, 255, 255, 0.15)'] {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddQuestionForm;
