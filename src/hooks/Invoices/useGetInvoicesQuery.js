"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetInvoicesQuery = () => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.INVOICES];

  // axios
  const queryFn = ({ signal }) => api.get(endPoints.INVOICES, { signal });
  const queryOptions = {};
  const {
    data: invoicesList,
    isFetching: isLoadingInvoicesList,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    invoicesList,
    isLoadingInvoicesList,
    refetch,
    queryKey,
  };
};
