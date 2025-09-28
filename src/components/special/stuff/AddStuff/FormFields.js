"use client";

import { CheckboxField } from "@/components/general/GenericInputField/CheckboxField";
import styles from "./fields.module.scss";

import { GenericInputField } from "@/components/general/GenericInputField/GenericInputField";
import { GenericDatePickerField } from "@/components/general/GenericInputField/DatePickerField/DatePickerField";
import { SelectField } from "@/components/general/GenericInputField/SelectField";

export const FormFields = ({ errors = {}, touched = {} }) => {
  return (
    <div dir="rtl" style={{ marginBottom: "20px" }}>
      <CheckboxField
        name="privateId"
        checkboxText="شناسه اختصاصی است ؟"
        errors={errors}
        touched={touched}
        color="primary"
      />
      <div className={styles["flex-container"]}>
        <SelectField
          twoItemInOneRow={true}
          label={"نوع"}
          name={"stuffIdType"}
          errors={errors}
          touched={touched}
          options={[
            {
              value: "شناسه عمومی تولید داخل (کالا)",
              label: "شناسه عمومی تولید داخل (کالا)",
            },
            {
              value: "شناسه عمومی وارداتی (کالا)",
              label: "شناسه عمومی وارداتی (کالا)",
            },
            { value: "شناسه عمومی (خدمت)", label: "شناسه عمومی (خدمت)" },
            {
              value: "شناسه اختصاصی تولید داخل (کالا)",
              label: "شناسه اختصاصی تولید داخل (کالا)",
            },
            {
              value: "شناسه اختصاصی وارداتی (کالا)",
              label: "شناسه اختصاصی وارداتی (کالا)",
            },
            { value: "شناسه اختصاصی(خدمت)", label: "شناسه اختصاصی(خدمت)" },
          ]}
          onChange={(e) => {}}
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شناسه کالا/خدمت"}
          name="stuffId"
          placeholder={"شناسه ۱۳ رقمی"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericInputField
          name="vatRate"
          label={"نرخ ارزش افزوده"}
          placeholder={""}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
          title={"نرخ ارزش افزوده"}
          hasInfoIcon={true}
          content={
            <ul style={{ listStyleType: "circle" }}>
              <li>
                نرخ ارزش افزوده را طبق فایل اکسلی که از سایت استاف آیدی انتخاب
                کرده‌اید، قرار دهید.
              </li>
            </ul>
          }
        />
      </div>
      <div className={styles["flex-container"]}>
        <GenericInputField
          label={"شرح شناسه"}
          name="name"
          placeholder={"شرح شناسه مطابق با سایت stuffid"}
          errors={errors}
          touched={touched}
          twoItemInOneRow={true}
        />
        <GenericDatePickerField
          name="registrationDate"
          label={"تاریخ ثبت در stuffid"}
          placeholder="تاریخ را انتخاب کنید"
          showTodayButton={true}
          showClearButton={true}
          twoItemInOneRow={true}
        />
      </div>
    </div>
  );
};
