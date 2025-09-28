import React, { useState } from "react";
import styles from "./PasswordForm-styles.module.scss";
import { ArrowRight } from "lucide-react";
import { Form, Formik } from "formik";
import PasswordFormvalidationSchema from "./PasswordFormvalidationSchema";

import { Toast } from "react-bootstrap";
import { ROUTES } from "@/constValues/Routes";
import { PasswordField } from "@/components/general/GenericInputField/PasswordField";
import FormLink from "../../formLink/FormLink";
import useToast from "@/hooks/useToast";
import Link from "next/link";
import Image from "next/image";

const PasswordForm = () => {
  const {
    toasts,
    showSuccessToast,
    showErrorToast,
    hideSuccessToast,
    hideErrorToast,
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const class_toast = "bg-success";
  const class_toast_error = "bg-danger";
  const initialValues = {
    password: "",
  };
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  const username = getQueryParam("mobile");
  const handleSubmit = (data) => {
    setIsLoading(true);
  };

  return (
    <div className={styles["login-container-form"]}>
      <div className={styles["login-card-form"]}>
        {/* Header */}
        <div className={styles["login-header-form"]}>
          <div className={styles["back-arrow"]}>
            <Link href={ROUTES.AUTH.SIGN_IN}>
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
                  className={styles["img-fluid"]}
                  style={{ width: "100px" }}
                  alt={"logo"}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className={styles["form-container-login-form"]}>
          <div className={styles["input-wrapper"]}>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={PasswordFormvalidationSchema}
              onSubmit={handleSubmit}
              validate={(values) => {
                return {};
              }}
            >
              {({ errors, touched }) => {
                const allErrors = {
                  ...errors,
                };
                return (
                  <Form>
                    <p className={styles["subtitle"]}>رمز عبور را وارد کنید </p>

                    <PasswordField
                      hasLable={false}
                      name="password"
                      placeholder={""}
                      errors={allErrors}
                      touched={touched}
                    />
                    <FormLink
                      linkText={"ورود با رمز یکبار مصرف"}
                      link={`${ROUTES.AUTH.OTP}?mobile=${username}&shouldSendOtp=true`}
                    />
                    <FormLink
                      linkText={"فراموشی رمز عبور"}
                      link={ROUTES.AUTH.RESET_PASSWORD}
                    />

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
          backgroundColor: "#28a745",
          cursor: "pointer",
        }}
        show={toasts.success.show}
        onClose={hideSuccessToast}
        onClick={hideSuccessToast}
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

export default PasswordForm;
