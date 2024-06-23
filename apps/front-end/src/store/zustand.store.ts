import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const useStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
