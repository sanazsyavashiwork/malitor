"use client";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import styles from "./editProfile.module.scss";
import { useToast } from "@/hooks/useToast2";

import GButton from "@/components/general/GeneralButton/GeneralButton";
import { FormFields } from "./FormFields";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";
import { useSetMemberCookie } from "@/hooks/useSetMemberCookie";
import { useGetTaxPayersQuery } from "@/hooks/Tax-payers/useGetTaxPayersQuery";

const ChangeMember = () => {
  const { getMemberId, getMemberLength } = useGetMemberCookie();
  const { setMemberId } = useSetMemberCookie();
  const { successToast } = useToast();
  const { taxPayerList, isLoadingTaxPayerList, refetch } = useGetTaxPayersQuery(
    {}
  );
  // state برای مقدار اولیه که reactive باشه
  const [initialValues, setInitialValues] = useState({
    selectedMember: "",
  });

  useEffect(() => {
    if (!taxPayerList?.data?.length) return;

    // اول چک کن آیا آیدی از کوکی موجوده
    const cookieMemberId = getMemberId();

    let currentMemberId = "";

    if (cookieMemberId) {
      // چک کن این آیدی توی لیست موجوده یا ن
      currentMemberId = cookieMemberId;
    } else {
      currentMemberId = taxPayerList.data[0].id;
    }

    setMemberId(currentMemberId);
    setInitialValues({
      selectedMember: currentMemberId,
    });
  }, [taxPayerList?.data?.length, getMemberId()]);
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    console.log({ values });
    setMemberId(values.selectedMember);

    // بعد از set کردن، initialValues رو هم به‌روز کن
    setInitialValues({
      selectedMember: values.selectedMember,
    });

    successToast("مودی با موفقیت انتخاب شد ");
    setSubmitting(false);
  };

  return (
    <div className={styles["authentication-box-edit"]}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        enableReinitialize={true} // این باعث میشه وقتی initialValues تغییر کرد فرم reset بشه
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
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  htmlType="submit"
                  size="medium"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangeMember;
