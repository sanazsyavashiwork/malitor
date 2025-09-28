import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // GenericInputField fields
  firstname: Yup.string()
    .required("نام الزامی است!")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),
  lastname: Yup.string()
    .required("نام خانوادگی الزامی است!")
    .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد!")
    .max(50, "ام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),

  nationalId: Yup.string()
    .required("کد شخصی الزامی است!")
    .length(10, "کد شخصی باید ۱۰ رقم باشد!")
    .matches(/^[0-9]+$/, "کد شخصی باید فقط شامل اعداد باشد!"),

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

  registrationDate: Yup.string().required("تاریخ پرداخت الزامی است!"),
  email: Yup.string()
    .required("ایمیل الزامی است!")
    .email("فرمت ایمیل نامعتبر است!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "فرمت ایمیل صحیح نیست!"
    ),
});

export default validationSchema;
