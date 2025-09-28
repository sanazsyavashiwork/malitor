import * as Yup from "yup";

const validationSchema = Yup.object()
  .shape({
    // Checkbox fields
    active: Yup.bool(),
    customer: Yup.bool(),
    provider: Yup.bool(),

    // Customer type field
    customerType: Yup.string().required("نوع مشتری الزامی است!"),

    // Basic information fields
    name: Yup.string()
      .required("نام الزامی است!")
      .min(3, "نام باید حداقل ۳ کاراکتر باشد!")
      .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد!")
      .matches(/^[a-zA-Zآ-ی\s]+$/, "نام باید فقط شامل حروف باشد!"),

    identificationCode: Yup.string()
      .required("کد شناسایی الزامی است!")
      .min(5, "کد شناسایی باید حداقل ۵ کاراکتر باشد!")
      .max(20, "کد شناسایی نمی‌تواند بیشتر از ۲۰ کاراکتر باشد!")
      .matches(
        /^[a-zA-Z0-9\u06F0-\u06F9]+$/,
        "کد شناسایی باید شامل حروف و اعداد باشد!"
      ),

    // Phone number (landline)
    phoneNumber: Yup.string()
      .required("شماره تلفن الزامی است!")
      .matches(/^[0-9\u06F0-\u06F9]+$/, "شماره تلفن باید فقط شامل اعداد باشد!")
      .test(
        "is-valid-phone",
        "شماره تلفن نامعتبر است! (مثال: ۰۲۱۱۲۳۴۵۶۷۸)",
        (value) => {
          if (!value) return false;
          const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
          );
          // Landline phone validation (area code + number)
          return (
            normalizedValue.length >= 8 &&
            normalizedValue.length <= 11 &&
            normalizedValue.startsWith("0")
          );
        }
      ),

    // Fax number
    faxNumber: Yup.string()
      .matches(/^[0-9\u06F0-\u06F9]*$/, "شماره فکس باید فقط شامل اعداد باشد!")
      .test("is-valid-fax", "شماره فکس نامعتبر است!", (value) => {
        if (!value) return true; // Optional field
        const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
          String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
        );
        return normalizedValue.length >= 8 && normalizedValue.length <= 11;
      }),

    // Mobile number
    mobileNumber: Yup.string()
      .required("شماره موبایل الزامی است!")
      .matches(
        /^[0-9\u06F0-\u06F9]+$/,
        "شماره موبایل باید فقط شامل اعداد باشد!"
      )
      .test(
        "is-valid-mobile",
        "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد!",
        (value) => {
          if (!value) return false;
          const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
          );
          return (
            normalizedValue.length === 11 && normalizedValue.startsWith("09")
          );
        }
      ),

    // National ID validation
    nationalId: Yup.string()
      .required("شناسه ملی الزامی است!")
      .matches(/^[0-9\u06F0-\u06F9]+$/, "شناسه ملی باید فقط شامل اعداد باشد!")
      .test(
        "is-valid-length",
        "شناسه ملی باید ۱۰ رقم یا شماره گذرنامه معتبر باشد!",
        (value) => {
          if (!value) return false;
          // Persian numbers to English
          const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
          );
          // National ID (10 digits) or passport number validation
          return (
            normalizedValue.length === 10 ||
            (normalizedValue.length >= 6 && normalizedValue.length <= 15)
          );
        }
      )
      .test("is-valid-national-id", "شناسه ملی نامعتبر است!", (value) => {
        if (!value) return false;
        // Persian numbers to English
        const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
          String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
        );

        // If it's not 10 digits, consider it as passport (skip national ID validation)
        if (normalizedValue.length !== 10) return true;

        // National ID validation algorithm
        const digits = normalizedValue.split("").map(Number);
        const checkSum = digits[9];
        let sum = 0;

        for (let i = 0; i < 9; i++) {
          sum += digits[i] * (10 - i);
        }

        const remainder = sum % 11;
        return (
          (remainder < 2 && checkSum === remainder) ||
          (remainder >= 2 && checkSum === 11 - remainder)
        );
      }),

    // Economic code
    economicCode: Yup.string()
      .required("کد اقتصادی الزامی است!")
      .matches(/^[0-9\u06F0-\u06F9]+$/, "کد اقتصادی باید فقط شامل اعداد باشد!")
      .test("is-valid-length", "کد اقتصادی باید ۱۲ رقم باشد!", (value) => {
        if (!value) return false;
        const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
          String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
        );
        return normalizedValue.length === 12;
      }),

    // Registration number
    registrationNumber: Yup.string()
      .required("شماره ثبت الزامی است!")
      .matches(/^[0-9\u06F0-\u06F9]+$/, "شماره ثبت باید فقط شامل اعداد باشد!")
      .test(
        "is-valid-length",
        "شماره ثبت باید حداقل ۵ و حداکثر ۱۵ رقم باشد!",
        (value) => {
          if (!value) return false;
          const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
          );
          return normalizedValue.length >= 5 && normalizedValue.length <= 15;
        }
      ),

    // Passport number
    passportNumber: Yup.string()
      .matches(
        /^[a-zA-Z0-9\u06F0-\u06F9]+$/,
        "شماره گذرنامه باید شامل حروف و اعداد باشد!"
      )
      .min(6, "شماره گذرنامه باید حداقل ۶ کاراکتر باشد!")
      .max(15, "شماره گذرنامه نمی‌تواند بیشتر از ۱۵ کاراکتر باشد!"),

    // Email validation
    email: Yup.string()
      .email("فرمت ایمیل نامعتبر است!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "فرمت ایمیل صحیح نیست!"
      ),

    // Postal code
    postalCode: Yup.string()
      .required("کد پستی الزامی است!")
      .matches(/^[0-9\u06F0-\u06F9]+$/, "کد پستی باید فقط شامل اعداد باشد!")
      .test("is-valid-postal", "کد پستی باید ۱۰ رقم باشد!", (value) => {
        if (!value) return false;
        const normalizedValue = value.replace(/[\u06F0-\u06F9]/g, (d) =>
          String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
        );
        return normalizedValue.length === 10;
      }),

    // Province
    province: Yup.string()
      .required("استان الزامی است!")
      .min(2, "نام استان باید حداقل ۲ کاراکتر باشد!")
      .max(30, "نام استان نمی‌تواند بیشتر از ۳۰ کاراکتر باشد!")
      .matches(/^[a-zA-Zآ-ی\s]+$/, "نام استان باید فقط شامل حروف باشد!"),

    // City
    city: Yup.string()
      .required("شهرستان الزامی است!")
      .min(2, "نام شهرستان باید حداقل ۲ کاراکتر باشد!")
      .max(30, "نام شهرستان نمی‌تواند بیشتر از ۳۰ کاراکتر باشد!")
      .matches(/^[a-zA-Zآ-ی\s]+$/, "نام شهرستان باید فقط شامل حروف باشد!"),

    // Address
    address: Yup.string()
      .required("آدرس الزامی است!")
      .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد!")
      .max(200, "آدرس نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد!"),
  })
  .test(
    "at-least-one-type",
    "حداقل یکی از گزینه‌های مشتری یا تامین‌کننده باید انتخاب شود!",
    function (values) {
      return values.customer || values.provider;
    }
  );

export default validationSchema;
