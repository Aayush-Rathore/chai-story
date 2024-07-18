import { create } from "zustand";

interface User {
  id: string;
  img: string;
  token: string;
  username: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStore = create<UserState>((set: any) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useStore;
