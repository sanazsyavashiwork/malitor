"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetUserQuery = ({ id }) => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.USERS, id];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.USERS}/${id}`, { signal });
  const queryOptions = {};
  const {
    data: user,
    isFetching: isLoadingUser,
    error,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { user, isLoadingUser };
};
