// src/zustand/user.store.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  updateUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
}));
