// src/components/ProblemsList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

export default function ProblemsList() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get('/problems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProblems(res.data);
      } catch (err) {
        setError('Failed to load problems');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    try {
      await API.delete(`/problems/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(problems.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete problem');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Problems List</h2>

      {user?.isAdmin && (
        <button
          onClick={() => navigate('/problems/add')}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Problem
        </button>
      )}

      {loading ? (
        <p>Loading problems...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul>
          {problems.map((problem) => (
            <li key={problem._id} className="border p-4 rounded mb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p>{problem.description.substring(0, 100)}...</p>
              </div>
              <div className="space-x-2 flex items-center">
                <button
                  onClick={() => navigate(`/solve/${problem._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Solve
                </button>
                {user?.isAdmin && (
                  <>
                    <button
                      onClick={() => navigate(`/edit-problem/${problem._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
