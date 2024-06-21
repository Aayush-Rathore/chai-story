import { Theme } from "@/components/ui/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const ReactQueryProvider = ({ children }: TProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const Providers = ({ children }: TProps) => {
  return (
    <ReactQueryProvider>
      <RouteProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </RouteProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
