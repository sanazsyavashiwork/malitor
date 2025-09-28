import * as Yup from "yup";

const loginvalidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("رمز عبور قدیمی الزامی است!"),

  newPassword: Yup.string()
    .min(8, "رمز عبور جدید باید حداقل 8 کاراکتر باشد")
    .matches(/[a-zA-Z]/, "رمز عبور باید شامل حداقل یک حرف باشد")
    .matches(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "رمز عبور باید شامل حداقل یک کاراکتر خاص باشد"
    )
    .required("رمز عبور جدید الزامی است!"),

  confirmationPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "تکرار رمز عبور با رمز عبور جدید مطابقت ندارد"
    )
    .required("تکرار رمز عبور الزامی است!"),
});

export default loginvalidationSchema;
