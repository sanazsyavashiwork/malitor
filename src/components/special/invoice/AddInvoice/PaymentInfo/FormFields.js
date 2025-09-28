"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { GenericDatePickerField } from "@/components/general/GenericInputField/DatePickerField/DatePickerField";
import { SelectField } from "@/components/general/GenericInputField/SelectField";
import { GenericTextAreaField } from "@/components/general/GenericInputField/GenericTextAreaField";
import { useGetCustomersQuery } from "@/hooks/Customers/useGetCustomersQuery";
import { useGetSettlementMethodsQuery } from "@/hooks/Enumes/useGetSettlementMethodsQuery";
import { useGetPaymentMethodsQuery } from "@/hooks/Enumes/useGetPaymentMethodsQuery";

export const InvoiceFormFields = ({ errors = {}, touched = {} }) => {
  const { list: sattlementList } = useGetSettlementMethodsQuery({});
  const { list: paymentMethodList } = useGetPaymentMethodsQuery({});

  const paymentMethodOptions =
    paymentMethodList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  const invoiceSubjectOptions =
    sattlementList?.data?.map((item) => ({
      value: item,
      label: `${item}`,
    })) || [];

  return (
    <div dir="rtl" style={{ marginBottom: "20px" }}>
      {/* ردیف اول - اطلاعات اصلی صورتحساب */}
      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"روش تسویه"}
          name={"settlementMethod"}
          errors={errors}
          touched={touched}
          options={invoiceSubjectOptions}
          onChange={(e) => {}}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"موضوع مالیات بند 17"}
          name="seventeenthTaxQoute"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          label={"شماره سوییچ پرداخت"}
          name="paymentSwitchNumber"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"روش پرداخت"}
          name={"paymentMethod"}
          errors={errors}
          touched={touched}
          options={paymentMethodOptions}
          onChange={(e) => {}}
        />
        <GenericDatePickerField
          name="paymentDate"
          label={"تاریخ پرداخت"}
          placeholder="تاریخ را انتخاب کنید"
          showTodayButton={true}
          showClearButton={true}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شماره پیگیری / شماره مرجع"}
          name="referenceNumber"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
    </div>
  );
};
