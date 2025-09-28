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
import { usePostCustomerQuery } from "@/hooks/Customers/usePostCustomerQuery";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

const AddCustomer = () => {
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePostCustomerQuery({});
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();

  const initialValues = {
    // Checkbox fields
    active: false,
    customer: false,
    provider: false,
    customerType: "",

    // Text fields
    name: "",
    identificationCode: "",
    phoneNumber: "",
    faxNumber: "",
    mobileNumber: "",
    nationalId: "",
    economicCode: "",
    registrationNumber: "",
    passportNumber: "",
    email: "",
    postalCode: "",
    province: "",
    city: "",
    address: "",
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    clearErrors();
    mutate(values, {
      onSuccess: (data) => {
        resetForm();
        successToast("مشتری با موفقیت ثبت شد");
        window.location.href = `${ROUTES.PRIVATE.CUSTOMERS_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ثبت مشتری با خطا روبرو شد");
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
                title={"ثبت مشتری"}
                hasOuterURL={true}
                outerUrl={ROUTES.PRIVATE.CUSTOMERS_LIST}
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
                  };
                  useEffect(() => {
                    if (submitCount > 0 && Object.keys(allErrors).length > 0) {
                      const fieldOrder = [
                        "active", // چک‌باکس اول
                        "customer", // چک‌باکس دوم
                        "provider", // چک‌باکس سوم
                        "name", // نام
                        "customerType", // نوع (سلکت)
                        "identificationCode", // کد شناسایی
                        "phoneNumber", // تلفن
                        "faxNumber", // فاکس
                        "mobileNumber", // تلفن همراه
                        "nationalId", // شناسه ملی
                        "economicCode", // شماره اقتصادی
                        "registrationNumber", // شماره ثبت
                        "passportNumber", // شماره گذرنامه
                        "email", // پست الکترونیک
                        "postalCode", // کد پستی
                        "province", // استان
                        "city", // شهرستان
                        "address", // آدرس
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
                          loadingText={"در حال ثبت..."}
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

export default AddCustomer;
