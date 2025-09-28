"use client";
import HomePage from "@/components/special/homePage/homePage";
import Loading from "@/components/special/loading/loading";
import WhatsAppButton from "@/components/special/whatsUp/WhatsAppButton";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return <HomePage />;
  }
}
