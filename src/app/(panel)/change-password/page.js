"use client";
import ChangePassword from "@/components/special/changePassword/ChangePassword";
import Loading from "@/components/special/loading/loading";
import ListMember from "@/components/special/members/List Members/ListMember";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <ChangePassword />
      </Layout>
    );
  }
}
