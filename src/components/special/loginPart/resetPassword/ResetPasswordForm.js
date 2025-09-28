import React, { useState } from "react";
import styels from "./ResetPasswordForm-styles.module.scss";
import { ArrowRight, Smartphone } from "lucide-react";
import { Form, Formik } from "formik";
import ResetPasswordFormvalidationSchema from "./ResetPasswordFormvalidationSchema";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { ROUTES } from "@/constValues/Routes";
import useToast from "@/hooks/useToast";
import Link from "next/link";
import Image from "next/image";

const ResetPasswordForm = () => {
  const {
    toasts,
    showSuccessToast,
    showErrorToast,
    hideSuccessToast,
    hideErrorToast,
  } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    mobile: "",
  };

  const handleSubmit = (data) => {
    console.log({ data });
    console.log(data.mobile);
  };

  return (
    <div className={styels["login-container-form"]}>
      <div className={styels["login-card-form"]}>
        {/* Header */}
        <div className={styels["login-header-form"]}>
          <div className={styels["back-arrow"]}>
            <Link href={ROUTES.AUTH.SIGN_IN}>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className={styels["login-content"]}>
          <div className={styels["logo-container"]}>
            <div className={styels["logo"]}>
              <Link href="/">
                <Image
                  src={"/assets/img/sampleIcon.png"}
                  className={styels["img-fluid"]}
                  style={{ width: "100px" }}
                  alt={"logo"}
                  onClick={() => {
                    this.setState({ home: true });
                  }}
                />
              </Link>
            </div>
          </div>

          <h1 className={styels["main-title"]}>تغییر رمز عبور</h1>

          <p className={styels["subtitle"]}>
            برای تغییر رمز عبور, شماره موبایل خود را وارد کنید
          </p>
        </div>

        {/* Form */}
        <div className={styels["form-container-login-form"]}>
          <div className={styels["input-wrapper"]}>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={ResetPasswordFormvalidationSchema}
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
                    <PhoneInputField
                      hasLable={false}
                      name="mobile"
                      placeholder={"...۰۹"}
                      errors={allErrors}
                      touched={touched}
                      icon={
                        <Smartphone
                          size={18}
                          style={{ backgroundColor: "white" }}
                        />
                      }
                      iconPosition="left"
                    />
                    <button
                      type="submit"
                      className={styels["submit-button-form-login"]}
                    >
                      {isLoading ? "در حال تایید " : "تایید"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
