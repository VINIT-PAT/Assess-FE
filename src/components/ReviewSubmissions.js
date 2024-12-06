import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reviewback from "../assets/images/Ques3.jpg"; // Correct the file path and extension

// Set the base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL ;

// Styled Components
const BackgroundWrapper = styled.div`
  background-image: url(${reviewback});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
`;

const CustomContainer = styled(Container)`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  color: #333;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  color: teal;
  font-weight: bold;
`;

const ReviewedRibbon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #00796b;
  color: white;
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const StyledCard = styled(Card)`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ButtonStyled = styled(Button)`
  &.btn-primary {
    background-color: #005f73;
    border-color: #005f73;
  }
  &.btn-primary:hover {
    background-color: #004b5e;
    border-color: #004b5e;
  }
  &.btn-danger {
    background-color: #e63946;
    border-color: #e63946;
  }
  &.btn-danger:hover {
    background-color: #c62828;
    border-color: #c62828;
  }
`;

// Component for Reviewing Submissions
const ReviewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  // Fetch submissions from the backend
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/submissions`);
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    fetchSubmissions();
  }, []);

  // Assign Marks and Comments
  const handleAssignMarksAndComments = async (submissionId) => {
    const submission = submissions.find((sub) => sub._id === submissionId);
    if (!submission) return;

    try {
      await axios.put(`${API_BASE_URL}/submissions/${submissionId}/marks`, {
        marks: submission.marks,
        comments: submission.comments,
      });

      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === submissionId ? { ...sub, reviewed: true } : sub
        )
      );

      alert("Marks and comments assigned successfully!");
    } catch (error) {
      console.error("Error assigning marks and comments:", error);
      alert("Failed to assign marks and comments. Please try again.");
    }
  };

  // Handle Input Changes
  const handleInputChange = (submissionId, field, value) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub._id === submissionId ? { ...sub, [field]: value } : sub
      )
    );
  };

  // Delete Submission
  const handleDeleteSubmission = async (submissionId) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/submissions/${submissionId}`);
      setSubmissions((prev) => prev.filter((sub) => sub._id !== submissionId));
      alert("Submission deleted successfully!");
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission. Please try again.");
    }
  };

  // Navigate Back to Dashboard
  const goBackToDashboard = () => {
    navigate("/teacher-dashboard");
  };

  return (
    <BackgroundWrapper>
      <CustomContainer>
        <Title>Review Submissions</Title>

        {submissions.map((submission) => {
          const isReviewed = submission.reviewed;

          return (
            <StyledCard key={submission._id} className="mb-4 shadow position-relative">
              {isReviewed && <ReviewedRibbon>Reviewed</ReviewedRibbon>}
              <Card.Body>
                <Card.Title className="text-center">
                  <strong>Question:</strong> {submission.question?.title || "No question available"}
                </Card.Title>

                <Card.Text className="bg-light p-3 rounded">
                  <strong>Code:</strong>
                  <pre>{submission.code}</pre>
                </Card.Text>

                <Card.Text className="bg-light p-3 rounded">
                  <strong>Output:</strong>
                  {submission.output || "No output yet"}
                </Card.Text>

                <Form>
                  <Form.Group controlId={`marks-${submission._id}`} className="mb-3">
                    <Form.Label>Assign Marks</Form.Label>
                    <Form.Control
                      type="text"
                      value={submission.marks || ""}
                      onChange={(e) =>
                        handleInputChange(submission._id, "marks", e.target.value)
                      }
                      placeholder="Enter Marks"
                      style={{
                        backgroundColor: isReviewed ? "#e9ecef" : "white",
                        cursor: isReviewed ? "text" : "text",
                      }}
                      aria-label="Marks input field"
                    />
                  </Form.Group>

                  <Form.Group controlId={`comments-${submission._id}`} className="mb-3">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={submission.comments || ""}
                      onChange={(e) =>
                        handleInputChange(submission._id, "comments", e.target.value)
                      }
                      placeholder="Add Comments (optional)"
                      style={{
                        backgroundColor: isReviewed ? "#e9ecef" : "white",
                        cursor: isReviewed ? "text" : "text",
                      }}
                      aria-label="Comments input field"
                    />
                  </Form.Group>

                  <ButtonStyled
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={() => handleAssignMarksAndComments(submission._id)}
                  >
                    {isReviewed ? "Submit" : "Submit"}
                  </ButtonStyled>

                  <ButtonStyled
                    variant="danger"
                    className="w-100"
                    onClick={() => handleDeleteSubmission(submission._id)}
                  >
                    Delete Submission
                  </ButtonStyled>
                </Form>
              </Card.Body>
            </StyledCard>
          );
        })}

        <ButtonStyled
          variant="success"
          className="mb-4 w-100"
          onClick={goBackToDashboard}
        >
          Go Back to Teacher's Dashboard
        </ButtonStyled>
      </CustomContainer>
    </BackgroundWrapper>
  );
};

export default ReviewSubmissions;
