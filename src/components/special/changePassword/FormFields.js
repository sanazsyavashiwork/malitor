"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { GenericTextAreaField } from "@/components/general/GenericInputField/GenericTextAreaField";
import { PasswordField } from "@/components/general/GenericInputField/PasswordField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl">
      <PasswordField
        label={"رمز قدیمی"}
        name="currentPassword"
        placeholder={""}
        errors={errors}
        touched={touched}
        twoItemInOneRow={true}
      />
      <div className={styles["flex-container"]}>
        <PasswordField
          label={"رمز جدید"}
          name="newPassword"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <PasswordField
          label={"تکرار رمز جدید"}
          name="confirmationPassword"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
    </div>
  );
};
