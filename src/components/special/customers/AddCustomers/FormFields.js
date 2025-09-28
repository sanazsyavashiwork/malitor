"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { PhoneInputField } from "@/components/general/GenericInputField/PhoneInputField";
import { SelectField } from "@/components/general/GenericInputField/SelectField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl" style={{ marginBottom: "20px" }}>
      <div className={styles["headerCheckbox"]}>
        <CheckboxField
          name="active"
          checkboxText="آیا فعال است؟"
          errors={errors}
          touched={touched}
          color="primary"
        />
        <CheckboxField
          name="customer"
          checkboxText="آیا مشتری است؟"
          errors={errors}
          touched={touched}
          color="primary"
        />
        <CheckboxField
          name="provider"
          checkboxText="تامین کننده است؟"
          errors={errors}
          touched={touched}
          color="primary"
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"نام"}
          name="name"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <SelectField
          twoItemInOneRow={true}
          label={"نوع"}
          name={"customerType"}
          errors={errors}
          touched={touched}
          options={[
            { value: "حقیقی", label: "حقیقی" },
            { value: "حقوقی", label: "حقوقی" },
            { value: "مشارکت مدنی", label: "مشارکت مدنی" },
            { value: "اتباع غیر ایرانی", label: "اتباع غیر ایرانی" },
            { value: "مصرف کننده", label: "مصرف کننده" },
          ]}
          onChange={(e) => {}}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="identificationCode"
          label={"کد شناسایی"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"کد شناسایی"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>
                کد شناسایی عددی اختیاری و منحصر به فرد مانند کد ملی و مرتبط با
                مشتریان شما می باشد. (برای مالیات ارسال نخواهد شد.)
              </li>
              <li>
                شما می توانید کد شناسایی را تعریف کنید تا در زمان ثبت فاکتور از
                طریق اکسل، با سرعت بیشتری ثبت فاکتور کنید.
              </li>
              <li>
                می توانید کد شناسایی را کد ملی آن ها قرار دهید تا در ارسال های
                بعدی نیازمند بررسی کد شناسایی نباشید.
              </li>
              <li>در صورت عدم ثبت این کد؛ عددی تصادفی قرار خواهد گرفت.</li>
            </ul>
          }
        />
        <PhoneInputField
          label={"تلفن"}
          name="phoneNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <PhoneInputField
          label={"فاکس"}
          name="faxNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <PhoneInputField
          label={"تلفن همراه"}
          name="mobileNumber"
          phonePlaceholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="nationalId"
          label={"شناسه ملی / مدنی/اتباع"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          label={"شماره اقتصادی"}
          name="economicCode"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"شماره اقتصادی خریدار"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>
                شماره اقتصادی خریدار برای ارسال صورتحساب الکترونیکی نوع یک
                اجباری است.
              </li>
              <li>
                اگر شخص حقوقی است، شناسه ملی یازده رقمی را در این بخش قرار دهید.
              </li>
              <li>
                اگر خریدار (مشتری) حقیقی است و پرونده مالیاتی دارد توجه کنید:
              </li>
              <ul>
                <li>
                  برای اینکه صورتحساب در پرونده او قرار گیرد، کد اقتصادی اولویت
                  دارد.
                </li>
                <li>بعد از آن کد پستی مهم است.</li>
              </ul>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="registrationNumber"
          label={"شماره ثبت"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          label={"شماره گذر نامه"}
          name="passportNumber"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"شماره گذر نامه"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>
                در مورد صورتحساب‌های الکترونیکی با الگوی بلیط هواپیما برای
                پروازهای داخلی ثبت مشخصات مسافر در صورتحساب الزامی است.
              </li>
              <li>
                چنانچه مسافر شخص ایرانی و یا اتباع غیر ایرانی مقیم ایران باشد،
                ثبت شماره ملی و یا کد فراگیر اتباع غیر ایرانی الزامی است.
              </li>
              <li>
                در صورتی که مسافر اتباع غیر ایرانی غیر مقیم ایران باشد، شماره
                گذرنامه خریدار می‌بایست در صورتحساب ثبت شود.
              </li>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="email"
          label={"پست الکترونیک"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
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
            <ul style={{ listStyleType: "circle" }}>
              <li>
                کد پستی عددی 10 رقمی است که برای ارسال صورتحساب ضروری می‌باشد.
              </li>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          name="province"
          label={"استان"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          label={"شهرستان"}
          name="city"
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
      </div>
      <GenericInputField
        name="address"
        label={"آدرس"}
        placeholder={""}
        errors={errors}
        touched={touched}
        twoItemInOneRow={true}
      />
    </div>
  );
};
