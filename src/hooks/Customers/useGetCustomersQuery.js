"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetCustomersQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.CUSTOMERS];

  // axios
  const queryFn = ({ signal }) => api.get(endPoints.CUSTOMERS, { signal });
  const queryOptions = {};
  const {
    data: customerList,
    isFetching: isLoadingCustomerList,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    customerList,
    isLoadingCustomerList,
    refetch,
    queryKey,
  };
};
