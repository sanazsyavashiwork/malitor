import React from "react";
const ErrorShow = ({ errors, touched, name }) => {
  const hasError = errors[name] && touched[name];
  return hasError ? (
    <div
      dir="rtl"
      className="text-danger"
      style={{ textAlign: "start", fontSize: "12px" }}
    >
      {errors[name]}
    </div>
  ) : null;
};
export default ErrorShow;
