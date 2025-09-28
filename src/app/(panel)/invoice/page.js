"use client";
import ListInvoice from "@/components/special/invoice/List Invoice/ListInvoice";
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
        <ListInvoice />
      </Layout>
    );
  }
}
