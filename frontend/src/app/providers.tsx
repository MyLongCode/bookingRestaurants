"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children?: React.ReactNode;
};

const client = new QueryClient();

export const CustomProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
