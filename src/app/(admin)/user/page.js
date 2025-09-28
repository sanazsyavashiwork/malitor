"use client";
import Loading from "@/components/special/loading/loading";
import ListMember from "@/components/special/members/List Members/ListMember";
import ListUsers from "@/components/special/users/List Users/ListUsers";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <ListUsers />
      </Layout>
    );
  }
}
