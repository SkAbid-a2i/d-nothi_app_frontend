import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, getLeaves } from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await getTasks();
        const leavesData = await getLeaves();
        setTasks(tasksData);
        setLeaves(leavesData);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h3 className="text-xl font-semibold mb-4">Tasks</h3>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 bg-white rounded shadow">
            {task.title} - {task.status} - Due: {task.due_date}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-4 mt-6">Leaves</h3>
      <ul className="space-y-2">
        {leaves.map(leave => (
          <li key={leave.id} className="p-4 bg-white rounded shadow">
            {leave.reason} - {leave.start_date} to {leave.end_date} - {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;