// PaymentInfo.js - راه‌حل اصلی
"use client";
import { Form, Formik } from "formik";
import React from "react";
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

const parsePersianDate = (dateString) => {
  if (!dateString) {
    return {
      year: 0,
      monthPersian: "FARVARDIN",
      day: 0,
      dayOfWeekPersian: "Yekshanbeh",
      leapYear: false,
      dayOfWeek: "Yekshanbeh",
    };
  }

  // اینجا منطق پارس کردن تاریخ Persian باید اضافه شود
  // فرض کنیم dateString به فرمت "1402/12/15" باشد
  try {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return {
        year: parseInt(parts[0]) || 0,
        monthPersian: getMonthPersianName(parseInt(parts[1]) || 1),
        day: parseInt(parts[2]) || 0,
        dayOfWeekPersian: "Yekshanbeh", // این باید محاسبه شود
        leapYear: false, // این باید محاسبه شود
        dayOfWeek: "Yekshanbeh", // این باید محاسبه شود
      };
    }
  } catch (error) {
    console.error("Error parsing Persian date:", error);
  }

  return {
    year: 0,
    monthPersian: "FARVARDIN",
    day: 0,
    dayOfWeekPersian: "Yekshanbeh",
    leapYear: false,
    dayOfWeek: "Yekshanbeh",
  };
};

// تابع کمکی برای گرفتن نام ماه Persian
const getMonthPersianName = (monthNumber) => {
  const months = [
    "FARVARDIN",
    "ORDIBEHESHT",
    "KHORDAD",
    "TIR",
    "MORDAD",
    "SHAHRIVAR",
    "MEHR",
    "ABAN",
    "AZAR",
    "DEY",
    "BAHMAN",
    "ESFAND",
  ];
  return months[monthNumber - 1] || "FARVARDIN";
};

// تابع کمکی برای تبدیل object تاریخ به string (برای نمایش در فرم)
const formatPersianDateToString = (dateObj) => {
  if (!dateObj || !dateObj.year) {
    return "";
  }

  const monthNumber = getMonthNumber(dateObj.monthPersian);
  return `${dateObj.year}/${monthNumber
    .toString()
    .padStart(2, "0")}/${dateObj.day.toString().padStart(2, "0")}`;
};

const getMonthNumber = (monthPersian) => {
  const months = {
    FARVARDIN: 1,
    ORDIBEHESHT: 2,
    KHORDAD: 3,
    TIR: 4,
    MORDAD: 5,
    SHAHRIVAR: 6,
    MEHR: 7,
    ABAN: 8,
    AZAR: 9,
    DEY: 10,
    BAHMAN: 11,
    ESFAND: 12,
  };
  return months[monthPersian] || 1;
};

const PaymentInfo = ({ handleAddInvoice }) => {
  const { successToast, errorToast } = useToast();
  const { invoiceData, updatePaymentData } = useInvoice();

  const initialValues = {
    settlementMethod: invoiceData.paymentDetail.settlementMethod || "",
    seventeenthTaxQoute: invoiceData.paymentDetail.seventeenthTaxQoute || "",
    paymentSwitchNumber: invoiceData.paymentDetail.paymentSwitchNumber || "",
    paymentDate: invoiceData.paymentDetail.paymentDate || "",
    paymentMethod: invoiceData.paymentDetail.paymentMethod || "",
    referenceNumber: invoiceData.paymentDetail.referenceNumber || "",
  };

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      // ساخت داده‌های پرداخت
      const paymentData = {
        settlementMethod: values.settlementMethod,
        seventeenthTaxQoute: parseFloat(values.seventeenthTaxQoute) || 0.0,
        paymentSwitchNumber: values.paymentSwitchNumber,
        // paymentDate: values.paymentDate
        //   ? values.paymentDate.replace(/\//g, "-")
        //   : "",
        paymentDate: formatPersianDateToString(
          parsePersianDate(values.paymentDate)
        ),

        //       formatPersianDateToString(
        //   typeof user?.data?.creditExpirationDate === "string"
        //     ? parsePersianDate(user?.data?.creditExpirationDate)
        //     : user?.data?.creditExpirationDate
        // ),
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

  return (
    <CollapsiblePanel title="اطلاعات پرداخت" icon={<CreditCard />}>
      <Formik
        initialValues={initialValues}
        validationSchema={paymentValidationSchema}
        onSubmit={onSubmitHandler}
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
