import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface FetchStoriesParams {
  page: number;
  limit: number;
  category?: string;
}

interface Story {
  _id: string;
  title: string;
  thumbnail?: string;
  mdx: string;
  likes: number;
  category: string;
}

interface FetchStoriesResponse {
  data: Story[];
  totalCount: number;
}

interface StoryData {
  data: Story;
  authorDetails: {
    username: string;
    profile: string;
  };
}

const fetchStories = async ({
  page,
  limit,
  category,
}: FetchStoriesParams): Promise<FetchStoriesResponse> => {
  const response = await axios.get<FetchStoriesResponse>(
    `${import.meta.env.VITE_END_POINT}/v1/public/home`,
    {
      params: { page, limit, category },
    }
  );
  return response.data;
};

export const useStories = (
  page: number,
  limit: number,
  category?: string
): UseQueryResult<FetchStoriesResponse> => {
  return useQuery({
    queryKey: ["stories", page, limit, category],
    queryFn: () => fetchStories({ page, limit, category }),
  });
};

const fetchStory = async (id: string): Promise<StoryData> => {
  const response = await axios.get<StoryData>(
    `${import.meta.env.VITE_END_POINT}/v1/public/story/${id}`
  );
  return response.data;
};

export const useStoryWithId = (id: string): UseQueryResult<StoryData> => {
  return useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStory(id),
    staleTime: Infinity,
  });
};
