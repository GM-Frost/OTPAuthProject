import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
  },
  setUsername: (name: string) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
}));
