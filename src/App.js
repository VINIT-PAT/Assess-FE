import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Component Imports
import Lander from './components/Lander';
import RoleSelection from './components/RoleSelection';
import LoginPage from './components/LoginPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import AddQuestionForm from './components/AddQuestionForm';
import QuestionList from './components/QuestionList';
import ReviewSubmissions from './components/ReviewSubmissions';
import StudentSubmissions from './components/StudentSubmissions';
import TakeTest from './components/TakeTest';
import SubmitSolution from './components/SubmitSolution';
import SelectedQuestionsPage from './components/SelectedQuestionsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'teacher' or 'student'
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  return (
    <Router basename="/Assess-FE"> {/* Set the base path here */}
      <div>
        <Routes>
          <Route path="/" element={<Lander />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login/:role" element={<LoginPage onLogin={handleLogin} />} />

          {/* Teacher Routes */}
          {isAuthenticated && userRole === 'teacher' ? (
            <>
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/add-question" element={<AddQuestionForm />} />
              <Route path="/review-submissions" element={<ReviewSubmissions />} />
              <Route
                path="/questions"
                element={
                  <QuestionList onSelect={setSelectedQuestions} selectedQuestions={selectedQuestions} />
                }
              />
              <Route
                path="/selected-questions"
                element={<SelectedQuestionsPage selectedQuestions={selectedQuestions} onDeselect={setSelectedQuestions} />}
              />
            </>
          ) : (
            <Route path="/teacher-dashboard" element={<Navigate to="/" />} />
          )}

          {/* Student Routes */}
          {isAuthenticated && userRole === 'student' ? (
            <>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/take-test" element={<TakeTest selectedQuestions={selectedQuestions} />} />
              <Route path="/my-submissions" element={<StudentSubmissions />} />
              <Route path="/submit-solution/:id" element={<SubmitSolution />} />
            </>
          ) : (
            <Route path="/student-dashboard" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
