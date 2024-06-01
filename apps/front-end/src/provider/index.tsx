import { Theme } from "@/components/ui/theme-provider";
import { BrowserRouter } from "react-router-dom";
import React from "react";

type TProps = {
  children: React.ReactNode;
};

const RouteProvider = ({ children }: TProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const ThemeProvider = ({ children }: TProps) => {
  return <Theme>{children}</Theme>;
};

const Providers = ({ children }: TProps) => {
  return (
    <RouteProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </RouteProvider>
  );
};

export default Providers;
