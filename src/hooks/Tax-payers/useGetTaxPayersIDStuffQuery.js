import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useGetMemberCookie } from "../useGetMemberCookie";
import { useErrorApiHandler } from "../useErrorApiHandler";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetTaxPayersIDStuffQuery = (options = {}) => {
  const { getMemberId } = useGetMemberCookie();
  const { endPoints } = useEndPoint();
  const { handleError } = useErrorApiHandler();
  const queryKey = [`${endPoints.TAX_PAYERS}${getMemberId()}}`];
  const STUFF_URL = "stuff-ids";

  // axios
  const queryFn = ({ signal }) =>
    api.get(`${endPoints.TAX_PAYERS}/${getMemberId()}/${STUFF_URL}`, {
      signal,
    });
  const queryOptions = {};
  const {
    data: list,
    isFetching: isLoadingList,
    error,
    refetch,
  } = useQuery({ queryKey, queryFn, queryOptions });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    list,
    isLoadingList,
    refetch,
    queryKey,
  };
};
