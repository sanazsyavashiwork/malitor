"use client";
import Loading from "@/components/special/loading/loading";
import EditMembers from "@/components/special/members/EditMembers/EditMembers";
import EditUser from "@/components/special/users/EditUsers/EditUser";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const id = params.id ? params.id : null;
  console.log({ id });
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <EditUser id={id} />
      </Layout>
    );
  }
}
