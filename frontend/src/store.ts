// TaleWeaver frontend - AGPLv3
import create from "zustand";

type AuthState = {
  token: string | null;
  userEmail: string | null;
  setAuth: (token: string, email: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userEmail: null,
  setAuth: (token, email) => set({ token, userEmail: email }),
  clear: () => set({ token: null, userEmail: null })
}));

export const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";
