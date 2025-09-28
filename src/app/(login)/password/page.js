"use client";
import Loading from "@/components/special/loading/loading";
import PasswordForm from "@/components/special/loginPart/password/PasswordForm";
import { useLoading } from "@/hooks/useLoading";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <PasswordForm />;
  }
}
