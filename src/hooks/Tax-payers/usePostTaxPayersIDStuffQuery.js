import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";
import { useGetMemberCookie } from "../useGetMemberCookie";

export const usePostTaxPayersIDStuffQuery = (options = {}) => {
  const { endPoints } = useEndPoint();
  const { getMemberId } = useGetMemberCookie();
  const STUFF_URL = "stuff-ids";
  const mutationFn = ({ data, stuffId }) => {
    api.post(
      `${endPoints.TAX_PAYERS}/${getMemberId()}/${STUFF_URL}/${stuffId}`,
      data
    );
  };

  return useMutation({
    mutationFn,
    ...options,
  });
};
