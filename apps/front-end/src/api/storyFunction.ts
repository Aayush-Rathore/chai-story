import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import apiInstance from "./apiInstance";
import { useToast } from "@/components/ui/use-toast";
import { TPublishStory } from "@/types/common.types";
import draftStories from "@/store/story.store";

interface FetchStoriesParams {
  filter: string;
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
  profile: string;
  username: string;
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
  filter,
  page,
  limit,
  category,
}: FetchStoriesParams): Promise<FetchStoriesResponse> => {
  const response = await apiInstance.get<FetchStoriesResponse>(
    `/v1/public/home`,
    {
      params: { page, limit, category, filter },
    }
  );
  return response.data;
};

export const useStories = (
  filter: string,
  page: number,
  limit: number,
  category?: string
): UseQueryResult<FetchStoriesResponse> => {
  return useQuery({
    queryKey: ["stories", page, limit, category],
    queryFn: () => fetchStories({ filter, page, limit, category }),
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

const publish = async (params: TPublishStory): Promise<IPostResponse> => {
  const response: AxiosResponse<IPostResponse> =
    await apiInstance.post<IPostResponse>(`/v1/post/publish`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 5000,
    });
  return response.data;
};

export const usePublishStory = (): UseMutationResult<
  IPostResponse,
  AxiosError<{ error: string; message: string }>,
  TPublishStory
> => {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clear = draftStories((e: any) => e.clear);
  return useMutation<
    IPostResponse,
    AxiosError<{ error: string; message: string }>,
    TPublishStory
  >({
    mutationFn: publish,
    onSuccess: (data: IPostResponse) => {
      toast({
        title: data.successCode,
        description: data.successMessage,
      });
      clear();
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast({
        title: error.name,
        description: error.message,
      });
    },
  });
};
