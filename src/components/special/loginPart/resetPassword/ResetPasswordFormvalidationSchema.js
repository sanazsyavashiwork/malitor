import * as Yup from 'yup';

const ResetPasswordFormvalidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('شماره موبایل الزامی است!')
    .matches(/^[0-9\u06F0-\u06F9]+$/, 'شماره موبایل باید فقط شامل اعداد باشد!')
    .test('is-valid-prefix', 'شماره موبایل باید با ۰۹ شروع شده باشد!', (value) => {
      return value && (value.startsWith('09') || value.startsWith('۰۹'));
    })
    .length(11, 'شماره موبایل باید دقیقاً ۱۱ رقم باشد!'),
});

export default ResetPasswordFormvalidationSchema;
