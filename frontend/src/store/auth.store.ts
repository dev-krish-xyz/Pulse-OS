import { create } from 'zustand';
import type { User } from '../types/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

// Helper function to get user from localStorage
const getUserFromStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (userStr && token) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }
  return null;
};

// Initialize state from localStorage
const initialUser = getUserFromStorage();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  initializeAuth: () => {
    const user = getUserFromStorage();
    set({ user, isAuthenticated: !!user });
  },
}));
