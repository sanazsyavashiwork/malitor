import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUsersQuery = (options = {}) => {
  const { endPoints } = useEndPoint();

  const mutationFn = ({ id }) => api.delete(`${endPoints.USERS}/${id}`);

  return useMutation({
    mutationFn,
    ...options,
  });
};
