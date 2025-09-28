"use client";
import ListCustomer from "@/components/special/customers/ListCustomers/ListCustomer";
import Loading from "@/components/special/loading/loading";
import ListStuff from "@/components/special/stuff/List Stuff/ListStuff";
import { useLoading } from "@/hooks/useLoading";
import Layout from "@/layout/Layout";

export default function Home() {
  const { showLoading } = useLoading();
  if (showLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <ListStuff />
      </Layout>
    );
  }
}
