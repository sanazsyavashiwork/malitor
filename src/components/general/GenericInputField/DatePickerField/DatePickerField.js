import React, { useEffect, useState, useRef } from "react";
import { Field, useFormikContext } from "formik";
import styles from "./fields.module.scss";
import { DatePicker } from "react-advance-jalaali-datepicker";
import ErrorShow from "../ErrorShow";
import { FormLabel } from "../FormLable/FormLabel";
import { toJalaali } from "jalaali-js";

export const GenericDatePickerField = ({
  name,
  label,
  placeholder = "تاریخ را انتخاب کنید",
  inputValue,
  className,
  twoItemInOneRow = false,
  isDisabled = false,
  readOnly = false,
  centerAlign = false,
  spacing = "normal",
  format = "jYYYY/jMM/jDD",
  showTodayButton = true,
  showClearButton = true,
  usePersianDigits = true,
  onBlur,
  ...fieldProps
}) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const [localValue, setLocalValue] = useState("");
  const isInitialized = useRef(false);

  // تغییر اصلی: وقتی readOnly باشه، disabled هم true میشه
  const shouldDisable = Boolean(inputValue) || isDisabled || readOnly;
  const hasError = errors[name] && touched[name];

  // تبدیل به تاریخ شمسی
  const convertToJalaali = (dateInput) => {
    if (!dateInput) return "";

    try {
      let date;

      if (typeof dateInput === "number") {
        const timestamp =
          dateInput < 10000000000 ? dateInput * 1000 : dateInput;
        date = new Date(timestamp);
      } else if (typeof dateInput === "string") {
        if (dateInput.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
          return dateInput;
        }
        date = new Date(dateInput);
        if (isNaN(date.getTime())) {
          return "";
        }
      } else if (dateInput instanceof Date) {
        date = dateInput;
      } else {
        return "";
      }

      const jalaaliDate = toJalaali(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      return `${jalaaliDate.jy}/${jalaaliDate.jm
        .toString()
        .padStart(2, "0")}/${jalaaliDate.jd.toString().padStart(2, "0")}`;
    } catch (error) {
      console.error("Date conversion error:", error);
      return "";
    }
  };

  // اولین بار تنظیم مقدار
  useEffect(() => {
    if (!isInitialized.current && inputValue) {
      const convertedValue = convertToJalaali(inputValue);
      console.log("Initial setup:", { inputValue, convertedValue });

      if (convertedValue) {
        setLocalValue(convertedValue);
        setFieldValue(name, convertedValue);
        isInitialized.current = true;
      }
    }
  }, [inputValue, name, setFieldValue]);

  // همگام‌سازی local value با form value
  useEffect(() => {
    if (values[name] !== localValue) {
      setLocalValue(values[name] || "");
    }
  }, [values[name]]);

  const handleDateChange = (value) => {
    // بررسی اضافی: اگه disabled یا readOnly باشه، اجازه تغییر نمیده
    if (shouldDisable || readOnly) {
      return;
    }

    console.log("Date change:", value);

    let convertedValue = "";
    if (value) {
      convertedValue = convertToJalaali(value);
    }

    setLocalValue(convertedValue);
    setFieldValue(name, convertedValue);
  };

  // راه‌حل اضافی: اگه readOnly باشه، کلیک رو هم غیرفعال کن
  const handleWrapperClick = (e) => {
    if (readOnly || shouldDisable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const fieldClassName = `${styles["form-control"]} ${styles["input-group"]} ${
    styles["noFocusStyle"]
  } ${className} ${hasError && !shouldDisable ? styles["is-invalid"] : ""} ${
    twoItemInOneRow ? styles["two-in-one-row"] : ""
  } ${readOnly ? styles["readonly"] : ""} ${
    shouldDisable ? styles["disabled"] : ""
  }`;

  return (
    <div
      className={`${styles["form-group"]} ${
        twoItemInOneRow ? styles["two-in-one-row"] : ""
      } ${errors[name] ? styles["input-group-error"] : ""} `}
      dir="rtl"
    >
      <FormLabel name={name} label={label} />
      <div
        className={`${styles["input-group"]} ${
          centerAlign ? styles["center-align"] : ""
        } ${errors[name] && touched[name] ? styles["input-group-error"] : ""}`}
      >
        <Field name={name}>
          {({ field }) => (
            <div
              className={styles["datepicker-wrapper"]}
              style={{
                padding: "10px",
                pointerEvents: readOnly || shouldDisable ? "none" : "auto",
                opacity: readOnly || shouldDisable ? 0.6 : 1,
              }}
              onClick={handleWrapperClick}
            >
              <DatePicker
                {...fieldProps}
                key={`${name}-${localValue}`}
                value={localValue}
                onChange={handleDateChange}
                format={format}
                placeholder={localValue ? localValue : placeholder}
                showTodayButton={showTodayButton && !readOnly && !shouldDisable}
                showClearButton={showClearButton && !readOnly && !shouldDisable}
                usePersianDigits={usePersianDigits}
                disabled={shouldDisable}
                readOnly={readOnly}
                // پراپ‌های اضافی برای غیرفعال کردن
                editable={!readOnly && !shouldDisable}
                clickable={!readOnly && !shouldDisable}
              />
            </div>
          )}
        </Field>
      </div>

      {!shouldDisable && (
        <ErrorShow errors={errors} touched={touched} name={name} />
      )}
    </div>
  );
};
