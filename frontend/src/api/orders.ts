import api from './axiosInstance';

export const getOrders = () => api.get('/orders/');
export const getOrder = (id: number) => api.get(`/orders/${id}/`);
export const createOrder = (data: {
  shipping_address: string;
  items: { product_id: number; size: string; quantity: number; price: number }[];
}) => api.post('/orders/create/', data);
