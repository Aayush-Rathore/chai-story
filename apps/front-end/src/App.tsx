import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "@/components/constants/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Home = lazy(() => import("@/pages/Home.page"));
const Stories = lazy(() => import("@/pages/Stories.page"));
const Story = lazy(() => import("@/pages/Story.page"));
const Profile = lazy(() => import("@/pages/Profile.page"));
const Verification = lazy(() => import("@/pages/Verification.page"));

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="px-2 md:px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/stories" Component={Stories} />
            <Route path="/profile/:username" Component={Profile} />
            <Route path="/stories/:id" Component={Story} />
            <Route path="/auth/:token" Component={Verification} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
