import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "@/components/constants/Navbar";
import Home from "@/pages/Home.page";
import Footer from "@/components/constants/Footer";
import Stories from "@/pages/Stories.page";
import Story from "@/pages/Story.page";
import { Toaster } from "@/components/ui/toaster";
import Verification from "@/pages/Verification.page";

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="px-2 md:px-6">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/stories" Component={Stories} />
          <Route path="/stories/:id" Component={Story} />
          <Route path="auth/:token" Component={Verification} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
