import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">D-Nothi</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span>{user.username}</span>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AppBar;