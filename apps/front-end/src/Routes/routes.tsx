import { useVerification } from "@/api/authFunction";
import NotFound from "@/components/constants/NotFound";
import Editor from "@/pages/StoryEditor.page";
import useStore from "@/store/zustand.store";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home.page"));
const Stories = lazy(() => import("@/pages/Stories.page"));
const Story = lazy(() => import("@/pages/Story.page"));
const Profile = lazy(() => import("@/pages/Profile.page"));
const Verification = lazy(() => import("@/pages/Verification.page"));

const Routers = () => {
  const { data, status, isLoading } = useVerification();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setUser, user } = useStore((e: any) => e);
  useEffect(() => {
    if (data && status === "success") {
      setUser({
        img: data.data?.img,
        id: data.data?.id,
        token: data.data?.token,
        username: data.data?.username,
      });
    } else if (!data) {
      console.log("Not verified");
    }
  }, [data, status, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/stories" Component={Stories} />
      <Route path="/profile/:username" Component={Profile} />
      <Route path="/stories/:id" Component={Story} />
      <Route path="/auth/:token" Component={Verification} />
      <Route path="*" Component={NotFound} />
      {user && <Route path="/editor" Component={Editor} />}
    </Routes>
  );
};

export default Routers;
