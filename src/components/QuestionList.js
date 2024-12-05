import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Modal,
  Badge,
} from 'react-bootstrap';
import './QuestionList.css'; // Custom styles
import backgroundImg from '../assets/images/Ques4.jpg';

const QuestionList = ({ onSelect, selectedQuestions = [] }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL; // Get the base URL from environment variables

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${BASE_URL}/api/questions`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching questions');
      setLoading(false);
    }
  };

  const handleQuestionSelect = (question) => {
    if (!selectedQuestions.some((q) => q._id === question._id)) {
      const updatedQuestions = [...selectedQuestions, question];
      onSelect(updatedQuestions);
    }
  };

  const handleQuestionDeselect = (questionId) => {
    const updatedQuestions = selectedQuestions.filter((q) => q._id !== questionId);
    onSelect(updatedQuestions);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`${BASE_URL}/api/questions/${deleteTarget}`);
      setQuestions(questions.filter((q) => q._id !== deleteTarget));
      setDeleteTarget(null);
      setShowModal(false);
    } catch (error) {
      setError('Error deleting question');
    }
  };

  const handleGoToSelectedQuestions = () => {
    navigate('/selected-questions');
  };

  const handleGoToAddQuestion = () => {
    navigate('/add-question');
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="grow" variant="info" />
        <p className="mt-3" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00947E' }}>
          Loading questions...
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container className="my-5">
        <h1 className="text-center mb-4 fancy-title display-5 fw-bold">Questions Management</h1>
        <Row className="g-4">
          {questions.map((question) => {
            const isSelected = selectedQuestions.some((q) => q._id === question._id);
            return (
              <Col md={6} lg={4} key={question._id}>
                <Card
                  className={`shadow-lg question-card ${
                    isSelected ? 'border-selected' : 'border-unselected'
                  }`}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title className="text-truncate">{question.title}</Card.Title>
                      <Badge
                        pill
                        bg={
                          question.difficulty === 'Easy'
                            ? 'success'
                            : question.difficulty === 'Medium'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    <Card.Text className="question-description">{question.description}</Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant={isSelected ? 'outline-danger' : 'outline-primary'}
                        onClick={() =>
                          isSelected
                            ? handleQuestionDeselect(question._id)
                            : handleQuestionSelect(question)
                        }
                        className="fancy-btn"
                      >
                        {isSelected ? 'Deselect' : 'Select'}
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setShowModal(true);
                          setDeleteTarget(question._id);
                        }}
                        className="fancy-btn"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="text-center mt-4">
          <Button
            variant="info"
            size="lg"
            className="me-3 px-5 mt-2 fancy-btn"
            onClick={handleGoToAddQuestion}
          >
            Add New Question
          </Button>
          <Button
            variant="info"
            size="lg"
            className="px-5 mt-2 fancy-btn"
            onClick={handleGoToSelectedQuestions}
            disabled={selectedQuestions.length === 0}
          >
            View Selected Questions
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this question? This action cannot be undone.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

QuestionList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedQuestions: PropTypes.arrayOf(PropTypes.object),
};

export default QuestionList;
