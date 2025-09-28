import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // اطلاعات اصلی صورتحساب
  date: Yup.string().required("تاریخ صورتحساب الزامی است!"),

  subject: Yup.string().required("موضوع صورتحساب الزامی است!"),

  internalSerial: Yup.string()
    .required("سریال داخلی صورتحساب الزامی است!")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "سریال داخلی فقط شامل حروف و اعداد انگلیسی باشد!"
    ),

  customer: Yup.string().required("انتخاب مشتری الزامی است!"),

  type: Yup.string().required("نوع صورتحساب الزامی است!"),

  pattern: Yup.string().required("الگوی صورتحساب الزامی است!"),

  // اطلاعات مشتری
  customerType: Yup.string().required("نوع شخص خریدار الزامی است!"),

  customerNationalId: Yup.string()
    .required("کد ملی خریدار الزامی است!")
    .matches(/^[0-9]{10,11}$/, "کد ملی باید 10 یا 11 رقم باشد!"),

  customerEconomicCode: Yup.string()
    .required("شناسه اقتصادی خریدار الزامی است!")
    .matches(/^[0-9]{12}$/, "شناسه اقتصادی باید دقیقاً ۱۲ رقم باشد!"),

  // اطلاعات کالا و خدمات (اختیاری)
  // stuffId: Yup.string().matches(
  //   /^[0-9]*$/,
  //   "شناسه کالا باید فقط شامل اعداد باشد!"
  // ),

  description: Yup.string().max(
    500,
    "شرح کالا نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد!"
  ),

  unit: Yup.string(),

  vatRate: Yup.number()
    .min(0, "نرخ مالیات نمی‌تواند منفی باشد!")
    .max(100, "نرخ مالیات نمی‌تواند بیشتر از ۱۰۰ درصد باشد!"),

  quantity: Yup.number().min(0, "مقدار/تعداد نمی‌تواند منفی باشد!"),

  unitPrice: Yup.number().min(0, "فی نمی‌تواند منفی باشد!"),

  unitDiscount: Yup.number().min(0, "مبلغ تخفیف نمی‌تواند منفی باشد!"),

  // اطلاعات پرداخت
  settlementMethod: Yup.string(),

  seventeenthTaxQoute: Yup.number()
    .min(0, "نرخ مالیات نمی‌تواند منفی باشد!")
    .max(100, "نرخ مالیات نمی‌تواند بیشتر از ۱۰۰ درصد باشد!"),

  paymentSwitchNumber: Yup.string().matches(
    /^[0-9]*$/,
    "شماره سوئیچ پرداخت باید فقط شامل اعداد باشد!"
  ),

  paymentDate: Yup.string(),

  paymentMethod: Yup.string(),

  referenceNumber: Yup.string().matches(
    /^[a-zA-Z0-9]*$/,
    "شماره مرجع فقط شامل حروف و اعداد انگلیسی باشد!"
  ),
});

export default validationSchema;
