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

const TakeTest = ({ selectedQuestions = [] }) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const initialResponses = selectedQuestions.map((question) => ({
      questionId: question._id,
      code: '',
      output: 'No output yet.',
      error: null,
    }));
    setResponses(initialResponses);
  }, [selectedQuestions]);

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleEditorChange = (newValue, questionId) => {
    setResponses((prev) =>
      prev.map((res) => (res.questionId === questionId ? { ...res, code: newValue } : res))
    );
  };

  const handleExecute = async (questionId) => {
    setLoading(true);
    try {
      const responseItem = responses.find((res) => res.questionId === questionId);
      const payload = {
        script: responseItem.code || '',
        language: 'python3',
        versionIndex: '0',
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/execute`,
        payload
      );

      setResponses((prev) =>
        prev.map((res) =>
          res.questionId === questionId
            ? { ...res, output: response.data.output || 'Execution completed.' }
            : res
        )
      );
    } catch (error) {
      console.error('Execution error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {currentQuestion ? (
          <QuestionContainer key={currentQuestion._id}>
            <Title>{currentQuestion.title || 'Untitled Question'}</Title>
            <Description>{currentQuestion.description || 'No description provided.'}</Description>
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
            <Button onClick={() => handleExecute(currentQuestion._id)} disabled={loading}>
              Execute
            </Button>
          </QuestionContainer>
        ) : (
          <p>No questions available.</p>
        )}
      </Container>
    </>
  );
};

export default TakeTest;
