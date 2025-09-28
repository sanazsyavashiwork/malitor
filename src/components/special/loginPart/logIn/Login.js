import React, { useState } from "react";
import styles from "./login-styles.module.scss";
import { ArrowRight } from "lucide-react";
import { Form, Formik } from "formik";
import loginvalidationSchema from "./loginvalidationSchema";

import { PasswordField } from "@/components/general/GenericInputField/PasswordField";
import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { usePostAuthenticateQuery } from "@/hooks/AuthenticationController/usePostAuthenticateQuery ";
import { useSuccessAuth } from "@/hooks/useSuccessAuth";
import { useSetRole } from "@/hooks/useSetRole";
import { useToast } from "@/hooks/useToast2";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import { ROLE_KEYS } from "@/constValues/roles";
import Image from "next/image";
import { ROUTES } from "@/constValues/Routes";

const LoginForm = () => {
  const { successToast, errorToast } = useToast();
  const { setTokens } = useSuccessAuth();
  const { setRole } = useSetRole();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending } = usePostAuthenticateQuery({});
  const { handleError } = useErrorApiHandler();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (data, { resetForm }) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (data) => {
        resetForm();
        setIsLoading(false);
        successToast("ورود موفقیت آمیز");
        const { access_token, refresh_token, role } = data.data;
        setRole(role);
        setTokens(access_token, refresh_token, role === ROLE_KEYS.USER);
      },
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        handleError(error);
        errorToast("رمز ورود یا نام کاربری اشتباه است ");
      },
    });
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <div className={styles["authentication-container"]}>
      <div className={styles["authentication-wrapper"]}>
        {/* Image Section */}
        <div className={styles["image-section"]}>
          <div className={styles["image-content"]}>
            <Image
              src={`/assets/images/inner-pages/1.svg`}
              alt="Authentication illustration"
              className={`img-fluid ${styles["sign-up-image"]}`}
              width={600}
              height={600}
            />
          </div>
        </div>
        {/* Form Section */}
        <div className={styles["form-section"]}>
          {/* Logo and Title */}
          <div></div>
          <div className={styles["form-content"]}>
            <div className={styles["logo-container"]}>
              <div className={styles["logo"]}>
                <a href="/">
                  <img
                    src={"/assets/img/sampleIcon.png"}
                    className={styles["img-fluid"]}
                    alt={"logo"}
                  />
                </a>
              </div>
            </div>

            <h1 className={styles["main-title"]}>نرم افزار سامانه مودیان</h1>
          </div>

          {/* Form */}
          <div className={styles["form-container"]}>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={loginvalidationSchema}
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
                    <GenericInputField
                      label={"نام کاربری"}
                      name="username"
                      placeholder={"نام کاربری خود را وارد کنید"}
                      errors={errors}
                      touched={touched}
                    />
                    <PasswordField
                      label={"رمز عبور"}
                      name="password"
                      placeholder={"رمز عبور خود را وارد کنید"}
                      errors={allErrors}
                      touched={touched}
                    />

                    <button
                      type="submit"
                      className={styles["submit-button"]}
                      disabled={isLoading}
                    >
                      {isLoading ? "در حال ورود..." : "ورود"}
                    </button>

                    {/* Links */}
                    <div className={styles["form-links"]}>
                      <p className={styles["signup-link"]}>
                        حساب کاربری ندارید؟{" "}
                        <a
                          href={ROUTES.AUTH.SIGN_UP}
                          className={styles["signup-link-text"]}
                        >
                          ثبت نام کنید
                        </a>
                      </p>
                    </div>
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

export default LoginForm;
