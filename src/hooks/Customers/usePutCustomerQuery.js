import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePutCustomerQuery = ({ id }) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.put(`${endPoints.CUSTOMERS}/${id}`, data);

  return useMutation({
    mutationFn,
  });
};
