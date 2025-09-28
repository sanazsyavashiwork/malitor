import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCustomerQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = ({ id }) => api.delete(`${endPoints.CUSTOMERS}/${id}`);

  return useMutation({
    mutationFn,
    ...options,
  });
};
