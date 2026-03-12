export interface ProductImage {
  id: number;
  image: string;
  is_primary: boolean;
}

export interface Category {
  id: number;
  name: string;
  gender: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: Category;
  description: string;
  price: number;
  discount_percent: number;
  discounted_price: number;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  review_count: number;
  images: ProductImage[];
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Address {
  id?: number;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
}

export interface Order {
  id: number;
  status: string;
  total_amount: number;
  shipping_address: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
}
