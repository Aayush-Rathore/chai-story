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
import useStore from "@/store/zustand.store";

interface IAuthResponse {
  successCode: string;
  data: {
    img: string;
    token: string;
    id: string;
    username: string;
  };
  successMessage: string;
}

const SignUp = async (userData: TSignUp): Promise<IAuthResponse> => {
  const response: AxiosResponse<IAuthResponse> =
    await axios.post<IAuthResponse>(
      `${import.meta.env.VITE_END_POINT}/v1/auth/signup`,
      userData
    );
  return response.data;
};

export const useSignUp = (): UseMutationResult<
  IAuthResponse,
  AxiosError<{ error: string; message: string }>,
  TSignUp
> => {
  const { setUser } = useStore((state) => ({
    setUser: state.setUser,
  }));
  const { toast } = useToast();
  return useMutation<
    IAuthResponse,
    AxiosError<{ error: string; message: string }>,
    TSignUp
  >({
    mutationFn: SignUp,
    onSuccess: (data: IAuthResponse) => {
      setUser({
        img: data.data.img,
        id: data.data.id,
        token: data.data.token,
        username: data.data.username,
      });
      toast({
        title: data.successCode,
        description: data.successMessage,
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

const SignIn = async (userData: TSignIn): Promise<IAuthResponse> => {
  const response: AxiosResponse<IAuthResponse> =
    await axios.post<IAuthResponse>(
      `${import.meta.env.VITE_END_POINT}/v1/auth/login`,
      userData
    );
  return response.data;
};

export const useSignIn = (): UseMutationResult<
  IAuthResponse,
  AxiosError<{ error: string; message: string }>,
  TSignIn
> => {
  const { setUser } = useStore((state) => ({
    setUser: state.setUser,
  }));
  const { toast } = useToast();

  return useMutation<
    IAuthResponse,
    AxiosError<{ error: string; message: string }>,
    TSignIn
  >({
    mutationFn: SignIn,
    onSuccess: (data: IAuthResponse) => {
      setUser({
        img: data.data.img,
        id: data.data.id,
        token: data.data.token,
        username: data.data.username,
      });
      toast({
        title: data.successCode,
        description: data.successMessage,
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

const verifyEmail = async (
  token: string | undefined
): Promise<IAuthResponse> => {
  const response = await axios.get<IAuthResponse>(
    `${import.meta.env.VITE_END_POINT}/v1/auth/verifyEmail`,
    {
      params: { token },
    }
  );
  console.log(response.data);
  return response.data;
};

export const useVerifyEmail = (
  token: string | undefined
): UseQueryResult<IAuthResponse> => {
  // const { toast } = useToast();
  // toast({
  //   title: "Verifiying",
  //   description: "Please wait, While we are verifying your email",
  // });
  return useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
