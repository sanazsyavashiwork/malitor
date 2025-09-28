import * as Yup from 'yup';

export const OTPvalidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('کد تایید الزامی است!')
    .matches(/^[0-9\u06F0-\u06F9]+$/, 'کد تایید باید فقط شامل اعداد باشد!')
    .length(5, 'کد تایید باید دقیقاً ۵ رقم باشد!')
    .test('no-spaces', 'کد تایید نباید شامل فاصله باشد!', (value) => {
      return value && !value.includes(' ');
    }),
});
