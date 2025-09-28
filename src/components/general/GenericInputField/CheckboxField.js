import React from "react";
import { Field } from "formik";
import styles from "./fields.module.scss";
import ErrorShow from "./ErrorShow";
import { FormLabel } from "./FormLable/FormLabel";

export const CheckboxField = ({
  name,
  label,
  errors = {},
  touched = {},
  className,
  twoItemInOneRow = false,
  isDisabled = false,
  checkboxText, // متن کنار چک‌باکس
  labelPosition = "top", // 'top', 'right', 'left', 'none'
  checkboxStyle = "default", // 'default', 'switch'
  size = "normal", // 'small', 'normal', 'large'
  color = "primary", // 'primary', 'success', 'warning', 'danger'
  ...fieldProps
}) => {
  const hasError = errors[name] && touched[name];

  // کلاس‌های سایز
  const sizeClass =
    {
      small: styles["checkbox-small"],
      normal: styles["checkbox-normal"],
      large: styles["checkbox-large"],
    }[size] || styles["checkbox-normal"];

  // کلاس‌های رنگ
  const colorClass =
    {
      primary: styles["checkbox-primary"],
      success: styles["checkbox-success"],
      warning: styles["checkbox-warning"],
      danger: styles["checkbox-danger"],
    }[color] || styles["checkbox-primary"];

  // کلاس اصلی چک‌باکس
  const checkboxClassName = `${
    styles["form-checkbox"]
  } ${sizeClass} ${colorClass} ${
    checkboxStyle === "switch" ? styles["checkbox-switch"] : ""
  } ${className || ""} ${hasError ? styles["is-invalid"] : ""} ${
    isDisabled ? styles["is-disabled"] : ""
  }`;

  const containerClassName = `${styles["form-group"]} ${
    styles["checkbox-group"]
  } ${twoItemInOneRow ? styles["two-in-one-row"] : ""}`;

  return (
    <div
      className={containerClassName}
      dir="rtl"
      style={{ marginLeft: "20px" }}
    >
      {/* Label بالای چک‌باکس */}
      {labelPosition === "top" && label && (
        <FormLabel name={name} label={label} />
      )}

      <div className={styles["checkbox-container"]}>
        {labelPosition === "right" && label && (
          <FormLabel
            name={name}
            label={label}
            className={styles["checkbox-label-right"]}
          />
        )}

        <Field name={name}>
          {({ field, form }) => (
            <div className={styles["checkbox-wrapper"]}>
              <input
                type="checkbox"
                id={name}
                name={field.name}
                checked={field.value || false}
                onChange={(e) => {
                  form.setFieldValue(field.name, e.target.checked);
                }}
                onBlur={field.onBlur}
                disabled={isDisabled}
                className={checkboxClassName}
                {...fieldProps}
              />

              <label
                htmlFor={name}
                className={`${styles["checkbox-custom"]} ${
                  checkboxStyle === "switch" ? styles["switch-custom"] : ""
                }`}
              >
                {checkboxStyle === "switch" && (
                  <span className={styles["switch-slider"]}></span>
                )}
                {checkboxStyle !== "switch" && (
                  <span className={styles["checkmark"]}>✓</span>
                )}
              </label>

              {checkboxText && (
                <span
                  className={`${styles["checkbox-text"]} ${
                    isDisabled ? styles["text-disabled"] : ""
                  }`}
                  onClick={() => {
                    if (!isDisabled) {
                      form.setFieldValue(field.name, !field.value);
                    }
                  }}
                >
                  {checkboxText}
                </span>
              )}
            </div>
          )}
        </Field>

        {labelPosition === "left" && label && (
          <FormLabel
            name={name}
            label={label}
            className={styles["checkbox-label-left"]}
          />
        )}
      </div>

      <ErrorShow errors={errors} touched={touched} name={name} />
    </div>
  );
};
