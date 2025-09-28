import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteInvoicesQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = ({ id }) => api.delete(`${endPoints.INVOICES}/${id}`);

  return useMutation({
    mutationFn,
    ...options,
  });
};
