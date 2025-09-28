import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePutTaxPayersQuery = ({ id }) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.put(`${endPoints.TAX_PAYERS}/${id}`, data);

  return useMutation({
    mutationFn,
  });
};
