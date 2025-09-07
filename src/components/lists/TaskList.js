import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Task List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}, Priority: {task.priority}</p>
              <p className="text-sm text-gray-500">Due: {task.due_date}</p>
            </div>
            {['SystemAdmin', 'Admin', 'Supervisor'].includes(user?.role) && (
              <button
                onClick={() => handleDelete(task.id)}
                className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;