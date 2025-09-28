import { useCallback } from "react";
import { cookieRoot } from "./useCookie";
import { MEMBER_KEYS } from "@/constValues/memberKey";

export const useGetMemberCookie = () => {
  const getMemberId = useCallback(() => {
    return cookieRoot.get(MEMBER_KEYS.MEMBER_ID);
  }, []);

  const getMemberLength = useCallback(() => {
    return cookieRoot.get(MEMBER_KEYS.MEMBER_LENGTH);
  }, []);

  return {
    getMemberId,
    getMemberLength,
  };
};
