"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { GenericDatePickerField } from "@/components/general/GenericInputField/DatePickerField/DatePickerField";
import { SelectField } from "@/components/general/GenericInputField/SelectField";
import { GenericTextAreaField } from "@/components/general/GenericInputField/GenericTextAreaField";
import { useGetCustomersQuery } from "@/hooks/Customers/useGetCustomersQuery";
import { useGetInvoicePatternsUnitsQuery } from "@/hooks/Enumes/useGetInvoicePatternsUnitsQuery";
import { useGetInvoiceTypesUnitsQuery } from "@/hooks/Enumes/useGetInvoiceTypesQuery";
import { useGetInvoiceItemUnitsQuery } from "@/hooks/Enumes/useGetInvoiceItemUnitsQuery";
import { useGetInvoiceSubjectsUnitsQuery } from "@/hooks/Enumes/useGetInvoiceSubjectsUnitsQuery";
import { useGetTaxPayersIDStuffQuery } from "@/hooks/Tax-payers/useGetTaxPayersIDStuffQuery";

export const InvoiceFormFields = ({ errors = {}, touched = {} }) => {
  const { customerList } = useGetCustomersQuery({});
  const { list: patternList } = useGetInvoicePatternsUnitsQuery({});
  const { list: typeList } = useGetInvoiceTypesUnitsQuery({});
  const { list: unitList } = useGetInvoiceItemUnitsQuery({});
  const { list: subjectList } = useGetInvoiceSubjectsUnitsQuery({});
  const { list: stuffList } = useGetTaxPayersIDStuffQuery({});
  console.log({ stuffList });
  const customerOptions =
    customerList?.data?.map((item) => ({
      value: item.id,
      label: `${item.name}      ${item.identificationCode}`,
    })) || [];

  // گزینه‌های الگوی صورتحساب
  const invoicePatternOptions =
    patternList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  // گزینه‌های نوع صورتحساب
  const invoiceTypeOptions =
    typeList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  // گزینه‌های واحد اندازه گیری
  const measurementUnitOptions =
    unitList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  // گزینه‌های نوع شخص خریدار
  const buyerPersonTypeOptions = [
    { value: "حقیقی", label: "حقیقی" },
    { value: "حقوقی", label: "حقوقی" },
  ];
  // گزینه‌های موضوع صورتحساب
  const invoiceSubjectOptions =
    subjectList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  const stuffIdOptions =
    stuffList?.data?.map((item) => ({
      value: item.id,
      label: `${item.name}`,
    })) || [];

  return (
    <div dir="rtl" style={{ marginBottom: "20px" }}>
      {/* ردیف اول - اطلاعات اصلی صورتحساب */}
      <div className={styles["flex-container"]}>
        <GenericDatePickerField
          name="date"
          label={"تاریخ صورتحساب"}
          placeholder="تاریخ را انتخاب کنید"
          showTodayButton={true}
          showClearButton={true}
          twoItemInOneRow={true}
        />
        <SelectField
          twoItemInOneRow={true}
          label={"موضوع صورتحساب"}
          name={"subject"}
          errors={errors}
          touched={touched}
          options={invoiceSubjectOptions}
          onChange={(e) => {}}
        />
      </div>

      {/* ردیف دوم - تاریخ و الگو */}
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"سریال داخلی صورتحساب"}
          name="internalSerial"
          placeholder={"200"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <SelectField
          label={"مشتری"}
          name="customer"
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          options={customerOptions}
          onChange={(e) => {}}
        />
      </div>

      {/* ردیف سوم - نوع صورتحساب و مشتری */}
      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"نوع صورتحساب"}
          name={"type"}
          errors={errors}
          touched={touched}
          options={invoiceTypeOptions}
          onChange={(e) => {}}
        />
        <SelectField
          twoItemInOneRow={true}
          label={"الگوی صورتحساب"}
          name={"pattern"}
          errors={errors}
          touched={touched}
          options={invoicePatternOptions}
          onChange={(e) => {}}
        />
      </div>

      {/* ردیف چهارم - شناسه اقتصادی و نوع شخص */}
      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"نوع شخص خریدار"}
          name={"customerType"}
          errors={errors}
          touched={touched}
          options={buyerPersonTypeOptions}
          onChange={(e) => {}}
        />
        <GenericInputField
          label={"کد ملی خریدار"}
          name="customerNationalId"
          placeholder={"0015339897"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>

      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شناسه اقتصادی خریدار"}
          name="customerEconomicCode"
          placeholder={"0015339897"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      {/* ردیف پنجم - شناسه کالا و واحد اندازه گیری */}
      <div className={styles["flex-container"]}>
        <SelectField
          label={"شناسه کالا و خدمات"}
          name="stuffId"
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          options={stuffIdOptions}
          onChange={(e) => {}}
        />
      </div>

      {/* ردیف هفتم - شرح کالا/خدمات */}
      <div className={styles["flex-container"]}>
        <GenericTextAreaField
          label={"شرح کالا/خدمات"}
          name="description"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          name="vatRate"
          label={"نرخ مالیات بر ارزش افزوده"}
          placeholder={"9.00"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"نرخ مالیات بر ارزش افزوده"}
        />
      </div>

      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"واحد اندازه گیری"}
          name={"unit"}
          errors={errors}
          touched={touched}
          options={measurementUnitOptions}
          onChange={(e) => {}}
        />
        <GenericInputField
          label={"مقدار/تعداد"}
          name="quantity"
          placeholder={"0.00"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          type="number"
        />
      </div>

      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"فی"}
          name="unitPrice"
          placeholder={"0.00"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          type="number"
        />
        <GenericInputField
          label={"مبلغ تخفیف"}
          name="unitDiscount"
          placeholder={"0.00"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          type="number"
        />
      </div>
    </div>
  );
};
