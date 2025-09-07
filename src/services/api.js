import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('API request:', config.url, 'Token:', token || 'None');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  console.log('API response:', response.data);
  return response;
}, error => {
  console.error('API error:', error.response?.data || error.message);
  return Promise.reject(error);
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const getLeaves = async () => {
  const response = await api.get('/leaves');
  return response.data;
};

export const createLeave = async (leaveData) => {
  const response = await api.post('/leaves', leaveData);
  return response.data;
};

export const updateLeaveStatus = async (leaveId, status) => {
  const response = await api.put(`/leaves/${leaveId}/status`, { status });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export default api;