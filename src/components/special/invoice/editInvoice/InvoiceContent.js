// InvoiceContent.js - تطبیق با تغییرات
"use client";
import React from "react";
import { useToast } from "@/hooks/useToast2";
import { useInvoice } from "./InvoiceContext";

import AddInvoiceInformationPart1 from "./InvoiceInfo/AddInvoiceInformationPart";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import { ROUTES } from "@/constValues/Routes";
import { usePutInvoicesQuery } from "@/hooks/Invoices/usePutInvoicesQuery";
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

  try {
    // پشتیبانی از هر دو فرمت: "1404/07/08" و "1404-07-08"
    const parts = dateString.split(/[-\/]/);
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

// تابع کمکی برای تبدیل فرمت تاریخ از خط تیره به اسلش
const convertDateFormat = (dateString) => {
  if (!dateString) return "";
  return dateString.replace(/-/g, "/");
};

const InvoiceContent = ({ id }) => {
  const { successToast, errorToast } = useToast();
  const { invoiceData } = useInvoice();
  const { mutate } = usePutInvoicesQuery({ id });

  const handleAddInvoice = async ({ paymentData, completeData, id }) => {
    try {
      // استفاده از داده‌های کامل که از PaymentInfo دریافت کردیم
      const processedData = {
        ...completeData,
        // تبدیل date اصلی
        date: parsePersianDate(completeData.date),
        // تبدیل paymentDate در paymentDetail
        paymentDetail: {
          ...completeData.paymentDetail,
          paymentDate: parsePersianDate(
            completeData.paymentDetail?.paymentDate
          ),
        },
      };

      console.log("Submitting invoice data:", processedData);

      mutate(processedData, {
        onSuccess: (data) => {
          successToast("پیش صورت حساب با موفقیت ثبت شد");
          window.location.href = `${ROUTES.PRIVATE.INVOICE_PRINT}/${id}`;
        },
        onSettled: () => {
          console.log("Invoice submission settled");
        },
        onError: (error) => {
          console.error("Invoice submission error:", error);
          errorToast("ثبت پیش صورت حساب با خطا روبرو شد");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      errorToast("خطای غیرمنتظره در ثبت صورت حساب");
    }
  };

  return (
    <>
      <AddInvoiceInformationPart1 id={id} />
      <PaymentInfo handleAddInvoice={handleAddInvoice} id={id} />
    </>
  );
};

export default InvoiceContent;
