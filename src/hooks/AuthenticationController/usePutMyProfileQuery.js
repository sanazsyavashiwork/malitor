import useEndPoint from "@/hooks/useEndPoint";
import api from "@/services/fetch-api/useApi";
import { useMutation } from "@tanstack/react-query";

export const usePutMyProfileQuery = () => {
  const { endPoints } = useEndPoint();

  const mutationFn = (data) => api.put(endPoints.MY_PROFILE, data);

  return useMutation({
    mutationFn,
  });
};
