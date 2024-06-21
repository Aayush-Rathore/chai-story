import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TSignIn, TSignUp } from "@/types/common.types";
import Cookies from "js-cookie";

interface ISignupResponse {
  successCode: string;
  data: {
    message: string;
    token: string;
    user: object;
  };
  successMessage: string;
}

interface IVerifyEmailResponse {
  successCode: string;
  successMessage: string;
}

const SignUp = async (userData: TSignUp): Promise<ISignupResponse> => {
  const response: AxiosResponse<ISignupResponse> =
    await axios.post<ISignupResponse>(
      `${import.meta.env.VITE_END_POINT}/v1/auth/signup`,
      userData
    );
  return response.data;
};

export const useSignUp = (): UseMutationResult<
  ISignupResponse,
  AxiosError<{ error: string; message: string }>,
  TSignUp
> => {
  const { toast } = useToast();

  return useMutation<
    ISignupResponse,
    AxiosError<{ error: string; message: string }>,
    TSignUp
  >({
    mutationFn: SignUp,
    onSuccess: (data: ISignupResponse) => {
      toast({
        title: data.successMessage,
        description: data.data.message,
      });
      Cookies.set("userToken", data.data.token, { expires: 1 });
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      const errorResponse = error.response?.data;
      if (errorResponse) {
        toast({
          title: errorResponse.error,
          description: errorResponse.message,
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check the credentials and try again!",
        });
      }
    },
  });
};

const SignIn = async (userData: TSignIn): Promise<ISignupResponse> => {
  console.log(userData);
  return {
    successCode: "Hello",
    data: {
      message: "Hello",
      token: "Hello",
      user: {},
    },
    successMessage: "Hello",
  };
};

export const useSignIn = (): UseMutationResult<
  ISignupResponse,
  AxiosError<{ error: string; message: string }>,
  TSignIn
> => {
  const { toast } = useToast();

  return useMutation<
    ISignupResponse,
    AxiosError<{ error: string; message: string }>,
    TSignIn
  >({
    mutationFn: SignIn,
    onSuccess: (data: ISignupResponse) => {
      toast({
        title: data.successMessage,
        description: data.data.message,
      });
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      const errorResponse = error.response?.data;
      if (errorResponse) {
        toast({
          title: errorResponse.error,
          description: errorResponse.message,
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check the credentials and try again!",
        });
      }
    },
  });
};

const verifyEmail = async (
  token: string | undefined
): Promise<IVerifyEmailResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_END_POINT}/v1/auth/verifyEmail`,
    {
      params: { token },
    }
  );
  return response.data;
};

export const useVerifyEmail = (
  token: string | undefined
): UseQueryResult<IVerifyEmailResponse> => {
  return useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token),
    staleTime: Infinity,
  });
};
