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
import { useGetUserQuery } from "@/hooks/AuthenticationController/useGetUserQuery";
import { usePutUserQuery } from "@/hooks/AuthenticationController/usePutUserQuery";
import Loading from "../../loading/loading";

// تابع کمکی برای تبدیل تاریخ string به object
const parsePersianDate = (dateString) => {
  if (!dateString) {
    return {
      year: 0,
      monthPersian: "FARVARDIN",
      day: 0,
      dayOfWeekPersian: "Yekshanbeh",
      leapYear: false,
      dayOfWeek: "Yekshanbeh",
    };
  }

  // اینجا منطق پارس کردن تاریخ Persian باید اضافه شود
  // فرض کنیم dateString به فرمت "1402/12/15" باشد
  try {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return {
        year: parseInt(parts[0]) || 0,
        monthPersian: getMonthPersianName(parseInt(parts[1]) || 1),
        day: parseInt(parts[2]) || 0,
        dayOfWeekPersian: "Yekshanbeh", // این باید محاسبه شود
        leapYear: false, // این باید محاسبه شود
        dayOfWeek: "Yekshanbeh", // این باید محاسبه شود
      };
    }
  } catch (error) {
    console.error("Error parsing Persian date:", error);
  }

  return {
    year: 0,
    monthPersian: "FARVARDIN",
    day: 0,
    dayOfWeekPersian: "Yekshanbeh",
    leapYear: false,
    dayOfWeek: "Yekshanbeh",
  };
};

// تابع کمکی برای گرفتن نام ماه Persian
const getMonthPersianName = (monthNumber) => {
  const months = [
    "FARVARDIN",
    "ORDIBEHESHT",
    "KHORDAD",
    "TIR",
    "MORDAD",
    "SHAHRIVAR",
    "MEHR",
    "ABAN",
    "AZAR",
    "DEY",
    "BAHMAN",
    "ESFAND",
  ];
  return months[monthNumber - 1] || "FARVARDIN";
};

// تابع کمکی برای تبدیل object تاریخ به string (برای نمایش در فرم)
const formatPersianDateToString = (dateObj) => {
  if (!dateObj || !dateObj.year) {
    return "";
  }

  const monthNumber = getMonthNumber(dateObj.monthPersian);
  return `${dateObj.year}/${monthNumber
    .toString()
    .padStart(2, "0")}/${dateObj.day.toString().padStart(2, "0")}`;
};

const getMonthNumber = (monthPersian) => {
  const months = {
    FARVARDIN: 1,
    ORDIBEHESHT: 2,
    KHORDAD: 3,
    TIR: 4,
    MORDAD: 5,
    SHAHRIVAR: 6,
    MEHR: 7,
    ABAN: 8,
    AZAR: 9,
    DEY: 10,
    BAHMAN: 11,
    ESFAND: 12,
  };
  return months[monthPersian] || 1;
};

const EditUser = ({ id }) => {
  const { successToast, errorToast } = useToast();
  const { mutate, isPending } = usePutUserQuery({});
  const { serverErrors, clearErrors, handleError } = useErrorApiHandler();
  const { user, isLoadingUser } = useGetUserQuery({ id });

  const initialValues = {
    firstname: user?.data?.firstname ?? "",
    lastname: user?.data?.lastname ?? "",
    username: user?.data?.username ?? "",
    password: "", // رمز عبور خالی در ویرایش
    phoneNumber: user?.data?.phoneNumber ?? "",
    nationalId: user?.data?.nationalId ?? "",
    email: user?.data?.email ?? "",
    active: user?.data?.active ?? false,
    creditExpirationDate: formatPersianDateToString(
      typeof user?.data?.creditExpirationDate === "string"
        ? parsePersianDate(user?.data?.creditExpirationDate)
        : user?.data?.creditExpirationDate
    ),
  };

  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    clearErrors();

    // آماده کردن داده برای ارسال
    const submitData = {
      firstname: values.firstname,
      lastname: values.lastname,
      active: values.active,
      phoneNumber: values.phoneNumber,
      nationalId: values.nationalId,
      email: values.email,
      creditExpirationDate: parsePersianDate(values.creditExpirationDate),
    };

    // اگر رمز عبور پر شده باشد، اضافه کن
    if (values.password && values.password.trim() !== "") {
      submitData.password = values.password;
    }

    mutate(submitData, {
      onSuccess: (data) => {
        resetForm();
        successToast("کاربر با موفقیت ویرایش شد");
        window.location.href = `${ROUTES.ADMIN.USER_LIST}`;
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        handleError(error);
        errorToast("ویرایش کاربر با خطا روبرو شد");
      },
    });
  };

  if (isLoadingUser) {
    return <Loading />;
  }

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
                title={"ویرایش کاربر "}
                hasOuterURL={true}
                outerUrl={ROUTES.ADMIN.USER_LIST}
              />
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
                enableReinitialize={true} // مهم: برای بازسازی مقادیر اولیه
              >
                {({ errors, touched, isSubmitting, submitCount }) => {
                  const allErrors = {
                    ...errors,
                    ...serverErrors,
                  };

                  useEffect(() => {
                    if (submitCount > 0 && Object.keys(allErrors).length > 0) {
                      const fieldOrder = [
                        "firstname",
                        "lastname",
                        "nationalId",
                        "phoneNumber",
                        "email",
                        "username",
                        "password",
                        "creditExpirationDate",
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
                          text={" ثبت تغییرات "}
                          loadingText={"... در حال ثبت"}
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

export default EditUser;
