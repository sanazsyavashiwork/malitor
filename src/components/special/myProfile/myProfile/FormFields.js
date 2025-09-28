"use client";

import { GenericDatePickerField } from "@/components/general/GenericInputField/DatePickerField/DatePickerField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl">
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"نام"}
          name="firstname"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          label={"نام خانوادگی"}
          name="lastname"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"تلفن"}
          name="phoneNumber"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          name="email"
          type="email"
          label="پست الکترونیکی"
          placeholder="example@email.com"
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شماره ملی"}
          name="nationalId"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericDatePickerField
          name="registrationDate"
          label={"تاریخ ثبت نام"}
          placeholder="تاریخ را انتخاب کنید"
          showTodayButton={true}
          showClearButton={true}
          twoItemInOneRow={true}
          readOnly={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericDatePickerField
          name="creditExpirationDate"
          label={"تاریخ اعتبار"}
          placeholder="تاریخ را انتخاب کنید"
          showTodayButton={true}
          showClearButton={true}
          twoItemInOneRow={true}
          readOnly={true}
        />
      </div>
    </div>
  );
};
