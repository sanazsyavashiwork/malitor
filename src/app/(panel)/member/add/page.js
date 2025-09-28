"use client";
import Loading from "@/components/special/loading/loading";
import AddMembers from "@/components/special/members/AddMembers/AddMembers";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <AddMembers />
      </Layout>
    );
  }
}
