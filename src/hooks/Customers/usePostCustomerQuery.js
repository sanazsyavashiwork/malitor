import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePostCustomerQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.post(endPoints.CUSTOMERS, data);

  return useMutation({
    mutationFn,
    ...options,
  });
};
