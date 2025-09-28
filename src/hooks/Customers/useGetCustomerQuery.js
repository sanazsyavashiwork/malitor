"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetCustomerQuery = ({ id }) => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.CUSTOMERS];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.CUSTOMERS}/${id}`, { signal });
  const queryOptions = {};
  const {
    data: customer,
    isFetching: isLoadingCustomer,
    error,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { customer, isLoadingCustomer };
};
