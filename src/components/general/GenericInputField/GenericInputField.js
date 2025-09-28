import { Field, useFormikContext } from "formik";
import ErrorShow from "./ErrorShow";
import styles from "./fields.module.scss";
import { FormLabel } from "./FormLable/FormLabel";
import React, { useEffect } from "react";

export const GenericInputField = ({
  name,
  type = "text",
  placeholder,
  label,
  inputValue,
  errors = {},
  touched = {},
  className,
  twoItemInOneRow = false,
  isDisabled = false,
  centerAlign = false,
  spacing = "normal",
  numericKeyboard = false,
  onBlur,
  maxLength,
  hasInfoIcon,
  title,
  content,
  ...fieldProps
}) => {
  const { setFieldValue, setFieldError, setFieldTouched } = useFormikContext();
  const shouldDisable = Boolean(inputValue) || isDisabled;
  const hasError = errors[name] && touched[name];

  // کلاس‌های فاصله‌گذاری
  const spacingClass =
    {
      tight: styles["spacing-tight"],
      normal: styles["spacing-normal"],
      wide: styles["horizontal-spacing-wide"],
    }[spacing] || styles["spacing-normal"];

  const fieldClassName = `${styles["form-control"]}  ${styles["input-group"]} ${
    styles["noFocusStyle"]
  } ${className} ${hasError && !shouldDisable ? styles["is-invalid"] : ""} ${
    twoItemInOneRow ? styles["two-in-one-row"] : ""
  }`;

  // تعیین inputMode و pattern برای کیبورد عددی
  const getInputProps = () => {
    const props = {};

    if (numericKeyboard || type === "number" || name === "code") {
      props.inputMode = "numeric";
      props.pattern = "[0-9]*";
    }

    if (maxLength) {
      props.maxLength = maxLength;
    }

    return props;
  };

  useEffect(() => {
    if (inputValue !== undefined && inputValue !== null && inputValue !== "") {
      setFieldValue(name, inputValue);
      setFieldTouched(name, true);
      setFieldError(name, "");
    }
  }, [inputValue, name, setFieldValue, setFieldTouched, setFieldError]);

  return (
    <div
      className={`${styles["form-group"]} ${
        twoItemInOneRow ? styles["two-in-one-row"] : ""
      } ${errors[name] && touched[name] ? styles["input-group-error"] : ""}`}
      dir="rtl"
    >
      <FormLabel
        name={name}
        label={label}
        hasInfoIcon={hasInfoIcon}
        title={title}
        content={content}
      />
      <div
        className={` ${styles["input-group"]} ${
          centerAlign ? styles["center-align"] : ""
        }
        ${errors[name] && touched[name] ? styles["input-group-error"] : ""}`}
      >
        <Field
          dir="rtl"
          disabled={shouldDisable}
          type={type}
          name={name}
          className={`${fieldClassName} ${spacingClass}`}
          placeholder={inputValue || placeholder}
          onBlur={(e) => {
            // اول blur اصلی formik را اجرا کن
            e.persist();
            if (typeof setFieldTouched === "function") {
              setFieldTouched(name, true);
            }
            // سپس onBlur کاستوم را اجرا کن
            if (onBlur && typeof onBlur === "function") {
              onBlur(e);
            }
          }}
          {...getInputProps()}
          {...fieldProps}
        />
      </div>
      {!shouldDisable && (
        <ErrorShow errors={errors} touched={touched} name={name} />
      )}
    </div>
  );
};
