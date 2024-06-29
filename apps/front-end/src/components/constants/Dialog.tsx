import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useState } from "react";
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
      id: "",
      password: "",
    },
  });

  const [isPassVisible, setPassVisible] = useState<boolean>(false);

  const { mutate: SignUp } = useSignUp();
  const { mutate: SignIn } = useSignIn();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Welcome to Chai-Story &#x1FAD7;</DialogTitle>
          <DialogDescription className="font-medium text-secondary-foreground">
            Aap ki khani chai ke sath!{" "}
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
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email or Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email or Username"
                              {...field}
                              required
                            />
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
