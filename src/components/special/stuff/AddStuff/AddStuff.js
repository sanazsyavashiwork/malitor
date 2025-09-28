"use client";
import { Form, Formik } from "formik";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import styles from "./editProfile.module.scss";
import { useToast } from "@/hooks/useToast2";

import GeneralFormTitleShow from "@/components/general/GeneralFormTitleShow/GeneralFormTitleShow";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import { ROUTES } from "@/constValues/Routes";
import { FormFields } from "./FormFields";
import validationSchema from "./validationSchema";
import { date } from "yup";
import { usePostStuffIdQuery } from "@/hooks/Stuff-ids/usePostStuffIdQuery";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";

const AddStuff = () => {
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePostStuffIdQuery({});
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();

  const initialValues = {
    // Checkbox field
    privateId: false,

    // Select field
    stuffIdType: "",

    // GenericInputField fields
    stuffId: "", // شناسه کالا/خدمت
    vatRate: "", // نرخ ارزش افزوده
    name: "", // شرح شناسه

    // GenericDatePickerField
    registrationDate: "", // تاریخ ثبت در stuffid
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    const formattedValues = {
      ...values,
      registrationDate: values.registrationDate
        ? values.registrationDate.replace(/\//g, "-")
        : "",
      vatRate: +values.vatRate,
    };
    clearErrors();
    mutate(formattedValues, {
      onSuccess: (data) => {
        resetForm();
        successToast("شناسه خدمات یا کالا  با موفقیت ثبت شد");
        window.location.href = `${ROUTES.PRIVATE.ITEMS_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ثبت شناسه خدمات یا کالا  با خطا روبرو شد");
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
                title={" شناسه کالا یا خدمات"}
                hasOuterURL={true}
                outerUrl={ROUTES.PRIVATE.ITEMS_LIST}
              />
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
              >
                {({ errors, touched, isSubmitting }) => {
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
                          loadingText={"در حال ثبت..."}
                          loading={false}
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

export default AddStuff;
