import { useCallback } from "react";
import { cookieRoot } from "./useCookie";
import { MEMBER_KEYS } from "@/constValues/memberKey";

export const useSetMemberCookie = () => {
  const setMemberId = useCallback((memberId) => {
    cookieRoot.set(MEMBER_KEYS.MEMBER_ID, memberId);
  }, []);

  const setMemberLength = useCallback((memberLength) => {
    cookieRoot.set(MEMBER_KEYS.MEMBER_LENGTH, memberLength);
  }, []);

  return {
    setMemberId,
    setMemberLength,
  };
};
