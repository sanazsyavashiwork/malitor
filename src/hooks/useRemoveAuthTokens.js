import { useCallback } from "react";
import { cookieRoot } from "./useCookie";

import { TOKEN_KEYS } from "@/constValues/tokenKeys";

export const useRemoveAuthTokens = () => {
  const removeAccessToken = useCallback(() => {
    cookieRoot.remove(TOKEN_KEYS.ACCESS_TOKEN);
  }, []);

  const removeRefreshToken = useCallback(() => {
    cookieRoot.remove(TOKEN_KEYS.REFRESH_TOKEN);
  }, []);

  const removeRole = useCallback(() => {
    cookieRoot.remove(TOKEN_KEYS.ROLE);
  }, []);

  const removeTokens = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    removeRole();
  }, [removeAccessToken, removeRefreshToken]);

  return {
    removeAccessToken,
    removeRefreshToken,
    removeTokens,
  };
};
