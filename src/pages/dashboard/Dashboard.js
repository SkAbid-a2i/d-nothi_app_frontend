import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getTasks, getLeaves } from '../../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        const leavesData = await getLeaves();
        setLeaves(leavesData);
      } catch (error) {
        setError(error.message || 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}</h2>
        <p className="text-gray-600">Role: {user?.role}</p>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Tasks</h3>
            {['SystemAdmin', 'Admin', 'Supervisor'].includes(user?.role) && (
              <Link to="/tasks/create" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Create Task
              </Link>
            )}
          </div>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="p-4 bg-white rounded shadow">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">Status: {task.status}, Priority: {task.priority}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Leaves</h3>
            {['Agent'].includes(user.role) && (
              <Link to="/leaves/create" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Request Leave
              </Link>
            )}
          </div>
          <ul className="space-y-2">
            {leaves.map(leave => (
              <li key={leave.id} className="p-4 bg-white rounded shadow">
                <p className="text-gray-600">From: {leave.start_date} To: {leave.end_date}</p>
                <p className="text-gray-600">Reason: {leave.reason}</p>
                <p className="text-sm text-gray-500">Status: {leave.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;