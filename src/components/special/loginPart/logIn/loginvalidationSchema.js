import * as Yup from "yup";

const loginvalidationSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است!"),
  password: Yup.string().required("رمز عبور الزامی است!"),
});

export default loginvalidationSchema;
