import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, deleteTask } from '../services/api';

function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              {task.title} - {task.status} - Due: {task.due_date}
            </div>
            {['SystemAdmin', 'Admin'].includes(user?.role) && (
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700"
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