import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, access: string, refresh: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      setAuth: (user, access, refresh) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        set({ user, accessToken: access });
      },
      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, accessToken: null });
      },
      isAuthenticated: () => !!get().accessToken,
    }),
    { name: 'fashionwagon-auth' }
  )
);
