// hooks/usePdfGenerator.js
import { useState } from "react";

export const usePdfGenerator = () => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const generatePdf = async (elementSelector, fileName = "document.pdf") => {
    try {
      setIsGeneratingPdf(true);

      // Dynamic import برای کاهش حجم bundle
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).jsPDF;

      // اخفای دکمه‌ها قبل از تولید PDF
      const buttons = document.querySelectorAll("[data-no-print]");
      buttons.forEach((button) => {
        button.style.display = "none";
      });

      // انتخاب المنت مورد نظر
      const element = document.querySelector(elementSelector);

      if (!element) {
        throw new Error("عنصر مورد نظر یافت نشد");
      }

      // تنظیمات برای بهترین کیفیت
      const canvas = await html2canvas(element, {
        scale: 2, // کیفیت بالاتر
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // ایجاد PDF
      const imgData = canvas.toDataURL("image/png");

      // محاسبه ابعاد صفحه A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // محاسبه نسبت تصویر
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      // اگر تصویر بلندتر از صفحه است، چند صفحه ایجاد کن
      if (imgHeight * ratio > pdfHeight) {
        await createMultiPagePdf(pdf, canvas, ratio, pdfWidth, pdfHeight);
      } else {
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          0,
          imgWidth * ratio,
          imgHeight * ratio
        );
      }

      // ذخیره فایل
      pdf.save(fileName);

      return { success: true };
    } catch (error) {
      console.error("خطا در تولید PDF:", error);
      throw new Error("خطا در تولید فایل PDF. لطفاً مجدداً تلاش کنید.");
    } finally {
      // نمایش مجدد دکمه‌ها
      const buttons = document.querySelectorAll("[data-no-print]");
      buttons.forEach((button) => {
        button.style.display = "flex";
      });
      setIsGeneratingPdf(false);
    }
  };

  // تابع کمکی برای ایجاد PDF چند صفحه‌ای
  const createMultiPagePdf = async (
    pdf,
    canvas,
    ratio,
    pdfWidth,
    pdfHeight
  ) => {
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    let position = 0;
    const pageHeight = pdfHeight / ratio;

    while (position < imgHeight) {
      const remainingHeight = Math.min(pageHeight, imgHeight - position);

      // ایجاد canvas جدید برای هر صفحه
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = imgWidth;
      pageCanvas.height = remainingHeight;

      const ctx = pageCanvas.getContext("2d");
      ctx.drawImage(
        canvas,
        0,
        position,
        imgWidth,
        remainingHeight,
        0,
        0,
        imgWidth,
        remainingHeight
      );

      const pageData = pageCanvas.toDataURL("image/png");

      if (position > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        pageData,
        "PNG",
        imgX,
        0,
        imgWidth * ratio,
        remainingHeight * ratio
      );

      position += pageHeight;
    }
  };

  // تابع کمکی برای ایجاد نام فایل هوشمند
  const createFileName = (invoiceData, prefix = "صورتحساب") => {
    const invoiceId = invoiceData?.id || "شماره‌نامشخص";
    const currentDate = new Date()
      .toLocaleDateString("fa-IR")
      .replace(/\//g, "-");
    return `${prefix}-${invoiceId}-${currentDate}.pdf`;
  };

  return {
    generatePdf,
    isGeneratingPdf,
    createFileName,
  };
};
