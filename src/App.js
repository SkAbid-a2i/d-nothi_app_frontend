import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CreateTask from './pages/tasks/CreateTask';
import CreateLeave from './pages/leaves/CreateLeave';
import TaskList from './pages/tasks/TaskList';
import LeaveList from './pages/leaves/LeaveList';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/tasks/create" element={user && ['SystemAdmin', 'Admin', 'Supervisor'].includes(user.role) ? <CreateTask /> : <Navigate to="/dashboard" />} />
        <Route path="/leaves/create" element={user && ['Agent'].includes(user.role) ? <CreateLeave /> : <Navigate to="/dashboard" />} />
        <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/login" />} />
        <Route path="/leaves" element={user ? <LeaveList /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default App;