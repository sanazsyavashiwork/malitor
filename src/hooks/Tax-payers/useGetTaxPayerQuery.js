"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetTaxPayerQuery = ({ id }) => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.TAX_PAYERS, id];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.TAX_PAYERS}/${id}`, { signal });
  const queryOptions = {};
  const {
    data: taxPayer,
    isFetching: isLoadingTaxPayer,
    error,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { taxPayer, isLoadingTaxPayer };
};
