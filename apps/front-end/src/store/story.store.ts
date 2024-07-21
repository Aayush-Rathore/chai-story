import { create } from "zustand";

interface DraftStories {
  title: string;
  category: string;
  content: string;
  file: File | undefined;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
  setContent: (value: string) => void;
  setFile: (file: File) => void;
  clear: () => void;
}

const draftStories = create<DraftStories>((set) => ({
  title: "",
  category: "",
  content: "",
  file: undefined,
  setTitle: (value: string) => set(() => ({ title: value })),
  setCategory: (value: string) => set(() => ({ category: value })),
  setContent: (value: string) => set(() => ({ content: value })),
  setFile: (img: File) => set(() => ({ file: img })),
  clear: () =>
    set(() => ({
      title: "",
      category: "",
      content: "",
      file: undefined,
    })),
}));

export default draftStories;
