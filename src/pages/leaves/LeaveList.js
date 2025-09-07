import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getLeaves, updateLeaveStatus } from '../services/api';

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
        setError(error.response?.data?.message || 'Error fetching leaves');
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, status) => {
    try {
      await updateLeaveStatus(leaveId, status);
      setLeaves(leaves.map(leave => leave.id === leaveId ? { ...leave, status } : leave));
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating leave status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Leaves</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-2">
        {leaves.map(leave => (
          <li key={leave.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              {leave.reason} - {leave.start_date} to {leave.end_date} - {leave.status}
            </div>
            {['SystemAdmin', 'Admin', 'Supervisor'].includes(user?.role) && (
              <div>
                <button
                  onClick={() => handleStatusChange(leave.id, 'Approved')}
                  className="text-green-500 hover:text-green-700 mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(leave.id, 'Rejected')}
                  className="text-red-500 hover:text-red-700"
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