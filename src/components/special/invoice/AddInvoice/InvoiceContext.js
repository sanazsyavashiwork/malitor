// InvoiceContext.js - راه‌حل جایگزین با callback
"use client";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";
import { createContext, useContext, useState, useCallback } from "react";

const InvoiceContext = createContext();

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within InvoiceProvider");
  }
  return context;
};

export const InvoiceProvider = ({ children }) => {
  const { getMemberId } = useGetMemberCookie();
  const [invoiceData, setInvoiceData] = useState({
    date: "",
    subject: "",
    internalSerial: "",
    customer: { id: null },
    taxPayer: { id: getMemberId() },
    type: "",
    pattern: "",
    customerType: "",
    customerNationalId: "",
    customerEconomicCode: "",
    invoiceItems: [],
    paymentDetail: {
      paymentMethod: "",
      settlementMethod: "",
      paymentSwitchNumber: "",
      seventeenthTaxQoute: 0.0,
      referenceNumber: "",
      paymentDate: "",
    },
  });

  const updateInvoiceData = useCallback((data) => {
    setInvoiceData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  // این تابع callback می‌گیرد که بعد از به‌روزرسانی اجرا می‌شود
  const updatePaymentData = useCallback((paymentData, callback) => {
    setInvoiceData((prev) => {
      const newData = {
        ...prev,
        paymentDetail: {
          ...prev.paymentDetail,
          ...paymentData,
        },
      };

      // اگر callback داده شده، آن را با داده‌های جدید اجرا کن
      if (callback) {
        // استفاده از setTimeout برای اطمینان از به‌روزرسانی state
        setTimeout(() => callback(newData), 0);
      }

      return newData;
    });
  }, []);

  const addInvoiceItem = useCallback((item) => {
    const newItem = {
      stuffId: { id: item.stuffId },
      description: item.description,
      unit: item.unit,
      quantity: parseFloat(item.quantity),
      unitPrice: parseFloat(item.unitPrice),
      unitDiscount: parseFloat(item.unitDiscount),
    };

    setInvoiceData((prev) => ({
      ...prev,
      invoiceItems: [...prev.invoiceItems, newItem],
    }));
  }, []);

  const removeInvoiceItem = useCallback((index) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoiceItems: prev.invoiceItems.filter((_, i) => i !== index),
    }));
  }, []);

  const calculateTotalAmount = useCallback(() => {
    return invoiceData.invoiceItems.reduce((total, item) => {
      const itemTotal = item.quantity * item.unitPrice - item.unitDiscount;
      return total + itemTotal;
    }, 0);
  }, [invoiceData.invoiceItems]);

  // تابع محاسبه تعداد کل آیتم‌ها
  const getTotalItemsCount = useCallback(() => {
    return invoiceData.invoiceItems.length;
  }, [invoiceData.invoiceItems]);
  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        updateInvoiceData,
        updatePaymentData,
        addInvoiceItem,
        removeInvoiceItem,
        calculateTotalAmount,
        getTotalItemsCount,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
