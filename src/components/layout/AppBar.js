import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

function AppBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">D-Nothi</Link>
        {user && (
          <div className="flex space-x-4">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/tasks" className="hover:underline">Tasks</Link>
            <Link to="/leaves" className="hover:underline">Leaves</Link>
            <button
              onClick={logout}
              className="py-1 px-3 bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AppBar;