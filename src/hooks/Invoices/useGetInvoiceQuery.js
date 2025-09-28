"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetInvoiceQuery = ({ id }) => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [`${endPoints.INVOICES}/ ${id}`];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.INVOICES}/${id}`, { signal });
  const queryOptions = {};
  const {
    data: invoice,
    isFetching: isLoadingInvoice,
    error,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { invoice, isLoadingInvoice };
};
