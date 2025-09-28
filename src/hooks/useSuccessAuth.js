import { useCallback } from "react";
import { cookieRoot } from "./useCookie";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constValues/Routes";
import { TOKEN_KEYS } from "@/constValues/tokenKeys";

export const useSuccessAuth = () => {
  const router = useRouter();

  const setAccessToken = useCallback((token) => {
    if (token) {
      cookieRoot.set(TOKEN_KEYS.ACCESS_TOKEN, token);
    } else {
      cookieRoot.remove(TOKEN_KEYS.ACCESS_TOKEN);
    }
  }, []);

  const setRefreshToken = useCallback((token) => {
    if (token) {
      cookieRoot.set(TOKEN_KEYS.REFRESH_TOKEN, token);
    } else {
      cookieRoot.remove(TOKEN_KEYS.REFRESH_TOKEN);
    }
  }, []);

  const setTokens = useCallback(
    (accessToken, refreshToken, isRedirectingToDashboard = true) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      if (isRedirectingToDashboard) {
        console.log(ROUTES.PRIVATE.DASHBOARD);
        router.push(ROUTES.PRIVATE.DASHBOARD);
      } else {
        router.push(ROUTES.ADMIN.USER_LIST);
      }
    },
    [setAccessToken, setRefreshToken]
  );

  return {
    setTokens,
    setAccessToken,
  };
};
