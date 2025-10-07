import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // GenericInputField fields
  name: Yup.string()
    .required("نام الزامی است!")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),

  nationalId: Yup.string()
    .required("کد شخصی الزامی است!")
    .matches(/^[0-9]+$/, "کد شخصی باید فقط شامل اعداد باشد!"),

  economicCode: Yup.string()
    .required("کد اقتصادی الزامی است!")
    .length(12, "کد اقتصادی باید ۱۲ رقم باشد!")
    .matches(/^[0-9]+$/, "کد اقتصادی باید فقط شامل اعداد باشد!"),

  registrationNumber: Yup.string()
    .required("شماره ثبت الزامی است!")
    .length(10, "شماره ثبت باید دقیقاً ۱۰ رقم باشد!")
    .matches(/^[0-9]+$/, "شماره ثبت باید فقط شامل اعداد باشد!"),

  invoiceSerialNumberBeginning: Yup.string()
    .required("سریال فاکتور الزامی است!")
    .matches(/^[0-9]+$/, "سریال فاکتور باید فقط شامل اعداد باشد!"),

  // PhoneInputField fields
  phoneNumber: Yup.string()
    .required("شماره موبایل الزامی است!")
    .matches(/^[0-9\u06F0-\u06F9]+$/, "شماره موبایل باید فقط شامل اعداد باشد!")
    .test(
      "is-valid-prefix",
      "شماره موبایل باید با ۰۹ شروع شده باشد!",
      (value) => {
        return value && (value.startsWith("09") || value.startsWith("۰۹"));
      }
    )
    .length(11, "شماره موبایل باید دقیقاً ۱۱ رقم باشد!"),

  faxNumber: Yup.string()
    .required("شماره فکس الزامی است!")
    .matches(/^[0-9]+$/, "شماره فکس باید فقط شامل اعداد باشد!")
    .length(11, "شماره فکس باید دقیقاً ۱۱ رقم باشد!"),

  postalCode: Yup.string()
    .matches(/^[0-9]{10}$/, "کد پستی باید 10 رقم باشد")
    .required("استان الزامی است"),

  province: Yup.string().required("استان الزامی است"),

  city: Yup.string().required("شهرستان الزامی است"),

  address: Yup.string()
    .required("آدرس الزامی است")
    .min(10, "آدرس باید حداقل 10 کاراکتر باشد"),

  memoryId: Yup.string()
    .required("شناسه یکتا الزامی است")
    .matches(
      /^a.{5}$/,
      "شناسه یکتا باید با 'a' شروع شده و دقیقاً ۶ کاراکتر باشد"
    ),
  privateKey: Yup.string()
    .required("کلید خصوصی الزامی است")
    .min(20, "کلید خصوصی باید حداقل 20 کاراکتر باشد"),
});

export default validationSchema;
