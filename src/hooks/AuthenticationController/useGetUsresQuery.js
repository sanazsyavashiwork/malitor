"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetUsersQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.USERS];

  // axios
  const queryFn = ({ signal }) => api.get(`${endPoints.USERS}`, { signal });
  const queryOptions = {};
  const {
    data: users,
    isFetching: isLoadingUsers,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { users, isLoadingUsers, refetch };
};
