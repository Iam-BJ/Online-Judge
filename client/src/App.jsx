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
import MySubmissions from './components/MySubmissions';
import CompilerPage from './components/CompilerPage'; // ✅ Add this line

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
          <Route path="/submissions" element={<MySubmissions />} />
          <Route path="/solve/:id" element={<CompilerPage />} /> {/* ✅ Solve route */}
        </Route>

        {/* Admin-Only Route inside Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/problems/add"
            element={
              <AdminRoute>
                <AddProblem />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
