import React from "react";
import { Field } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./password.css";
import { FormLabel } from "./FormLable/FormLabel";
import ErrorShow from "./ErrorShow";
export const PasswordField = ({
  name,
  placeholder,
  errors = {},
  touched = {},
  className,
  label,
  twoItemInOneRow,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`form-group ${twoItemInOneRow ? "two-in-one-row" : ""}`}>
      <FormLabel name={name} label={label} />

      <div className="input-wrapper" style={{ position: "relative" }} dir="rtl">
        <Field
          type={showPassword ? "text" : "password"}
          name={name}
          className={`form-control ${className} ${
            errors[name] && touched[name] ? "is-invalid" : ""
          }`}
          placeholder={placeholder}
          style={{
            ...style,
            paddingLeft: "12px",
          }}
        />

        <div
          className={"input-icon-left"}
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="sm" />
        </div>
      </div>
      <ErrorShow errors={errors} touched={touched} name={name} />
    </div>
  );
};
