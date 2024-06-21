import { create } from "zustand";
import Cookies from "js-cookie";

type State = {
  userAuth: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
  // removeAllBears: () => void;
  // updateBears: (newBears: number) => void;
};

const useStore = create<State>((set) => ({
  userAuth: Cookies.get("userToken"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => set(() => ({ userAuth: user })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));

export default useStore;
