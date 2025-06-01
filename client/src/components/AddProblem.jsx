// src/components/AddProblem.jsx
import { useState } from 'react';
import API from '../api'; // axios instance or replace with fetch if needed
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddProblem = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // Make sure only admins can access this component
  if (!user?.isAdmin) {
    return <p className="text-center text-red-600 mt-10">Access denied. Admins only.</p>;
  }

  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'Easy', // default
    // add other fields you want for a problem
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/problems', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Problem created successfully');
      navigate('/problems'); // or wherever your problem list lives
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Problem</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Problem'}
        </button>
      </form>
    </div>
  );
};

export default AddProblem;
