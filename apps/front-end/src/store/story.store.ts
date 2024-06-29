import { create } from "zustand";
import {} from "";

interface Story {
  title: string;
  content: string;
  category: string;
}

interface DraftStories {
  story: Story[] | null;
  addStory: (story: Story) => void;
  removeStory: (index: number) => void;
}

export const draftStories = create<DraftStories>();
