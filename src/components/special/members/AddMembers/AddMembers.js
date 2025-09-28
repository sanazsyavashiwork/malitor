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

const AddMembers = () => {
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePostTaxPayersQuery({});
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();
  const searchParams = useSearchParams();
  const shouldAddMovadian = searchParams.get("shoudAddMovadian");
  const { taxPayerList, isLoadingTaxPayerList, refetch } = useGetTaxPayersQuery(
    {}
  );
  const { setMemberLength } = useSetMemberCookie();

  const initialValues = {
    // Checkbox field
    legal: false,

    // GenericInputField fields
    name: "",
    nationalId: "",
    economicCode: "",
    registrationNumber: "",
    invoiceSerialNumberBeginning: "1",
    reactionaryInvoiceSerialNumberBeginning: "2",
    phoneNumber: "",
    faxNumber: "",
    postalCode: "",
    province: "",
    city: "",
    address: "",
    memoryId: "",
    privateKey: "",
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    const formetedValue = {
      ...values,
      invoiceSerialNumberBeginning: +values.invoiceSerialNumberBeginning,
      reactionaryInvoiceSerialNumberBeginning:
        +values.reactionaryInvoiceSerialNumberBeginning,
    };
    clearErrors();
    mutate(formetedValue, {
      onSuccess: (data) => {
        resetForm();
        successToast("مودی با موفقیت ثبت شد");
        setMemberLength(taxPayerList?.data?.length);
        window.location.href = `${ROUTES.PRIVATE.MOVADIAN_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ثبت مودی با خطا روبرو شد");
      },
    });
  };

  useEffect(() => {
    if (shouldAddMovadian) {
      errorToast("در ابتدا باید مودی را ثبت کنید ");
    }
  }, []);
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
                title={"ثبت مودی"}
                hasOuterURL={true}
                outerUrl={ROUTES.PRIVATE.MOVADIAN_LIST}
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

export default AddMembers;
