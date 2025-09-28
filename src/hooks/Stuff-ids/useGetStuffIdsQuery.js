"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetStuffIdsQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.STUFF];

  // axios
  const queryFn = ({ signal }) => api.get(endPoints.STUFF, { signal });
  const queryOptions = {};
  const {
    data: stuffList,
    isFetching: isLoadingStuffList,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    stuffList,
    isLoadingStuffList,
    refetch,
    queryKey,
  };
};
