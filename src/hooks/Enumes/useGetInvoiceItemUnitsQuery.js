"use client";

import api from "@/services/fetch-api/useApi";
import useEndPoint from "@/hooks/useEndPoint";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

export const useGetInvoiceItemUnitsQuery = ({ id }) => {
  // hooks
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [endPoints.INVOICE_ITEM_UNIT, id];

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.INVOICE_ITEM_UNIT}`, { signal });
  const queryOptions = {};
  const {
    data: list,
    isFetching: isLoadingList,
    error,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  return { list, isLoadingList };
};
