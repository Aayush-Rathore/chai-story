import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TSignUp, TSignIn } from "@/types/common.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useSignUp, useSignIn } from "@/api/authFunction";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import formValidation from "@/validations/form.validations";
import { useForm } from "react-hook-form";
import useStore from "@/store/zustand.store";
import Cookies from "js-cookie";

function DialogBox({ children }: { children: React.ReactNode }) {
  const signUpForm = useForm<TSignUp>({
    resolver: zodResolver(formValidation.SignUp),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const signInForm = useForm<TSignIn>({
    resolver: zodResolver(formValidation.SignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPassVisible, setPassVisible] = useState<boolean>(false);

  const { setUser } = useStore((e) => e);

  const { mutate: SignUp, data: signUpData } = useSignUp();
  const { mutate: SignIn, data: signInData } = useSignIn();

  useEffect(() => {
    if (signUpData?.data) {
      setUser(signUpData.data.token);
    }
  }, [signUpData, setUser]);

  useEffect(() => {
    if (signInData?.data) {
      setUser(signInData.data.token);
      Cookies.set("userToken", signInData.data.token, { expires: 7 }); // Expires in 7 days
    }
  }, [signInData, setUser]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogDescription className="font-medium text-secondary-foreground">
            Welcome to Chai-Story{" "}
            <strong className="text-2xl ml-2">&#x1FAD7;</strong>
            <br /> Aap ki khani chai ke sath!{" "}
            <strong className="text-2xl ml-2">&#x1F643;</strong>
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signIn" className="min-w-[280px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign-In</TabsTrigger>
            <TabsTrigger value="signUp">Sign-Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <Card>
              <CardHeader>
                <CardTitle>Sing-In</CardTitle>
                <CardDescription>
                  Welcome chai lover, Start reading stories with your cup of
                  chai!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...signInForm}>
                  <form
                    onSubmit={signInForm.handleSubmit(
                      async (values: TSignIn) => {
                        SignIn(values);
                      }
                    )}
                    className="flex flex-col gap-3"
                  >
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              required
                              type={isPassVisible ? "text" : "password"}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription className="flex items-center gap-3">
                            <Checkbox
                              id="terms"
                              onClick={() => setPassVisible(!isPassVisible)}
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Show Password
                            </label>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Sign-In</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signUp">
            <Card>
              <CardHeader>
                <CardTitle>Sign-Up</CardTitle>
                <CardDescription>
                  Create a new account. It's free for chai lovers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...signUpForm}>
                  <form
                    onSubmit={signUpForm.handleSubmit((values: TSignUp) =>
                      SignUp(values)
                    )}
                    className="flex flex-col gap-3"
                  >
                    <FormField
                      control={signUpForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              required
                              type={isPassVisible ? "text" : "password"}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription className="flex items-center gap-3">
                            <Checkbox
                              id="terms"
                              onClick={() => setPassVisible(!isPassVisible)}
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Show Password
                            </label>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Sign-Up</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
