"use client";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./editProfile.module.scss";
import { useToast } from "@/hooks/useToast2";

import GButton from "@/components/general/GeneralButton/GeneralButton";
import CollapsiblePanel from "@/components/general/CollapsiblePanel/CollapsiblePanel";
import { Info } from "lucide-react";
import { InvoiceFormFields } from "./FormFields";
import validationSchema from "./validationSchema";
import { useInvoice } from "../InvoiceContext";
import ListStuffes from "./List Stuff/ListMember";
import { useGetInvoiceQuery } from "@/hooks/Invoices/useGetInvoiceQuery";
import Loading from "@/components/special/loading/loading";
import { formatDate } from "../../invoicePrint/utils";

const AddInvoiceInformationPart1 = ({ id }) => {
  const { invoice, isLoadingInvoice } = useGetInvoiceQuery({ id });
  const { successToast, errorToast } = useToast();
  const [data, setInvoiceData] = useState({});

  const { invoiceData, updateInvoiceData, addInvoiceItem } = useInvoice();

  useEffect(() => {
    // setInvoiceData(invoice?.data || {});
    updateInvoiceData(invoice?.data);
  }, [invoice]);

  const initialValues = {
    internalSerial: invoiceData.internalSerial || data?.internalSerial,
    subject: invoiceData.subject || data?.subject,
    date: formatDate(invoiceData.date || data?.date),
    pattern: invoiceData.pattern || data?.pattern,
    type: invoiceData.type || data?.type,
    customer: invoiceData.customer?.id || data?.customer?.id,
    customerEconomicCode:
      invoiceData.customerEconomicCode || data?.customerEconomicCode,
    customerNationalId:
      invoiceData.customerNationalId || data?.customerNationalId,
    customerType: invoiceData.customerType || data?.customerType,
    stuffId: "",
    unit: "",
    vatRate: "",
    description: "",
    unitDiscount: "",
    unitPrice: "",
    quantity: "",
  };

  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    try {
      // Update main invoice data
      const mainData = {
        internalSerial: values.internalSerial,
        subject: values.subject,
        date: values.date,
        date: values.date ? values.date.replace(/\//g, "-") : "",
        pattern: values.pattern,
        type: values.type,
        customer: { id: parseInt(values.customer) },
        customerEconomicCode: values.customerEconomicCode,
        customerNationalId: values.customerNationalId,
        customerType: values.customerType,
        taxPayer: { id: 1 }, // You might want to get this from somewhere
      };

      updateInvoiceData(mainData);

      // Add invoice item if provided
      if (values.stuffId && values.description) {
        const itemData = {
          stuffId: values.stuffId,
          description: values.description,
          unit: values.unit,
          quantity: values.quantity,
          unitPrice: values.unitPrice,
          unitDiscount: values.unitDiscount,
        };

        addInvoiceItem(itemData);

        // Reset only item fields
        resetForm({
          values: {
            ...values,
            stuffId: "",
            unit: "",
            vatRate: "",
            description: "",
            unitDiscount: "",
            unitPrice: "",
            quantity: "",
          },
        });
      }

      successToast("اطلاعات صورت حساب با موفقیت ذخیره شد");
    } catch (error) {
      errorToast(" خطا در ذخیره اطلاعات صورت حساب");
    } finally {
      setSubmitting(false);
    }
  };
  if (isLoadingInvoice && Object.keys(invoiceData).length === 0) {
    return <Loading />;
  }
  return (
    <CollapsiblePanel title="اطلاعات صورتحساب" icon={<Info />}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize={true}
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
                  text={"افزودن +"}
                  loadingText={"...در حال افزوده شدن"}
                  loading={false}
                  disabled={isSubmitting}
                  htmlType="submit"
                  size="medium"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <ListStuffes id={id} />
    </CollapsiblePanel>
  );
};

export default AddInvoiceInformationPart1;
