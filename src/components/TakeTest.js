import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import styled, { createGlobalStyle } from 'styled-components';
import testback from '../assets/images/testback3.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${testback});
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  max-width: 800px;
  padding: 30px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.8), rgba(244, 67, 54, 0.8));
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: white;
  margin: 30px auto;
`;

const QuestionContainer = styled.div`
  margin-bottom: 25px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 12px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #555;
  font-size: 16px;
`;

const EditorContainer = styled.div`
  margin-bottom: 20px;
  height: 300px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ExecuteButton = styled(Button)`
  margin-left: 15px;
`;

const OutputContainer = styled.div`
  margin-top: 25px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f0f0f0;
  height: 220px;
  border-radius: 12px;
  color: black;
`;

const OutputTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const OutputText = styled.pre`
  white-space: pre-wrap;
  font-size: 16px;
`;

const Notification = styled.div`
  background-color: ${(props) => (props.success ? 'green' : 'red')};
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 16px;
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const ConfirmationDialog = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const EndTestButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const TakeTest = ({ selectedQuestions = [] }) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testEnded, setTestEnded] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (selectedQuestions.length > 0) {
      const initialResponses = selectedQuestions.map((question) => ({
        questionId: question._id,
        code: '',
        output: 'No output yet.',
        error: null,
      }));
      setResponses(initialResponses);
    }
  }, [selectedQuestions]);

  if (!selectedQuestions.length) {
    return <p>No questions selected for the test.</p>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleEditorChange = (newValue, questionId) => {
    setResponses((prevResponses) =>
      prevResponses.map((res) =>
        res.questionId === questionId ? { ...res, code: newValue } : res
      )
    );
  };

  const handleExecute = async (questionId) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const responseItem = responses.find((res) => res.questionId === questionId);
      const payload = {
        script: responseItem.code || '',
        language: 'python3',
        versionIndex: '0',
      };

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/execute`, payload);
      const updatedResponses = responses.map((res) =>
        res.questionId === questionId ? { ...res, output: response.data.output || 'Execution completed.' } : res
      );
      setResponses(updatedResponses);
    } catch (error) {
      console.error('Error executing code:', error);
      setErrorMessage('Failed to execute. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {testEnded ? (
          <Notification success={true} show={true}>
            Test has been ended. You have completed all questions.
          </Notification>
        ) : (
          <QuestionContainer key={currentQuestion._id}>
            <Title>{currentQuestion.questionTitle || 'Untitled Question'}</Title>
            <Description>{currentQuestion.questionDescription || 'No description available.'}</Description>
            <EditorContainer>
              <MonacoEditor
                height="300"
                language="python"
                value={responses[currentQuestionIndex]?.code}
                onChange={(newValue) =>
                  handleEditorChange(newValue, currentQuestion._id)
                }
              />
            </EditorContainer>
            <div>
              <Button onClick={() => handleExecute(currentQuestion._id)} disabled={loading}>
                Execute
              </Button>
            </div>
            <OutputContainer>
              <OutputTitle>Output:</OutputTitle>
              <OutputText>{responses[currentQuestionIndex]?.output || 'No output yet.'}</OutputText>
            </OutputContainer>
            {errorMessage && <Notification success={false} show={true}>{errorMessage}</Notification>}
            {successMessage && <Notification success={true} show={true}>{successMessage}</Notification>}
          </QuestionContainer>
        )}
        <NavigationButtons>
          <Button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.min(selectedQuestions.length - 1, prev + 1))
            }
            disabled={currentQuestionIndex === selectedQuestions.length - 1}
          >
            Next
          </Button>
        </NavigationButtons>
        {!testEnded && (
          <EndTestButtonContainer>
            <Button onClick={() => setTestEnded(true)}>End Test</Button>
          </EndTestButtonContainer>
        )}
      </Container>
    </>
  );
};

export default TakeTest;
