// Lander.js
import React from 'react';
import { Link } from 'react-router-dom';
import Exicon from "../assets/images/Exam-logo.jpg";

function Lander() {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-6 align-self-center p-5">
          <div className='Justify-content-start'>
            <h1 className="display-1 ps-1"><strong>Welcome to Assess!</strong></h1>
            <p className='blockquote fs-4 p-3'>
              Welcome to our Practical Coding Exam Portal! Here, you'll embark on a hands-on journey to showcase your coding prowess.
              Get ready to tackle real-world challenges, hone your skills, and unleash your potential.
              Best of luck on your coding journey!
            </p>
          </div>
          <div className='pt-2'>
            <Link to="/role-selection">
              <button type="button" className="btn btn-dark fw-bold ms-3">
                Start Journey!
              </button>
            </Link>
            <br />
            <br />
            <button type="button" className="btn btn-lg me-4">
              <i className="bi bi-building-gear"></i> Dashboard
            </button>
            <button type="button" className="btn btn-lg me-4">
              <i className="bi bi-question-square-fill"></i> Help
            </button>
            <button type="button" className="btn btn-lg me-4">
              <i className="bi bi-exclamation-square-fill"></i> Report Issue
            </button>
          </div>
        </div>
        <div className="col-md-6 align-self-center">
          <img src={Exicon} alt="Exam" className='img-fluid' />
        </div>
      </div>
    </div>
  );
}

export default Lander;
