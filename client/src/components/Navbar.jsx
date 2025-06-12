// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="space-x-4">
          {user && (
            <>
              <Link to="/problems" className="hover:underline">Problems</Link>
              <Link to="/dashboard" className="hover:underline">Profile</Link>
              <Link to="/submissions" className="hover:text-blue-500">My Submissions</Link>

            </>
          )}
        </div>
        {user && (
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
