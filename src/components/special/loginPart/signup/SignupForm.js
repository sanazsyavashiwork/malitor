import React, { useState } from "react";
import styles from "./login-styles.module.scss";
import { ArrowRight } from "lucide-react";
import { Form, Formik } from "formik";
import loginvalidationSchema from "./loginvalidationSchema";

import { PasswordField } from "@/components/general/GenericInputField/PasswordField";
import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { useSuccessAuth } from "@/hooks/useSuccessAuth";
import { useSetRole } from "@/hooks/useSetRole";
import { useToast } from "@/hooks/useToast2";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import { ROLE_KEYS } from "@/constValues/roles";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { usePostRegisterQuery } from "@/hooks/AuthenticationController/usePostRegisterQuery";
import Image from "next/image";
import { ROUTES } from "@/constValues/Routes";

const SignupForm = () => {
  const { successToast, errorToast } = useToast();

  const { setTokens } = useSuccessAuth();

  const { setRole } = useSetRole();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending } = usePostRegisterQuery({});

  const { handleError } = useErrorApiHandler();

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phoneNumber: "",
    nationalId: "",
    email: "",
  };

  const handleSubmit = (data, { resetForm }) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (data) => {
        resetForm();
        setIsLoading(false);
        successToast("کاربر با موفقیت ثبت شد ");
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
        errorToast("ثبت کاربر با خطا روبرو شد ");
      },
    });
  };

  return (
    <div className={styles["authentication-container"]}>
      <div className={styles["authentication-wrapper"]}>
        {/* Image Section */}
        <div className={styles["image-section"]}>
          <div className={styles["image-content"]}>
            <Image
              src={`/assets/images/inner-pages/4.svg`}
              alt="Authentication illustration"
              className={`img-fluid ${styles["sign-up-image"]}`}
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className={styles["form-section"]}>
          {/* Logo */}
          <div className={styles["login-content"]}>
            <div className={styles["logo-container"]}>
              <div className={styles["logo"]}>
                <a href="/">
                  <img
                    src={"/assets/img/sampleIcon.png"}
                    className={styles["img-fluid"]}
                    style={{ width: "100px" }}
                    alt={"logo"}
                  />
                </a>
              </div>
            </div>

            <h1 className={styles["main-title"]}>نرم افزار سامانه مودیان</h1>
          </div>

          {/* Form */}
          <div className={styles["form-container-login-form"]}>
            <div className={styles["input-wrapper"]}>
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
                      <div className={styles["flex-container"]}>
                        <GenericInputField
                          label={"نام "}
                          name="firstname"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                        <GenericInputField
                          label={"نام خانوادگی"}
                          name="lastname"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                        }}
                      >
                        <GenericInputField
                          label={"کد ملی"}
                          name="nationalId"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                      </div>
                      <div className={styles["flex-container"]}>
                        <PhoneInputField
                          label={"شماره موبایل"}
                          name="phoneNumber"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                        <GenericInputField
                          label={"پست الکترونیک"}
                          name="email"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          type="email"
                          twoItemInOneRow={true}
                        />
                      </div>
                      <div className={styles["flex-container"]}>
                        <GenericInputField
                          label={"نام کاربری"}
                          name="username"
                          placeholder={""}
                          errors={errors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                        <PasswordField
                          label={"رمز عبور"}
                          name="password"
                          placeholder={""}
                          errors={allErrors}
                          touched={touched}
                          twoItemInOneRow={true}
                        />
                      </div>
                      <button
                        type="submit"
                        className={styles["submit-button-form-login-login"]}
                      >
                        {isLoading ? "در حال ثبت نام" : "ثبت نام"}
                      </button>
                      <div className={styles["form-links"]}>
                        <p className={styles["signup-link"]}>
                          حساب کاربری دارید؟{" "}
                          <a
                            href={ROUTES.AUTH.SIGN_IN}
                            className={styles["signup-link-text"]}
                          >
                            وارد شوید
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
    </div>
  );
};

export default SignupForm;
