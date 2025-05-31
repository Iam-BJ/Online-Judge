// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/user/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {profile ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Admin:</strong> {profile.isAdmin ? 'Yes' : 'No'}</p>
          <button onClick={logout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
