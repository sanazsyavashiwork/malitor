// InvoicePrint.js - React Component
import React, { useEffect, useState } from "react";
import styles from "./InvoicePrint.module.scss";
import { useGetInvoiceQuery } from "@/hooks/Invoices/useGetInvoiceQuery";
import Loading from "../../loading/loading";
import { formatDate, formatPersianNumber } from "./utils";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import { usePdfGenerator } from "./usePdfGenerator";
import { Edit } from "lucide-react";
import Tippy from "@tippyjs/react";
import { Download } from "lucide-react";
import { Printer } from "lucide-react";
import { List } from "lucide-react";
import { ROUTES } from "@/constValues/Routes";
import { usePostSendInvoicesQuery } from "@/hooks/Invoices/usePostSendInvoicesQuery";
import { useToast } from "@/hooks/useToast2";

const InvoicePrint = ({ onPrint, id }) => {
  const { invoice, isLoadingInvoice } = useGetInvoiceQuery({ id });
  const { generatePdf, isGeneratingPdf, createFileName } = usePdfGenerator();
  const [invoiceData, setInvoiceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const { mutate } = usePostSendInvoicesQuery({ id });
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    setInvoiceData(invoice?.data || {});
  }, [invoice]);

  // چاپ صورتحساب
  const handlePrint = () => {
    setIsPrinting(true);

    const buttons = document.querySelectorAll("[data-no-print]");
    buttons.forEach((button) => {
      button.style.display = "none";
    });

    window.print();

    setTimeout(() => {
      buttons.forEach((button) => {
        button.style.display = "flex";
      });
      setIsPrinting(false);
      if (onPrint) onPrint();
    }, 1000);
  };

  // دانلود PDF
  const handleDownloadPdf = async () => {
    try {
      const fileName = createFileName(invoiceData);
      await generatePdf(`.${styles.invoiceContainer}`, fileName);

      // اختیاری: نمایش پیام موفقیت
      // toast.success('فایل PDF با موفقیت دانلود شد');
    } catch (error) {
      alert(error.message);
    }
  };

  // اصلاح صورتحساب
  const handleEditInvoice = () => {
    if (id) {
      window.location.href = `${ROUTES.PRIVATE.INVOICE_EDIT}/${id}`;
    }
  };

  // رفتن به لیست صورتحساب‌ها
  const handleGoToInvoiceList = () => {
    window.location.href = ROUTES.PRIVATE.INVOICE;
  };

  // ارسال به موودیان
  const handleSendToModian = async () => {
    try {
      // استفاده از داده‌های کامل که از PaymentInfo دریافت کردیم

      mutate(
        { id: id },
        {
          onSuccess: (data) => {
            successToast("پیش صورت حساب با موفقیت ارسال شد");
            window.location.href = `${ROUTES.PRIVATE.INVOICE_PRINT}/${id}`;
          },
          onSettled: () => {
            console.log("Invoice submission settled");
          },
          onError: (error) => {
            console.error("Invoice submission error:", error);
            console.log(error.response.data.message);
            errorToast("ارسال پیش صورت حساب با خطا روبرو شد");
            errorToast(error.response.data.message);
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      errorToast("خطای غیرمنتظره در ارسال صورت حساب");
    }
  };

  // بررسی وضعیت loading
  if (isLoadingInvoice && Object.keys(invoiceData).length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.invoiceContainer}>
      {/* Watermark */}
      <div className={styles.watermark}>مودیان</div>

      {/* Header */}
      <div className={styles.header}>
        <h1>صورتحساب فروش کالا و خدمات</h1>
        <div className={styles.headerInfo}>
          <div>
            شماره مالیاتی: {formatPersianNumber(invoiceData?.id || "1390")}
          </div>
          <div>تاریخ ارسال : {formatDate(invoiceData?.date)}</div>
        </div>
      </div>

      {/* Seller Info */}
      <div className={styles.companySection}>
        <div className={styles.sectionTitle}>مشخصات فروشنده</div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>
            نام شخص {invoiceData?.customerType}
          </div>
          <div className={styles.infoCell}>{invoiceData?.taxPayer?.name}</div>
          <div className={`${styles.infoCell} ${styles.label}`}>شماره ثبت</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(invoiceData?.taxPayer?.registrationNumber)}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>شناسه ملی</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(invoiceData?.taxPayer?.nationalId)}
          </div>
          <div className={`${styles.infoCell} ${styles.label}`}>تلفن</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(invoiceData?.taxPayer?.phoneNumber)}
          </div>
          <div className={`${styles.infoCell} ${styles.label}`}>استان</div>
          <div className={styles.infoCell}>
            {invoiceData?.taxPayer?.province}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>نشانی</div>
          <div className={styles.infoCell} style={{ flex: 5 }}>
            {invoiceData?.taxPayer?.address}
          </div>
        </div>
      </div>

      {/* Buyer Info */}
      <div className={styles.companySection}>
        <div className={styles.sectionTitle}>مشخصات خریدار</div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>
            نام شخص حقیقی یا حقوقی
          </div>
          <div className={styles.infoCell}>{invoiceData?.customer?.name}</div>
          <div className={`${styles.infoCell} ${styles.label}`}>شماره ثبت</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(
              invoiceData?.customer?.registrationNumber || "-"
            )}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>شناسه ملی</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(invoiceData?.customer?.nationalId)}
          </div>
          <div className={`${styles.infoCell} ${styles.label}`}>تلفن</div>
          <div className={styles.infoCell}>
            {formatPersianNumber(invoiceData?.customer?.phoneNumber || "-")}
          </div>
          <div className={`${styles.infoCell} ${styles.label}`}>استان</div>
          <div className={styles.infoCell}>
            {invoiceData?.customer?.province}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={`${styles.infoCell} ${styles.label}`}>نشانی</div>
          <div className={styles.infoCell} style={{ flex: 5 }}>
            {invoiceData?.customer?.address}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className={styles.itemsSection}>
        <div className={styles.sectionTitle}>مشخصات کالا یا خدمات</div>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th className={styles.rowNumber}>ردیف</th>
              <th className={styles.descriptionCol}>شرح کالا یا خدمات</th>
              <th className={styles.numberCol}>تعداد</th>
              <th className={styles.amountCol}>مبلغ واحد (ریال)</th>
              <th className={styles.amountCol}>مبلغ کل (ریال)</th>
              <th className={styles.amountCol}>مبلغ تخفیف</th>
              <th className={styles.amountCol}>مبلغ کل پس از تخفیف (ریال)</th>
              <th className={styles.amountCol}>جمع مالیات و عوارض (ریال)</th>
              <th className={styles.amountCol}>
                جمع مبلغ کل، مالیات و عوارض (ریال)
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.invoiceItems?.map((item, index) => (
              <tr key={index}>
                <td>{formatPersianNumber(index + 1)}</td>
                <td className={styles.descriptionCol}>{item.description}</td>
                <td>{formatPersianNumber(item.quantity)}</td>
                <td>{formatPersianNumber(item.unitPrice, true)}</td>
                <td>{formatPersianNumber(item.priceBeforeDiscount, true)}</td>
                <td>{formatPersianNumber(item.discountPrice, true)}</td>
                <td>{formatPersianNumber(item.priceAfterDiscount, true)}</td>
                <td>{formatPersianNumber(item.vatPrice, true)}</td>
                <td>{formatPersianNumber(item.finalPrice, true)}</td>
              </tr>
            ))}

            {/* Empty rows */}
            {[
              ...Array(
                Math.max(0, 5 - (invoiceData?.invoiceItems?.length ?? 0))
              ),
            ].map((_, i) => (
              <tr key={`empty-${i}`} className={styles.emptyRows}>
                <td colSpan="9"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className={styles.totalSection}>
        <div className={styles.totalBox}>
          <strong>جمع کل:</strong>
          <strong>
            {formatPersianNumber(invoiceData?.totalFinalPrice, true)} ریال
          </strong>
        </div>
      </div>
      <div className={styles.totalSection}>
        <div className={styles.totalBox}>
          <strong>مجموع تخفیفات: </strong>
          <strong>
            {formatPersianNumber(invoiceData?.totalDiscountPrice, true)} ریال
          </strong>
        </div>
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalBox}>
          <strong>مبلغ قابل پرداخت:</strong>
          <strong>
            {formatPersianNumber(invoiceData?.totalPriceAfterDiscount, true)}{" "}
            ریال
          </strong>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerSection}>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>روش پرداخت:</span>
          <span>{invoiceData?.paymentDetail?.settlementMethod}</span>
          {invoiceData?.paymentDetail?.referenceNumber && (
            <>
              <span
                className={styles.footerLabel}
                style={{ marginRight: "30%" }}
              >
                شماره پیگیری:
              </span>
              <span>
                {formatPersianNumber(
                  invoiceData?.paymentDetail?.referenceNumber
                )}
              </span>
            </>
          )}
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>تاریخ پرداخت:</span>
          <span>{formatDate(invoiceData?.paymentDetail?.paymentDate)}</span>
        </div>

        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>توضیحات:</span>
          <span>
            نوع صورتحساب: {invoiceData?.type} - موضوع صورتحساب:{" "}
            {invoiceData?.subject}
          </span>
        </div>
        <div
          className={styles.footerRow}
          style={{
            width: "100%",
            display: "flex",
            marginBlock: "50px",
            justifyContent: "space-around",
          }}
        >
          <span className={styles.footerLabel}>مهر و امضای فروشنده</span>
          <span className={styles.footerLabel}>مهر و امضای خریدار</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        data-no-print
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Tippy
            content={"اصلاح صورت حساب"}
            placement="top"
            zIndex={99999}
            appendTo={() => document.body}
          >
            <GButton
              type="primary"
              variant="outline"
              text={<Edit size={16} />}
              loading={false}
              htmlType="button"
              size="small"
              onClick={handleEditInvoice}
              disabled={isSubmitting || isPrinting || isGeneratingPdf}
            />
          </Tippy>
          <Tippy
            content={"چاپ صورت حساب"}
            placement="top"
            zIndex={99999}
            appendTo={() => document.body}
          >
            <GButton
              type="primary"
              variant="outline"
              text={<Printer size={16} />}
              loading={isPrinting}
              htmlType="button"
              size="small"
              onClick={handlePrint}
              disabled={isSubmitting || isGeneratingPdf}
            />
          </Tippy>
          <Tippy
            content={"دانلود PDF"}
            placement="top"
            zIndex={99999}
            appendTo={() => document.body}
          >
            <GButton
              type="primary"
              variant="outline"
              text={<Download size={16} />}
              loading={isGeneratingPdf}
              htmlType="button"
              size="small"
              onClick={handleDownloadPdf}
              disabled={isSubmitting || isPrinting}
            />
          </Tippy>
          <Tippy
            content={"لیست صورت حساب ها"}
            placement="top"
            zIndex={99999}
            appendTo={() => document.body}
          >
            <GButton
              type="primary"
              variant="outline"
              text={<List size={16} />}
              loading={false}
              htmlType="button"
              size="small"
              onClick={handleGoToInvoiceList}
              disabled={isSubmitting || isPrinting || isGeneratingPdf}
            />
          </Tippy>
        </div>

        <GButton
          type="primary"
          variant="filled"
          text={"ارسال به کار پوشه مودیان"}
          loading={isSubmitting}
          htmlType="button"
          size="medium"
          onClick={handleSendToModian}
          disabled={isPrinting || isGeneratingPdf}
        />
      </div>

      {/* CSS for hiding buttons during print */}
      <style jsx>{`
        @media print {
          [data-no-print] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoicePrint;
