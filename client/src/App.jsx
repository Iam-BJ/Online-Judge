// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProblemsList from './components/ProblemsList';
import AddProblem from './components/AddProblem';
import EditProblem from './components/EditProblem';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Routes (Navbar + Footer included) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemsList />} />
          <Route path="/edit-problem/:id" element={<EditProblem />} />
        </Route>

        {/* Admin-Only Route (still inside layout) */}
        <Route
          path="/problems/add"
          element={
            <AdminRoute>
              <Layout />
              <AddProblem />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
