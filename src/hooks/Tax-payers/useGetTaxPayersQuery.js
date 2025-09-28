"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetTaxPayersQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.TAX_PAYERS];

  // axios
  const queryFn = ({ signal }) => api.get(endPoints.TAX_PAYERS, { signal });
  const queryOptions = {};
  const {
    data: taxPayerList,
    isFetching: isLoadingTaxPayerList,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    taxPayerList,
    isLoadingTaxPayerList,
    refetch,
    queryKey,
  };
};
