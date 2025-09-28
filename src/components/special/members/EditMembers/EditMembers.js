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
import { useGetTaxPayerQuery } from "@/hooks/Tax-payers/useGetTaxPayerQuery";
import { usePutTaxPayersQuery } from "@/hooks/Tax-payers/usePutTaxPayersQuery";
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import Loading from "../../loading/loading";

const EditMembers = ({ id }) => {
  const { taxPayer, isLoadingTaxPayer } = useGetTaxPayerQuery({ id });
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePutTaxPayersQuery({ id });
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();
  console.log({ taxPayer });
  const initialValues = {
    // Checkbox field
    legal: taxPayer?.data?.legal ?? false,

    // GenericInputField fields
    name: taxPayer?.data?.name ?? "",
    nationalId: taxPayer?.data?.nationalId ?? "",
    economicCode: taxPayer?.data?.economicCode ?? "",
    registrationNumber: taxPayer?.data?.registrationNumber ?? "",
    invoiceSerialNumberBeginning:
      taxPayer?.data?.invoiceSerialNumberBeginning ?? "1",
    reactionaryInvoiceSerialNumberBeginning:
      taxPayer?.data?.reactionaryInvoiceSerialNumberBeginning ?? "2",
    phoneNumber: taxPayer?.data?.phoneNumber ?? "",
    faxNumber: taxPayer?.data?.faxNumber ?? "",
    postalCode: taxPayer?.data?.postalCode ?? "",
    province: taxPayer?.data?.province ?? "",
    city: taxPayer?.data?.city ?? "",
    address: taxPayer?.data?.address ?? "",
    memoryId: taxPayer?.data?.memoryId ?? "",
    privateKey: taxPayer?.data?.privateKey ?? "",
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    clearErrors();
    mutate(values, {
      onSuccess: (data) => {
        resetForm();
        successToast("مودی با موفقیت ویرایش شد");
        window.location.href = `${ROUTES.PRIVATE.MOVADIAN_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ویرایش مودی با خطا روبرو شد");
      },
    });
  };
  if (isLoadingTaxPayer) {
    return <Loading />;
  } else {
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
                  title={"ویرایش مودی"}
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
                            text={"به روز رسانی"}
                            loadingText={"...در حال به روز رسانی"}
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
  }
};

export default EditMembers;
