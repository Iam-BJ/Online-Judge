// src/pages/CompilerPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompilerPage = () => {
  const { id } = useParams(); // Problem ID from URL
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/api/problems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProblem(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:3000/api/submissions`,
        { problem: id, language, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Submitted successfully!');
      setTimeout(() => navigate('/submissions'), 1000); // Redirect to submissions
    } catch (err) {
      console.error(err);
      setMessage('Submission failed.');
    }
  };

  if (!problem) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <p className="mb-4 whitespace-pre-line">{problem.description}</p>

      <label className="block font-semibold mb-2">Select Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={15}
        className="w-full p-2 border rounded mb-4 font-mono"
        placeholder="Write your code here..."
      ></textarea>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Code
      </button>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default CompilerPage;
