import { useCallback } from "react";
import { cookieRoot } from "./useCookie";
import { TOKEN_KEYS } from "@/constValues/tokenKeys";

export const useAuthTokens = () => {
  const getAccessToken = useCallback(() => {
    return cookieRoot.get(TOKEN_KEYS.ACCESS_TOKEN);
  }, []);

  const getRefreshToken = useCallback(() => {
    return cookieRoot.get(TOKEN_KEYS.REFRESH_TOKEN);
  }, []);

  const getTokens = useCallback(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    return { accessToken, refreshToken };
  }, [getAccessToken, getRefreshToken]);

  return {
    getAccessToken,
    getRefreshToken,
    getTokens,
  };
};
