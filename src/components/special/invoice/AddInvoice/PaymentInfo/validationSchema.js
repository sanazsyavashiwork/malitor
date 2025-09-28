import * as Yup from "yup";

const paymentValidationSchema = Yup.object().shape({
  // روش تسویه
  settlementMethod: Yup.string().required("روش تسویه الزامی است!"),

  // موضوع مالیات بند 17
  seventeenthTaxQoute: Yup.number()
    .typeError("موضوع مالیات باید عدد باشد!")
    .min(0, "موضوع مالیات نمی‌تواند منفی باشد!")
    .max(100, "موضوع مالیات نمی‌تواند بیشتر از ۱۰۰ درصد باشد!"),

  // شماره سوییچ پرداخت
  paymentSwitchNumber: Yup.string()
    .matches(/^[0-9]*$/, "شماره سوییچ پرداخت باید فقط شامل اعداد باشد!")
    .min(6, "شماره سوییچ پرداخت باید حداقل ۶ رقم باشد!")
    .max(20, "شماره سوییچ پرداخت نمی‌تواند بیشتر از ۲۰ رقم باشد!"),

  // روش پرداخت
  paymentMethod: Yup.string().required("روش پرداخت الزامی است!"),

  // تاریخ پرداخت
  paymentDate: Yup.string().required("تاریخ پرداخت الزامی است!"),

  // شماره پیگیری / شماره مرجع
  referenceNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "شماره مرجع فقط شامل حروف و اعداد انگلیسی باشد!")
    .min(6, "شماره مرجع باید حداقل ۶ کاراکتر باشد!")
    .max(50, "شماره مرجع نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!"),
});

export default paymentValidationSchema;
