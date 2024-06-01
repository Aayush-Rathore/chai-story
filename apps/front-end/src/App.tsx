import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "@/components/constants/Navbar";
import Home from "@/pages/Home.page";
import Footer from "@/components/constants/Footer";
import Stories from "@/pages/Stories.page";

function App() {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-6">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/stories" Component={Stories} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
