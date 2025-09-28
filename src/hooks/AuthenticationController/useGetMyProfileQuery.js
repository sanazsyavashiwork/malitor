"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetMyProfileQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.MY_PROFILE];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.MY_PROFILE}`, { signal });
  const queryOptions = {};
  const {
    data: myProfile,
    isFetching: isLoadingMyProfile,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { myProfile, isLoadingMyProfile, refetch };
};
