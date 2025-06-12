// client/src/components/MySubmissions.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/submissions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error('Failed to fetch submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading submissions...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} className="p-4 border rounded shadow">
              <p><strong>Problem:</strong> {sub.problem?.title || 'Untitled'}</p>
              <p><strong>Language:</strong> {sub.language}</p>
              <p><strong>Verdict:</strong> {sub.verdict}</p>
              <p><strong>Submitted:</strong> {new Date(sub.createdAt).toLocaleString()}</p>
              {/* Optional: add a detail page later */}
              {/* <Link to={`/submissions/${sub._id}`} className="text-blue-500 underline">View Code</Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySubmissions;
