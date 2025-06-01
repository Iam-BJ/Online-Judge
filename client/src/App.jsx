// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProblemsList from './components/ProblemsList';
import AddProblem from './components/AddProblem';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import EditProblem from './components/EditProblem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/add"
          element={
            <AdminRoute>
              <AddProblem />
            </AdminRoute>
          }
        />
        <Route path="/edit-problem/:id" element={<ProtectedRoute><EditProblem /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
