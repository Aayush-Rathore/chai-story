import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import apiInstance from "./apiInstance";
import { useToast } from "@/components/ui/use-toast";

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
  liked: boolean;
}

interface FetchStoriesResponse {
  data: Story[];
  totalCount: number;
}

interface StoryData {
  data: Story[];
  authorDetails: {
    username: string;
    profile: string;
  };
}

interface IPostResponse {
  successCode: string;
  successMessage: string;
  data: {
    totalLikes: number;
  };
}

const fetchStories = async ({
  page,
  limit,
  category,
}: FetchStoriesParams): Promise<FetchStoriesResponse> => {
  const response = await apiInstance.get<FetchStoriesResponse>(
    `/v1/public/home`,
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
    staleTime: Infinity,
  });
};

const fetchStory = async (id: string): Promise<StoryData> => {
  const response = await apiInstance.get<StoryData>(`/v1/public/story/${id}`);
  return response.data;
};

export const useStoryWithId = (id: string): UseQueryResult<StoryData> => {
  return useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStory(id),
    staleTime: Infinity,
  });
};

const Like = async ({ postId }: { postId: string }): Promise<IPostResponse> => {
  const response: AxiosResponse<IPostResponse> =
    await apiInstance.put<IPostResponse>(`/v1/post/like`, { postId });
  return response.data;
};

export const useLike = (): UseMutationResult<
  IPostResponse,
  AxiosError<{ error: string; message: string }>,
  { postId: string }
> => {
  const { toast } = useToast();
  return useMutation<
    IPostResponse,
    AxiosError<{ error: string; message: string }>,
    { postId: string }
  >({
    mutationFn: Like,
    onSuccess: (data: IPostResponse) => {
      toast({
        title: data.successCode,
        description: data.successMessage,
      });
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast({
        title: error.name,
        description: error.message,
      });
    },
  });
};

const Unlike = async ({
  postId,
}: {
  postId: string;
}): Promise<IPostResponse> => {
  const response: AxiosResponse<IPostResponse> =
    await apiInstance.put<IPostResponse>(`/v1/post/unlike`, { postId });
  return response.data;
};

export const useUnlike = (): UseMutationResult<
  IPostResponse,
  AxiosError<{ error: string; message: string }>,
  { postId: string }
> => {
  const { toast } = useToast();
  return useMutation<
    IPostResponse,
    AxiosError<{ error: string; message: string }>,
    { postId: string }
  >({
    mutationFn: Unlike,
    onSuccess: (data: IPostResponse) => {
      toast({
        title: data.successCode,
        description: data.successMessage,
      });
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast({
        title: error.name,
        description: error.message,
      });
    },
  });
};

const autoSave = async ({
  storyContent,
}: {
  storyContent: string;
}): Promise<IPostResponse> => {
  const response: AxiosResponse<IPostResponse> =
    await apiInstance.put<IPostResponse>(`/v1/files/autosave`, {
      storyContent,
    });
  return response.data;
};

export const useAutoSave = (): UseMutationResult<
  IPostResponse,
  AxiosError<{ error: string; message: string }>,
  { storyContent: string }
> => {
  const { toast } = useToast();
  return useMutation<
    IPostResponse,
    AxiosError<{ error: string; message: string }>,
    { storyContent: string }
  >({
    mutationFn: autoSave,
    onSuccess: (data: IPostResponse) => {
      toast({
        title: data.successCode,
        description: data.successMessage,
      });
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast({
        title: error.name,
        description: error.message,
      });
    },
  });
};
