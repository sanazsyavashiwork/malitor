import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // Checkbox field - اختیاری است
  privateId: Yup.bool(),

  // Select field
  // stuffIdType: Yup.string().required("نوع شناسه الزامی است!"),
  // .oneOf(
  //   [
  //     "شناسه عمومی تولید داخل (کالا)",
  //     "شناسه عمومی وارداتی (کالا)",
  //     "شناسه عمومی (خدمت)",
  //     "شناسه اختصاصی تولید داخل (کالا)",
  //     "شناسه اختصاصی وارداتی (کالا)",
  //     "شناسه اختصاصی(خدمت)",
  //   ],
  //   "نوع انتخاب شده معتبر نیست!"
  // ),

  // GenericInputField fields
  stuffId: Yup.string()
    .required("شناسه کالا/خدمت الزامی است!")
    .length(13, "شناسه کالا/خدمت باید دقیقاً ۱۳ رقم باشد!")
    .matches(/^[0-9]+$/, "شناسه کالا/خدمت باید فقط شامل اعداد باشد!"),

  vatRate: Yup.string()
    .required("نرخ ارزش افزوده الزامی است!")
    .matches(/^\d+(\.\d+)?$/, "نرخ ارزش افزوده باید عدد معتبر باشد!")
    .test(
      "is-valid-rate",
      "نرخ ارزش افزوده باید بین ۰ تا ۱۰۰ باشد!",
      (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= 100;
      }
    ),

  name: Yup.string()
    .required("شرح شناسه الزامی است!")
    .min(10, "شرح شناسه باید حداقل ۱۰ کاراکتر باشد!")
    .max(200, "شرح شناسه نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد!"),

  // GenericDatePickerField
  registrationDate: Yup.string()
    .required("تاریخ ثبت در stuffid الزامی است!")
    .test("is-valid-date", "تاریخ وارد شده معتبر نیست!", (value) => {
      if (!value) return false;
      // اینجا می‌توانید validation بیشتری برای فرمت تاریخ اضافه کنید
      return true;
    }),
});

export default validationSchema;
