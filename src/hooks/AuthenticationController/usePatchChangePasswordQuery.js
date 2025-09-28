import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePatchChangePasswordQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.patch(endPoints.CHANGE_PASSWORD, data);

  return useMutation({
    mutationFn,
    ...options,
  });
};
