import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePostSendInvoicesQuery = ({ id }) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) =>
    api.post(`${endPoints.SEND_INVOICES}${id}`, data);

  return useMutation({
    mutationFn,
    // ...options,
  });
};
