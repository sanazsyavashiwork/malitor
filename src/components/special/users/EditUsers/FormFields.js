"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { PasswordField } from "@/components/general/GenericInputField/PasswordField";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { DatePicker } from "react-persian-datepicker";
import { GenericDatePickerField } from "@/components/general/GenericInputField/DatePickerField/DatePickerField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl">
      <CheckboxField
        name="active"
        checkboxText="آیا فعال است؟"
        errors={errors}
        touched={touched}
        color="primary"
      />
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
          name="nationalId"
          label={"شماره ملی"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <PhoneInputField
          label={"تلفن"}
          name="phoneNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="email"
          type="email"
          label="پست الکترونیکی"
          placeholder="example@email.com"
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericDatePickerField
          name="creditExpirationDate"
          label={"تاریخ انقضای اعتبار"}
          placeholder={"1403/12/29"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          readOnly={false}
        />
      </div>

      <div className={styles["flex-container"]}>
        <GenericInputField
          name="username"
          label={"نام کاربری"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <PasswordField
          label={"رمز عبور"}
          name="password"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
    </div>
  );
};
