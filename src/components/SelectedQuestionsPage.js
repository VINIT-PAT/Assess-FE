import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImg from '../assets/images/7990.jpg';
import './QuestionList.css';

const SelectedQuestionsPage = ({ selectedQuestions, onDeselect }) => {
  const navigate = useNavigate();

  const handleDeselect = (questionId) => {
    const updatedQuestions = selectedQuestions.filter((q) => q._id !== questionId);
    onDeselect(updatedQuestions);
  };

  const handleSetTest = () => {
    navigate('/teacher-dashboard');
  };

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
        <h1
          className="text-center mb-4 fancy-title"
        
        >
          Selected Questions
        </h1>
        {selectedQuestions.length === 0 ? (
          <Alert variant="info" className="text-center mt-5">
            No questions selected.
          </Alert>
        ) : (
          <Row className="g-4">
            {selectedQuestions.map((question) => (
              <Col md={6} lg={4} key={question._id}>
                <Card
                  className="shadow-lg question-card border-selected"
                  style={{
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title className="text-truncate">{question.title}</Card.Title>
                    </div>
                    <Card.Text className="question-description">
                      {question.description}
                    </Card.Text>
                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeselect(question._id)}
                        className="fancy-btn"
                      >
                        Deselect
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <div className="text-center mt-5">
          <Link to="/questions">
            <Button variant="info" size="lg" className="px-5 fancy-btn">
              Go Back to Questions
            </Button>
          </Link>
          <Button
            variant="success"
            size="lg"
            className="ms-3 px-5 fancy-btn"
            onClick={handleSetTest}
          >
            Set Test
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SelectedQuestionsPage;
