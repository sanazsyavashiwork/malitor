import * as Yup from 'yup';

const PasswordFormvalidationSchema = Yup.object().shape({
  password: Yup.string().required('رمز عبور الزامی است!'),
});

export default PasswordFormvalidationSchema;
