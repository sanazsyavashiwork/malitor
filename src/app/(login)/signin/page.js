"use client";
import Loading from "@/components/special/loading/loading";
import LoginForm from "@/components/special/loginPart/logIn/Login";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <LoginForm />;
  }
}
