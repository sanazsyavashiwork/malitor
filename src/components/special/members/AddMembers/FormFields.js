"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { GenericTextAreaField } from "@/components/general/GenericInputField/GenericTextAreaField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl">
      <CheckboxField
        name="legal"
        checkboxText="حقوقی است ؟"
        errors={errors}
        touched={touched}
        color="primary"
      />
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"نام"}
          name="name"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          name="nationalId"
          label={"شناسه ملی / مدنی/اتباع"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          hasInfoIcon={true}
          title={"شناسه ملی/مدنی/اتباع"}
          content={
            <ul style={{ listStyleType: "circle", paddingRight: "20px" }}>
              <li>شناسه ملی/مدنی/اتباع مودی اجباری است.</li>
              <li>شناسه ملی حقوقی عددی 11 رقمی است.</li>
              <li>
                دقت نمایید، شناسه ملی باید 11 یا 12 یا 14 رقم باشد وگرنه ثبت
                نخواهد شد.
              </li>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"کد اقتصادی"}
          name="economicCode"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"کد اقتصادی"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle", paddingRight: "20px" }}>
              <li>
                در مودی حقوقی شماره ملی یازده رقمی را در این بخش قرار دهید
              </li>
              <li>
                اگر مودی حقیقی است در شناسه ملی و اقتصادی، هر دو کد اقتصادی را
                قرار دهید.
              </li>
            </ul>
          }
        />
        <GenericInputField
          name="registrationNumber"
          label={"شماره ثبت"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شروع سریال صورت حساب"}
          name="invoiceSerialNumberBeginning"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"شروع سریال صورت حساب"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle", paddingRight: "20px" }}>
              <li>
                این عدد شروع عدد فاکتور شما می باشد که در سازمان خود استفاده می
                کنید. با ایجاد هر صورتحساب به ترتیب و صعودی بالا می رود.
              </li>
              <li>این شماره باید 10 رقم باشد.</li>
              <li>
                اگر سریال صورتحساب ندارید؛ می توانید از 1000000001 شروع کنید.
              </li>
            </ul>
          }
        />
        <GenericInputField
          name="reactionaryInvoiceSerialNumberBeginning"
          label={"شروع سریال صورت حساب ارتجاعی"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"شروع سریال صورتحساب ارجاعی"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle", paddingRight: "20px" }}>
              <li>
                سریال داخلی صورتحساب ارجاعی عددی برای سریال فاکتورهای اصلاحی،
                ابطالی و برگشت از فروش است.
              </li>
              <li>
                این عدد باید 10 رقمی باشد. عددی غیر از سریال اصلی شما باشد.
              </li>
              <li>می توانید از 2000000001 شروع کنید.</li>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <PhoneInputField
          label={"تلفن"}
          name="phoneNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <PhoneInputField
          label={"فاکس"}
          name="faxNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"کد پستی"}
          name="postalCode"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"کد پستی"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle", paddingRight: "20px" }}>
              <li>
                کد پستی عددی 10 رقمی است که برای ارسال صورتحساب ضروری می باشد.
              </li>
            </ul>
          }
        />
        <GenericInputField
          name="province"
          label={"استان"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شهرستان"}
          name="city"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          name="address"
          label={"آدرس"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شناسه یکتا"}
          name="memoryId"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"شناسه یکتا"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>شناسه یکتا عبارت 6 رقمی است که با A شروع می‌شود.</li>
              <li>
                شما باید شناسه یکتای حافظه مالیاتی را در کارپوشه از عضویت، شناسه
                یکتا توسط مودی دریافت کنید.
              </li>
              <li>
                اگر شناسه یکتا از قبل دارید و کلید خصوصی آن را ندارید؛ لازم است
                شناسه‌ای جدید با کلیدهای جدید بگیرید.
              </li>
            </ul>
          }
        />
        <GenericTextAreaField
          name="privateKey"
          label={"کلید خصوصی"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"کلید خصوصی (PrivateKey)"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>
                فقط کلید خصوصی را اینجا ذخیره کنید. ابتدا و انتهای کلید را هم
                کپی و ذخیره کنید.
              </li>
              <li>اگر مودی شما حقوقی است تیک آن را فعال کنید.</li>
            </ul>
          }
        />
      </div>
    </div>
  );
};
