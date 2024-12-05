import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SubmitSolution = () => {
  const { id } = useParams();  // This is the questionId
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submissions`, { questionId: id, code });
      alert('Submission successful!');
    } catch (error) {
      console.error('Error submitting solution:', error);
    }
  };

  return (
    <div>
      <h1>Submit Solution</h1>
      {question ? (
        <>
          <h3>Question: {question.title}</h3>
          <p>{question.description}</p>
        </>
      ) : (
        <p>Loading question...</p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitSolution;
