"use client";
import Loading from "@/components/special/loading/loading";
import LoginForm from "@/components/special/loginPart/logIn/Login";
import SignupForm from "@/components/special/loginPart/signup/SignupForm";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <SignupForm />;
  }
}
