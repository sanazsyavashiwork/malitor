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
import { useErrorApiHandler } from "@/hooks/useErrorApiHandler";
import Loading from "../../loading/loading";

import { usePutUserQuery } from "@/hooks/AuthenticationController/usePutUserQuery";
import { useGetMyProfileQuery } from "@/hooks/AuthenticationController/useGetMyProfileQuery";
import { usePutMyProfileQuery } from "@/hooks/AuthenticationController/usePutMyProfileQuery";

const MyProfile = () => {
  const { myProfile, isLoadingMyProfile } = useGetMyProfileQuery();
  const { successToast, errorToast } = useToast();
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();
  const { mutate } = usePutMyProfileQuery();
  const initialValues = {
    active: myProfile?.data?.active ?? false,
    firstname: myProfile?.data?.firstname ?? "",
    lastname: myProfile?.data?.lastname ?? "",
    phoneNumber: myProfile?.data?.phoneNumber ?? "",
    email: myProfile?.data?.email ?? "",
    nationalId: myProfile?.data?.nationalId ?? "",
    registrationDate: myProfile?.data?.registrationDate ?? "",
    creditExpirationDate: myProfile?.data?.creditExpirationDate ?? "",
  };
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    try {
      const {
        active,
        registrationDate,
        creditExpirationDate,
        ...dataToSubmit
      } = values;

      clearErrors();
      mutate(dataToSubmit, {
        onSuccess: (data) => {
          successToast("ویرایش اطلاعات کاربری موفقیت آمیز بود");
          window.location.href = ROUTES.PRIVATE.DASHBOARD;
        },
        onSettled: () => {
          console.log("Invoice submission settled");
        },
        onError: (error) => {
          console.error("Invoice submission error:", error);
          errorToast("ویرایش اطلاعات کاربری با خطا روبرو شد");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      errorToast("خطای غیرمنتظره در ویرایش اطلاعات کاربری");
    }
  };

  if (isLoadingMyProfile) {
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
                  title={"ویرایش اطلاعات کاربری"}
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
                            // loading={isPending}
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

export default MyProfile;
