import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/tasks" className="block p-2 hover:bg-gray-700 rounded">Tasks</Link>
        </li>
        <li>
          <Link to="/leaves" className="block p-2 hover:bg-gray-700 rounded">Leaves</Link>
        </li>
        <li>
          <Link to="/leaves/calendar" className="block p-2 hover:bg-gray-700 rounded">Leave Calendar</Link>
        </li>
        {['SystemAdmin', 'Admin', 'Supervisor'].includes(user?.role) && (
          <li>
            <Link to="/tasks/create" className="block p-2 hover:bg-gray-700 rounded">Create Task</Link>
          </li>
        )}
        {['Agent'].includes(user?.role) && (
          <li>
            <Link to="/leaves/create" className="block p-2 hover:bg-gray-700 rounded">Request Leave</Link>
          </li>
        )}
        {user?.role === 'SystemAdmin' && (
          <li>
            <Link to="/users/create" className="block p-2 hover:bg-gray-700 rounded">Create User</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;