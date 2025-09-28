// PaymentInfo.js - راه‌حل اصلی
"use client";
import { Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./editProfile.module.scss";
import { useToast } from "@/hooks/useToast2";

import GButton from "@/components/general/GeneralButton/GeneralButton";
import CollapsiblePanel from "@/components/general/CollapsiblePanel/CollapsiblePanel";
import { Info } from "lucide-react";
import { InvoiceFormFields } from "./FormFields";
import paymentValidationSchema from "./validationSchema";
import { Banknote } from "lucide-react";
import { CreditCard } from "lucide-react";
import { useInvoice } from "../InvoiceContext";
import { useGetInvoiceQuery } from "@/hooks/Invoices/useGetInvoiceQuery";
import Loading from "@/components/special/loading/loading";
import { formatDate } from "../../invoicePrint/utils";

const PaymentInfo = ({ handleAddInvoice, id }) => {
  const { invoice, isLoadingInvoice } = useGetInvoiceQuery({ id });
  const [data, setInvoiceData] = useState({});
  const { successToast, errorToast } = useToast();
  const { invoiceData, updatePaymentData } = useInvoice();

  useEffect(() => {
    setInvoiceData(invoice?.data || {});
    updatePaymentData(invoice?.data);
  }, [invoice]);

  console.log({ data });
  console.log(data?.paymentDetail?.paymentDate);

  // استفاده از useMemo برای محاسبه initialValues
  const initialValues = useMemo(
    () => ({
      settlementMethod: data?.paymentDetail?.settlementMethod || "",
      seventeenthTaxQoute: data?.paymentDetail?.seventeenthTaxQoute || "",
      paymentSwitchNumber:
        invoiceData?.paymentDetail?.paymentSwitchNumber ||
        data?.paymentDetail?.paymentSwitchNumber ||
        "",
      paymentDate:
        formatDate(invoiceData?.paymentDetail?.paymentDate) ||
        formatDate(data?.paymentDetail?.paymentDate) ||
        "",
      paymentMethod:
        invoiceData?.paymentDetail?.paymentMethod ||
        data?.paymentDetail?.paymentMethod ||
        "",
      referenceNumber:
        invoiceData?.paymentDetail?.referenceNumber ||
        data?.paymentDetail?.referenceNumber ||
        "",
    }),
    [data, invoiceData]
  );

  console.log({ initialValues });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      // ساخت داده‌های پرداخت
      const paymentData = {
        settlementMethod: values.settlementMethod,
        seventeenthTaxQoute: parseFloat(values.seventeenthTaxQoute) || 0.0,
        paymentSwitchNumber: values.paymentSwitchNumber,
        paymentDate: values.paymentDate
          ? values.paymentDate.replace(/\//g, "-")
          : "",
        paymentMethod: values.paymentMethod,
        referenceNumber: values.referenceNumber,
      };

      // به‌روزرسانی context (برای استفاده‌های بعدی)
      updatePaymentData({ paymentData });

      // ارسال مستقیم داده‌های کامل
      if (handleAddInvoice) {
        const completeInvoiceData = {
          ...invoiceData,
          paymentDetail: paymentData,
        };

        await handleAddInvoice({
          paymentData,
          completeData: completeInvoiceData,
          id: id,
        });
      } else {
        console.log("Complete Invoice Data:", {
          ...invoiceData,
          paymentDetail: paymentData,
        });
        successToast("اطلاعات پرداخت ذخیره شد");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      errorToast("خطا در پردازش اطلاعات پرداخت");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingInvoice && Object.keys(data).length === 0) {
    return <Loading />;
  }

  return (
    <CollapsiblePanel title="اطلاعات پرداخت" icon={<CreditCard />}>
      <Formik
        initialValues={initialValues}
        validationSchema={paymentValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize={true} // 🔑 کلید اصلی: اجازه به‌روزرسانی مجدد
      >
        {({ errors, touched, isSubmitting }) => {
          const allErrors = {
            ...errors,
          };

          return (
            <Form>
              <InvoiceFormFields errors={allErrors} touched={touched} />

              <div className={styles["flex-end-button"]}>
                <GButton
                  type="primary"
                  variant="filled"
                  text={"ذخیره و پیش نمایش "}
                  loadingText={"...در حال ذخیره"}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  htmlType="submit"
                  size="medium"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CollapsiblePanel>
  );
};

export default PaymentInfo;
