import { create } from "zustand";

interface IAuthState {
  auth: {
    username: string;
    active: boolean;
  };
  setUsername: (name: string) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  auth: {
    username: "",
    active: false,
  },
  setUsername: (name: string) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
}));
