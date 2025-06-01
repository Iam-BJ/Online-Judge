// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
