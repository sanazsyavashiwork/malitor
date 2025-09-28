"use client";
import Loading from "@/components/special/loading/loading";
import ResetPasswordForm from "@/components/special/loginPart/resetPassword/ResetPasswordForm";
import { useLoading } from "@/hooks/useLoading";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <ResetPasswordForm />;
  }
}
