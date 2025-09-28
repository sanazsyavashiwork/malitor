"use client";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import styles from "./editProfile.module.scss";
import { useToast } from "@/hooks/useToast2";

import GeneralFormTitleShow from "@/components/general/GeneralFormTitleShow/GeneralFormTitleShow";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import { ROUTES } from "@/constValues/Routes";
import { FormFields } from "./FormFields";
import validationSchema from "./validationSchema";
import { usePostTaxPayersQuery } from "@/hooks/Tax-payers/usePostTaxPayersQuery";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import { useSearchParams } from "next/navigation";
import { useGetTaxPayersQuery } from "@/hooks/Tax-payers/useGetTaxPayersQuery";
import { useSetMemberCookie } from "@/hooks/useSetMemberCookie";
import { usePostRegisterQuery } from "@/hooks/AuthenticationController/usePostRegisterQuery";

const AddUser = () => {
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePostRegisterQuery({});
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();

  const initialValues = {
    // GenericInputField fields
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phoneNumber: "",
    nationalId: "",
    email: "",
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    clearErrors();
    mutate(values, {
      onSuccess: (data) => {
        resetForm();
        successToast("کاربر با موفقیت ثبت شد");
        window.location.href = `${ROUTES.ADMIN.USER_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ثبت کاربر با خطا روبرو شد");
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
                title={"ثبت کاربر جدید"}
                hasOuterURL={true}
                outerUrl={ROUTES.ADMIN.USER_LIST}
              />
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
                // validateOnChange={false}
                // validateOnBlur={false}
              >
                {({ errors, touched, isSubmitting, submitCount }) => {
                  const allErrors = {
                    ...errors,
                    ...serverErrors,
                  };
                  useEffect(() => {
                    if (submitCount > 0 && Object.keys(allErrors).length > 0) {
                      const fieldOrder = [
                        "name",
                        "nationalId",
                        "economicCode",
                        "registrationNumber",
                        "invoiceSerialNumberBeginning",
                        "reactionaryInvoiceSerialNumberBeginning",
                        "phoneNumber",
                        "faxNumber",
                        "postalCode",
                        "province",
                        "city",
                        "address",
                        "memoryId",
                        "privateKey",
                      ];

                      const firstErrorField = fieldOrder.find(
                        (field) => allErrors[field] && touched[field]
                      );

                      if (firstErrorField) {
                        setTimeout(() => {
                          const element = document.querySelector(
                            `[name="${firstErrorField}"]`
                          );
                          if (element) {
                            element.focus();
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }, 100);
                      }
                    }
                  }, [allErrors, touched, submitCount]);
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
};

export default AddUser;
