"use client";

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useQueryClientMaster = () => {
  const [queryClientMaster] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (res, b) => {
          console.log(res, b, 111);
        },
      }),
      mutationCache: new MutationCache({
        onError: (res, b) => {
          console.log(res, b, 222);
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          throwOnError: (error) => error?.response?.status >= 500,
          enabled: true,
          meta: { persist: false },
        },
        mutations: {
          meta: { persist: false },
        },
      },
    })
  );
  return { queryClientMaster };
};

export default useQueryClientMaster;
