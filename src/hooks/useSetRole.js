import { useCallback } from "react";
import { cookieRoot } from "./useCookie";

export const useSetRole = () => {
  const setRole = useCallback((role) => {
    if (role) {
      cookieRoot.set("ROLE", role);
    } else {
      cookieRoot.remove("ROLE");
    }
  }, []);

  return {
    setRole,
  };
};
