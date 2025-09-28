"use client";
import Loading from "@/components/special/loading/loading";
import LoginForm from "@/components/special/loginPart/logIn/Login";
import OTPForm from "@/components/special/loginPart/otp/OTP";
import { useLoading } from "@/hooks/useLoading";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <OTPForm />;
  }
}
