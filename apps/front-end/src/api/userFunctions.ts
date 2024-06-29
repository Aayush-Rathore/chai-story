import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import apiInstance from "./apiInstance";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";

interface UserDetailsResponse {
  successCode: string;
  successMessage: string;
  data: UserDetails[];
}

interface UserDetails {
  _id: string;
  username: string;
  email: string;
  img: string;
  isVerified: boolean;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

const getProfile = async (username: string): Promise<UserDetailsResponse> => {
  const response = await apiInstance.get<UserDetailsResponse>(
    `/v1/public/profile/${username}`
  );
  return response.data;
};

export const useProfile = (
  username: string
): UseQueryResult<UserDetailsResponse, Error> => {
  return useQuery<UserDetailsResponse, Error>({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    staleTime: Infinity,
  });
};

const follow = async ({ id }: { id: string }): Promise<UserDetailsResponse> => {
  const response: AxiosResponse<UserDetailsResponse> =
    await apiInstance.put<UserDetailsResponse>(`/v1/user/follow`, { id });
  return response.data;
};

export const useFollow = (): UseMutationResult<
  UserDetailsResponse,
  AxiosError<{ error: string; message: string }>,
  { id: string }
> => {
  const { toast } = useToast();
  return useMutation<
    UserDetailsResponse,
    AxiosError<{ error: string; message: string }>,
    { id: string }
  >({
    mutationFn: follow,
    onSuccess: (data: UserDetailsResponse) => {
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

const unfollow = async ({
  id,
}: {
  id: string;
}): Promise<UserDetailsResponse> => {
  const response: AxiosResponse<UserDetailsResponse> =
    await apiInstance.put<UserDetailsResponse>(`/v1/user/unfollow`, { id });
  return response.data;
};

export const useUnFollow = (): UseMutationResult<
  UserDetailsResponse,
  AxiosError<{ error: string; message: string }>,
  { id: string }
> => {
  const { toast } = useToast();
  return useMutation<
    UserDetailsResponse,
    AxiosError<{ error: string; message: string }>,
    { id: string }
  >({
    mutationFn: unfollow,
    onSuccess: (data: UserDetailsResponse) => {
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
