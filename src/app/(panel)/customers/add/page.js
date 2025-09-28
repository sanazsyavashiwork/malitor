"use client";
import AddCustomer from "@/components/special/customers/AddCustomers/AddCustomers";
import Loading from "@/components/special/loading/loading";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <AddCustomer />
      </Layout>
    );
  }
}
