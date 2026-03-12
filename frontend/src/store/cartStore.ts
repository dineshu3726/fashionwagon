import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.size === size
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { product, size, quantity: 1 }] }));
        }
      },
      removeItem: (productId, size) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        })),
      updateQuantity: (productId, size, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((s, i) => s + i.product.discounted_price * i.quantity, 0),
    }),
    { name: 'fashionwagon-cart' }
  )
);
