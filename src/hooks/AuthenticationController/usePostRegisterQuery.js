import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePostRegisterQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.post(endPoints.REGISTER, data);

  return useMutation({
    mutationFn,
    ...options,
  });
};
