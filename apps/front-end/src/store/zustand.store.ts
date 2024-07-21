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

const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
}));

export default useStore;
