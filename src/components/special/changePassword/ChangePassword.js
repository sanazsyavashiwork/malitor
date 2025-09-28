import React, { useState } from "react";
// import styles from "./login-styles.module.scss";
import { ArrowRight, Smartphone } from "lucide-react";
import { Form, Formik } from "formik";
import loginvalidationSchema from "./loginvalidationSchema";
import { Toast } from "react-bootstrap";

import { PasswordField } from "@/components/general/GenericInputField/PasswordField";
import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { usePostAuthenticateQuery } from "@/hooks/AuthenticationController/usePostAuthenticateQuery ";
import { useSuccessAuth } from "@/hooks/useSuccessAuth";
import { useSetRole } from "@/hooks/useSetRole";
import { useToast } from "@/hooks/useToast2";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import { ROLE_KEYS } from "@/constValues/roles";
import { usePatchChangePasswordQuery } from "@/hooks/AuthenticationController/usePatchChangePasswordQuery";
import { ROUTES } from "@/constValues/Routes";
import { Card, CardBody, Col, Row } from "reactstrap";
import GeneralFormTitleShow from "@/components/general/GeneralFormTitleShow/GeneralFormTitleShow";
import styles from "./editProfile.module.scss";
import { FormFields } from "./FormFields";
import GButton from "@/components/general/GeneralButton/GeneralButton";

const ChangePassword = () => {
  const { successToast, errorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending } = usePatchChangePasswordQuery({});

  const { handleError } = useErrorApiHandler();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  };

  const handleSubmit = (data, { resetForm }) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (data) => {
        resetForm();
        setIsLoading(false);
        successToast("رمز عبور با موفقیت تغییر کرد");
        const { access_token, refresh_token, role } = data.data;
      },
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        handleError(error);
        errorToast("تغییر رمز عبور با خطا روبرو شد");
      },
    });
  };

  return (
    <div className={styles["authentication-box-edit"]}>
      <Row
        className=" align-items-center justify-content-center g-0"
        style={{ width: "100%" }}
      >
        <Col
          xl="12"
          lg="12"
          md="12"
          sm="12"
          xs="12"
          className=" order-lg-1 order-2 d-flex align-items-center"
        >
          <Card className={`card ${styles["width-full"]}`}>
            <CardBody className="card-body p-4 p-md-5">
              <GeneralFormTitleShow
                title={"تغییر رمز عبور"}
                hasOuterURL={true}
                outerUrl={ROUTES.PRIVATE.MOVADIAN_LIST}
              />
              <Formik
                initialValues={initialValues}
                validationSchema={loginvalidationSchema}
                onSubmit={handleSubmit}
                // validateOnChange={false}
                // validateOnBlur={false}
              >
                {({ errors, touched, isSubmitting, submitCount }) => {
                  const allErrors = {
                    ...errors,
                  };
                  return (
                    <Form>
                      <FormFields errors={allErrors} touched={touched} />

                      <div className={styles["flex-end-button"]}>
                        <GButton
                          type="primary"
                          variant="filled"
                          text={"ثبت"}
                          loadingText={"...در حال ثبت"}
                          loading={isPending}
                          disabled={isSubmitting}
                          htmlType="submit"
                          size="medium"
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
  // return (
  //   <div className={styles["authentication-box-edit"]}>
  //     <Row
  //       className=" align-items-center justify-content-center g-0"
  //       style={{ width: "100%" }}
  //     >
  //       <Col
  //         xl="12"
  //         lg="12"
  //         md="12"
  //         sm="12"
  //         xs="12"
  //         className=" order-lg-1 order-2 d-flex align-items-center"
  //       >
  //         <Card className={`card `} style={{ width: "100%" }}>
  //           <CardBody className="card-body p-4 p-md-5">
  //             <GeneralFormTitleShow
  //               title={"تغییر رمز عبور"}
  //               hasOuterURL={true}
  //               outerUrl={ROUTES.PRIVATE.DASHBOARD}
  //             />
  //             <Formik
  //               initialValues={initialValues}
  //               enableReinitialize={true}
  //               validationSchema={loginvalidationSchema}
  //               onSubmit={handleSubmit}
  //               validate={(values) => {
  //                 return {};
  //               }}
  //             >
  //               {({ errors, touched }) => {
  //                 const allErrors = {
  //                   ...errors,
  //                 };
  //                 return (
  //                   <Form>
  //                     <div dir="rtl" style={{ width: "100%" }}>
  //                       <PasswordField
  //                         label={"رمز قدیمی"}
  //                         name="currentPassword"
  //                         placeholder={""}
  //                         errors={allErrors}
  //                         touched={touched}
  //                         twoItemInOneRow={true}
  //                       />
  //                       <div className={styles["flex-container"]}>
  //                         <PasswordField
  //                           label={"رمز جدید"}
  //                           name="newPassword"
  //                           placeholder={""}
  //                           errors={allErrors}
  //                           touched={touched}
  //                           twoItemInOneRow={true}
  //                         />
  //                         <PasswordField
  //                           label={"تکرار رمز جدید"}
  //                           name="confirmationPassword"
  //                           placeholder={""}
  //                           errors={allErrors}
  //                           touched={touched}
  //                           twoItemInOneRow={true}
  //                         />
  //                       </div>
  //                       <button
  //                         type="submit"
  //                         className={styles["submit-button-form-login-login"]}
  //                       >
  //                         {isLoading ? "در حال تغییر رمز" : "تغییر رمز"}
  //                       </button>
  //                     </div>
  //                   </Form>
  //                 );
  //               }}
  //             </Formik>
  //           </CardBody>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </div>
  // );
};

export default ChangePassword;
