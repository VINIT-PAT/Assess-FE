import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './StudentSubmissions.css';

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false); // State to control modal visibility
  const [currentSubmission, setCurrentSubmission] = useState(null); // State to store current submission details
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/submissions/reviewed`);
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch submissions.');
        setLoading(false);
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleViewDetails = (submission) => {
    setCurrentSubmission(submission);
    setModalShow(true); // Show the modal
  };

  const goBackToDashboard = () => {
    navigate('/student-dashboard'); // Navigate to the student's dashboard
  };

  return (
    <div className="background-wrapper">
      <div className="content-wrapper">
        <Container className="student-submissions">
          <h1 className="text-center my-4 fancy-title">Reviewed Submissions</h1>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="fancy-alert">{error}</Alert>
          ) : (
            <Row className="justify-content-center">
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <Col md={12} key={submission._id} className="mb-4">
                    <Card className="fancy-card">
                      <Card.Body>
                        <Card.Title className="fancy-card-title">
                          <strong>Question:</strong> {submission.question?.title || 'No title available'}
                        </Card.Title>
                        <Card.Text className="fancy-card-text">
                          <strong>Code:</strong> <pre>{submission.code || 'No code submitted'}</pre>
                        </Card.Text>
                        <Card.Text className="fancy-card-text">
                          <strong>Output:</strong> {submission.output || 'No output available'}
                        </Card.Text>
                        <Card.Text className="fancy-card-text">
                          <strong>Marks:</strong> {submission.marks !== null ? submission.marks : 'Not graded yet'}
                        </Card.Text>
                        <Card.Text className="fancy-card-text">
                          <strong>Comments:</strong> {submission.comments || 'No comments'}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button variant="outline-warning" className="fancy-btn" onClick={() => handleViewDetails(submission)}>
                          View Details
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center">No reviewed submissions found.</p>
              )}
            </Row>
          )}

          <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Submission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentSubmission ? (
                <>
                  <h5><strong>Question:</strong> {currentSubmission.question?.title || 'No title available'}</h5>
                  <pre><strong>Code:</strong> {currentSubmission.code || 'No code submitted'}</pre>
                  <p><strong>Output:</strong> {currentSubmission.output || 'No output available'}</p>
                  <p><strong>Marks:</strong> {currentSubmission.marks !== null ? currentSubmission.marks : 'Not graded yet'}</p>
                  <p><strong>Comments:</strong> {currentSubmission.comments || 'No comments'}</p>
                </>
              ) : (
                <p>Loading details...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="text-center m-4">
            <Button variant="primary" onClick={goBackToDashboard}>
              Go Back to Dashboard
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentSubmissions;
