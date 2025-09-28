import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePutInvoicesQuery = ({ id }) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.put(`${endPoints.INVOICES}/${id}`, data);

  return useMutation({
    mutationFn,
  });
};
