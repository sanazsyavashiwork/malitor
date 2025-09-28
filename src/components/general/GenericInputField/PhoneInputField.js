import { Field } from "formik";
import styles from "./fields.module.scss";
import ErrorShow from "./ErrorShow";
import React from "react";
import { FormLabel } from "./FormLable/FormLabel";
import { convertPersianNumbersToEnglish } from "./utils";

export const PhoneInputField = ({
  name,
  placeholder,
  errors = {},
  touched = {},
  className,
  countryCodeClassName,
  phoneFieldProps = {},
  label,
  twoItemInOneRow,
  hasLable = true,
  icon, // آیکون جدید
  iconPosition = "left", // موقعیت آیکون: 'left' یا 'right'
  onIconClick, // تابع کلیک روی آیکون
}) => {
  const hasPhoneError = errors[name] && touched[name];
  const phoneFieldClassName = `${styles["form-control"]} ${
    styles["input-group"]
  }${className} ${
    hasPhoneError ? `${styles["is-invalid"]}${styles["input-icon-right"]}` : ""
  }`;

  const handlePhoneChange = (e, field, form) => {
    const value = e.target.value;
    const convertedValue = convertPersianNumbersToEnglish(value);
    const numericValue = convertedValue.replace(/[^\d]/g, "");

    form.setFieldValue(field.name, numericValue);
  };

  return (
    <div
      className={`${styles["form-group"]} ${
        twoItemInOneRow ? styles["two-in-one-row"] : ""
      }`}
      dir="rtl"
    >
      {hasLable && <FormLabel name={name} label={label} />}

      <div
        className={`${styles["input-with-icon-container"]}  ${
          styles["input-group"]
        } ${errors[name] && touched[name] ? styles["input-group-error"] : ""}`}
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {icon && iconPosition === "right" && (
          <div
            className={`${styles["input-icon"]} ${styles["input-icon-right"]} `}
            // className='input-icon input-icon-right'
            onClick={onIconClick}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: onIconClick ? "pointer" : "default",
              zIndex: 1,
              color: "#6c757d",
            }}
          >
            {icon}
          </div>
        )}

        <Field name={name}>
          {({ field, form }) => (
            <input
              dir="rtl"
              type="tel"
              inputMode="numeric"
              name={field.name}
              value={field.value || ""}
              onChange={(e) => handlePhoneChange(e, field, form)}
              onBlur={field.onBlur}
              className={phoneFieldClassName}
              placeholder={placeholder}
              style={{
                border: "none",
                flex: 1,
                paddingRight:
                  icon && iconPosition === "right" ? "35px" : "10px",
                paddingLeft: icon && iconPosition === "left" ? "35px" : "10px",
              }}
              {...phoneFieldProps}
            />
          )}
        </Field>

        {icon && iconPosition === "left" && (
          <div
            // className='input-icon input-icon-left'
            onClick={onIconClick}
            style={{
              position: "absolute",
              left: "10px",
              top: "45%",
              transform: "translateY(-50%)",
              cursor: onIconClick ? "pointer" : "default",
              zIndex: 1,
              color: "#6c757d",
              backgroundColor: "white",
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <ErrorShow errors={errors} touched={touched} name={name} />
    </div>
  );
};
