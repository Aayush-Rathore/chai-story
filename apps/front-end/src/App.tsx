import { Suspense } from "react";
import "./App.css";
import Navbar from "@/components/constants/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Routers from "./Routes/routes";

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="px-2 md:px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Routers />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
