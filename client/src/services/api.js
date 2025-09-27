import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const taskAPI = {
  // Lấy danh sách tasks
  getTasks: (params) => api.get('/tasks', { params }),
  
  // Tạo task mới
  createTask: (taskData) => api.post('/tasks', taskData),
  
  // Cập nhật task
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  
  // Xóa task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  // Lấy thống kê
  getStats: () => api.get('/tasks/stats')
};