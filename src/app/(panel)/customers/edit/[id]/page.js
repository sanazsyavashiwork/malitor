"use client";
import EditCustomers from "@/components/special/customers/EditCustomers/EditCustomers";
import Loading from "@/components/special/loading/loading";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const id = params.id ? params.id : null;
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <EditCustomers id={id} />
      </Layout>
    );
  }
}
