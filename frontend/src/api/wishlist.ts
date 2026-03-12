import api from './axiosInstance';

export const getWishlist = () => api.get('/wishlist/');
export const toggleWishlist = (productId: number) =>
  api.post(`/wishlist/toggle/${productId}/`);
