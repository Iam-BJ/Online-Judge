import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

export default function EditProblem() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(`/problems/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDifficulty(res.data.difficulty || '');
      } catch (err) {
        setError('Failed to fetch problem');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `/problems/${id}`,
        { title, description, difficulty },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Problem updated successfully');
      navigate('/problems');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update problem');
    }
  };

  if (loading) return <p>Loading problem...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Problem</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Problem
        </button>
      </form>
    </div>
  );
}
