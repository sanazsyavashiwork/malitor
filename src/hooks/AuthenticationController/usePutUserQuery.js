import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePutUserQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.put(endPoints.USERS, data);

  return useMutation({
    mutationFn,
    ...options,
  });
};
