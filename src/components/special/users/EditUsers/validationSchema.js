import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // GenericInputField fields
  firstname: Yup.string()
    .required("نام الزامی است!")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),

  lastname: Yup.string()
    .required("نام الزامی است!")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),

  username: Yup.string()
    .required("نام الزامی است!")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),

  password: Yup.string().required("رمز عبور الزامی است!"),
  email: Yup.string()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل الزامی است"),
});

export default validationSchema;
