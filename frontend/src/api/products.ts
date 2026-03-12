import api from './axiosInstance';

export const getProducts = (params?: Record<string, string | number>) =>
  api.get('/products/', { params });

export const getProduct = (id: number) => api.get(`/products/${id}/`);

export const getCategories = () => api.get('/products/categories/');
