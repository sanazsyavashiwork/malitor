import { useCallback } from "react";
import { cookieRoot } from "./useCookie";

import { TOKEN_KEYS } from "@/constValues/tokenKeys";
import { MEMBER_KEYS } from "@/constValues/memberKey";

export const useRemoveMemberCookie = () => {
  const removeMemberId = useCallback(() => {
    cookieRoot.remove(MEMBER_KEYS.MEMBER_ID);
  }, []);

  const removeMemberLength = useCallback(() => {
    cookieRoot.remove(MEMBER_KEYS.MEMBER_LENGTH);
  }, []);

  return {
    removeMemberId,
    removeMemberLength,
  };
};
