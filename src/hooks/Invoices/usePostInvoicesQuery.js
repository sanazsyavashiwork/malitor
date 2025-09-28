import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePostInvoicesQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.post(endPoints.INVOICES, data);

  return useMutation({
    mutationFn,
    ...options,
  });
};
