import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTaxPayersQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = ({ id }) => api.delete(`${endPoints.TAX_PAYERS}/${id}`);

  return useMutation({
    mutationFn,
    ...options,
  });
};
