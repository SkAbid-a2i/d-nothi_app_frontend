import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getLeaves, updateLeaveStatus } from '../../services/api';

function LeaveList() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leavesData = await getLeaves();
        setLeaves(leavesData);
      } catch (error) {
        setError(error.message || 'Error fetching leaves');
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      await updateLeaveStatus(leaveId, status);
      setLeaves(leaves.map(leave => leave.id === leaveId ? { ...leave, status } : leave));
    } catch (error) {
      setError(error.message || 'Error updating leave status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Leave List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {leaves.map(leave => (
          <li key={leave.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <p className="text-gray-600">From: {leave.start_date} To: {leave.end_date}</p>
              <p className="text-gray-600">Reason: {leave.reason}</p>
              <p className="text-sm text-gray-500">Status: {leave.status}</p>
            </div>
            {['SystemAdmin', 'Admin', 'Supervisor'].includes(user?.role) && (
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                  className="py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                  className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaveList;