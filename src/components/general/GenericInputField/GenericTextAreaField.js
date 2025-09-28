import { Field, useFormikContext } from "formik";
import ErrorShow from "./ErrorShow";
import styles from "./fields.module.scss";
import { FormLabel } from "./FormLable/FormLabel";
import React, { useEffect } from "react";

export const GenericTextAreaField = ({
  name,
  placeholder,
  label,
  inputValue,
  errors = {},
  touched = {},
  className,
  twoItemInOneRow = false,
  isDisabled = false,
  hasInfoIcon,
  title,
  content,
  rows = 3,
  cols,
  resize = "vertical", // 'none', 'both', 'horizontal', 'vertical'
  ...fieldProps
}) => {
  const { setFieldValue, setFieldError, setFieldTouched } = useFormikContext();
  const shouldDisable = Boolean(inputValue) || isDisabled;
  const hasError = errors[name] && touched[name];

  const fieldClassName = `${styles["form-control"]} ${styles["input-group"]} ${
    styles["noFocusStyle"]
  } ${className} ${hasError && !shouldDisable ? styles["is-invalid"] : ""} ${
    twoItemInOneRow ? styles["two-in-one-row"] : ""
  }`;

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
      } ${errors[name] ? styles["input-group-error"] : ""}`}
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
        className={`${styles["input-group"]} ${
          errors[name] && touched[name] ? styles["input-group-error"] : ""
        }`}
      >
        <Field
          as="textarea"
          dir="rtl"
          disabled={shouldDisable}
          name={name}
          className={fieldClassName}
          placeholder={inputValue || placeholder}
          rows={rows}
          cols={cols}
          style={{ resize }}
          {...fieldProps}
        />
      </div>
      {!shouldDisable && (
        <ErrorShow errors={errors} touched={touched} name={name} />
      )}
    </div>
  );
};
