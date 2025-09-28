"use client";
import InvoicePrint from "@/components/special/invoice/invoicePrint/InvoicePrint";
import Loading from "@/components/special/loading/loading";
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
      // <Layout>
      <InvoicePrint id={id} />
      // </Layout>
    );
  }
}
