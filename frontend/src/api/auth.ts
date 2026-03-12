import api from './axiosInstance';

export const register = (data: {
  username: string; email: string;
  first_name: string; last_name: string; password: string;
}) => api.post('/users/register/', data);

export const login = (data: { username: string; password: string }) =>
  api.post('/users/login/', data);

export const getProfile = () => api.get('/users/profile/');
