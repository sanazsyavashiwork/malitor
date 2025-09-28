import React, { useEffect, useState } from "react";
import styles from "./OTP-styles.module.scss";
import { ArrowRight, Smartphone } from "lucide-react";
import { Form, Formik } from "formik";
import { OTPvalidationSchema } from "./OTPvalidationSchema";
import { Toast } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { ROUTES } from "@/constValues/Routes";
import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import useToast from "@/hooks/useToast";
import { Timer } from "../../Timer/Timer";
import FormLink from "../../formLink/FormLink";
import Link from "next/link";
import Image from "next/image";

const OTPForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    code: "",
  };
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  const username = getQueryParam("mobile");
  const isForgetPassword = getQueryParam("isForgetPassword");
  const isNewUser = getQueryParam("isNewUser");
  const shouldSendOtp = getQueryParam("shouldSendOtp");

  const isForgetPasswordBool = isForgetPassword === "true";
  const {
    toasts,
    showSuccessToast,
    showErrorToast,
    hideSuccessToast,
    hideErrorToast,
  } = useToast();

  const class_toast = "bg-success";
  const class_toast_error = "bg-danger";

  const convertPersianToEnglish = (input) => {
    if (!input) return input;

    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let result = input.toString();

    for (let i = 0; i < persianDigits.length; i++) {
      result = result.replace(
        new RegExp(persianDigits[i], "g"),
        englishDigits[i]
      );
    }

    return result;
  };

  const send_otp = () => {};
  const handleSubmit = (data) => {
    setIsLoading(true);
    const convertedCode = convertPersianToEnglish(data.code);
    console.log("Converted Code:", convertedCode);
  };

  useEffect(() => {
    if (shouldSendOtp) {
      send_otp();
    }
  }, [username, shouldSendOtp]);
  // if (isAuthenticated()) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div className={styles["login-container-form"]}>
      <div className={styles["login-card-form"]}>
        {/* Header */}
        <div className={styles["login-header-form"]}>
          <div className={styles["back-arrow"]}>
            <Link
              href={
                isForgetPasswordBool
                  ? ROUTES.AUTH.RESET_PASSWORD
                  : ROUTES.AUTH.SIGN_IN
              }
            >
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className={styles["login-content"]}>
          <div className={styles["logo-container"]}>
            <div className={styles["logo"]}>
              <Link href="/">
                <Image
                  src={"/assets/img/sampleIcon.png"}
                  className="img-fluid"
                  style={{ width: "100px" }}
                  alt={"logo"}
                />
              </Link>
            </div>
          </div>

          <h1 className={styles["main-title"]}>کد تایید را وارد کنید </h1>

          <p className={styles["subtitle"]}>
            کد تایید برای شماره {username} پیامک شد{" "}
          </p>
        </div>

        {/* Form */}
        <div className={styles["form-container-login-form"]}>
          <div className={styles["input-wrapper"]}>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={OTPvalidationSchema}
              onSubmit={handleSubmit}
              validate={(values) => {
                return {};
              }}
            >
              {({ errors, touched, values }) => {
                const allErrors = {
                  ...errors,
                };
                return (
                  <Form>
                    <GenericInputField
                      spacing="wide"
                      centerAlign={true}
                      name="code"
                      numericKeyboard={true}
                      errors={allErrors}
                      touched={touched}
                      onBlur={() => handleSubmit(values)}
                      maxLength={5}
                    />{" "}
                    <FormLink
                      linkText={"ورود با رمز عبور"}
                      link={`${ROUTES.AUTH.PASSWORD}?mobile=${username}`}
                    />
                    <Timer handleResend={send_otp} />
                    <button
                      type="submit"
                      className={styles["submit-button-form-login"]}
                    >
                      {isLoading ? "در حال ورود" : "ورود"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      {/* Success Toast */}
      <Toast
        className={"rtl position-fixed color-white z-index-top " + class_toast}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999999999999,
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "350px",
          backgroundColor: "#28a745", // سبز
          cursor: "pointer", // نشان‌دهنده کلیک
        }}
        show={toasts.success.show}
        onClose={hideSuccessToast}
        onClick={hideSuccessToast} // وقتی کلیک شد بسته بشه
        autohide={true}
        delay={4000}
      >
        <Toast.Body
          style={{
            padding: "12px 20px",
            fontSize: "12px",
            textAlign: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          {toasts.success.message}
        </Toast.Body>
      </Toast>
      {/* Error Toast */}
      <Toast
        className={
          "rtl position-fixed color-white z-index-top " + class_toast_error
        }
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999999999999,
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "350px",
          backgroundColor: "#dc3545", // قرمز
        }}
        show={toasts.error.show}
        onClose={hideErrorToast}
        autohide={true}
        delay={4000}
      >
        <Toast.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            fontSize: "11px",
            textAlign: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          <div>{toasts.error.message}</div>
          <button
            onClick={hideErrorToast}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              padding: "4px 5px",
              fontSize: "11px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            بستن
          </button>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default OTPForm;
