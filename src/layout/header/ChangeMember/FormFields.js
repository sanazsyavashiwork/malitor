"use client";

import { useGetTaxPayersQuery } from "@/hooks/Tax-payers/useGetTaxPayersQuery";
import styles from "./fields.module.scss";
import { SelectField } from "@/components/general/GenericInputField/SelectField";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";

export const FormFields = ({ errors = {}, touched = {} }) => {
  const { taxPayerList, isLoadingTaxPayerList, refetch } = useGetTaxPayersQuery(
    {}
  );

  return (
    <div dir="rtl" style={{ marginBottom: "20px" }}>
      <div className={styles["flex-container"]}>
        <SelectField
          label={"تغییر مودی"}
          name={"selectedMember"}
          errors={errors}
          touched={touched}
          options={taxPayerList?.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(e) => {}}
        />
      </div>
    </div>
  );
};
