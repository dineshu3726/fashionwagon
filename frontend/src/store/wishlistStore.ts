import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: number[];
  toggle: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        set({ ids: ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id] });
      },
      isWishlisted: (id) => get().ids.includes(id),
    }),
    { name: 'fashionwagon-wishlist' }
  )
);
