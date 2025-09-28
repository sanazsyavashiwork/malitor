import { Field } from "formik";
import ErrorShow from "./ErrorShow";
import styles from "./fields.module.scss";
import { FormLabel } from "./FormLable/FormLabel";
import React, { useState } from "react";
import useMobileSize from "@/utils/useMobileSize";

export const SelectField = ({
  name,
  label,
  options = [], // [{value: 'option1', label: 'گزینه ۱'}, {value: 'option2', label: 'گزینه ۲'}]
  errors = {},
  touched = {},
  className = "",
  twoItemInOneRow = false,
  placeholder = "انتخاب کنید...",
  isDisabled = false,
  multiple = false,
  onChange,
  size = 4, // برای حالت multiple، تعداد آیتم‌های قابل مشاهده
  ...fieldProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = errors[name] && touched[name];
  const isMobile = useMobileSize();

  const containerClassName = `${styles["form-group"]} ${
    twoItemInOneRow ? styles["two-in-one-row"] : ""
  } ${errors[name] && touched[name] ? styles["input-group-error"] : ""}`;

  // اصلاح کلاس‌نام select - اضافه کردن فاصله بین کلاس‌ها
  const selectClassName = [
    styles["select-field"] || "select-field", // استفاده از CSS module یا fallback
    styles["form-control"],
    className,
    hasError ? styles["is-invalid"] : "",
    isDisabled ? styles["disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  // استایل inline برای تضمین عرض کامل
  const selectStyle = {
    width: twoItemInOneRow && !isMobile ? "48%" : "100%",
    minWidth: "0", // برای جلوگیری از overflow در flex containers
    flex: "1", // اگر در flex container باشد
  };

  const handleSelectClick = () => {
    if (!isDisabled && !multiple) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectBlur = (e) => {
    setIsOpen(false);
    if (e.target.onBlur) {
      e.target.onBlur(e);
    }
  };

  const containerStyle = {
    width: twoItemInOneRow && !isMobile ? "48%" : "100%",
    // maxWidth: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className={containerClassName} style={containerStyle}>
      <FormLabel name={name} label={label} />

      <Field name={name}>
        {({ field }) => (
          <div
            className={`${styles["select-container"] || "select-container"} ${
              styles["input-group"]
            }`}
            dir="rtl"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              paddingInline: "0.5rem",
            }}
          >
            <select
              id={name}
              name={field.name}
              value={field.value || (multiple ? [] : "")}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              onBlur={handleSelectBlur}
              onClick={handleSelectClick}
              disabled={isDisabled}
              multiple={multiple}
              size={multiple ? size : undefined}
              className={selectClassName}
              style={selectStyle}
              {...fieldProps}
            >
              {/* نمایش placeholder فقط در حالت single select */}
              {!multiple && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}

              {options.map((option, index) => (
                <option
                  key={option.value || index}
                  value={option.value}
                  disabled={option.disabled || false}
                >
                  {option.label}
                </option>
              ))}
            </select>

            {/* آیکون dropdown برای single select */}
            {!multiple && (
              <span className={`select-arrow ${isOpen ? "is-open" : ""}`}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        )}
      </Field>

      <ErrorShow errors={errors} touched={touched} name={name} />
    </div>
  );
};
