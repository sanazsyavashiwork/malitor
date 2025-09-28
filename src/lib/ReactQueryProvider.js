"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useQueryClientMaster from "./useQueryClientMaster";

export default function ReactQueryProvider({ children }) {
  const { queryClientMaster } = useQueryClientMaster();

  return (
    <QueryClientProvider client={queryClientMaster}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
