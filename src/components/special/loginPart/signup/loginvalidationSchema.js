import * as Yup from "yup";

const loginvalidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "نام حداقل باید 2 کاراکتر باشد")
    .max(50, "نام نباید بیشتر از 50 کاراکتر باشد")
    .matches(/^[آ-یa-zA-Z\s]+$/, "نام فقط باید شامل حروف باشد")
    .required("نام الزامی است!"),

  lastname: Yup.string()
    .min(2, "نام خانوادگی حداقل باید 2 کاراکتر باشد")
    .max(50, "نام خانوادگی نباید بیشتر از 50 کاراکتر باشد")
    .matches(/^[آ-یa-zA-Z\s]+$/, "نام خانوادگی فقط باید شامل حروف باشد")
    .required("نام خانوادگی الزامی است!"),

  username: Yup.string()
    .min(3, "نام کاربری حداقل باید 3 کاراکتر باشد")
    .max(30, "نام کاربری نباید بیشتر از 30 کاراکتر باشد")
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "نام کاربری فقط باید شامل حروف انگلیسی، اعداد، نقطه و _ باشد"
    )
    .required("نام کاربری الزامی است!"),

  password: Yup.string()
    .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد")
    .max(100, "رمز عبور نباید بیشتر از 100 کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "رمز عبور باید شامل حداقل یک حروف کوچک، یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد"
    )
    .required("رمز عبور الزامی است!"),

  phoneNumber: Yup.string()
    .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است!"),

  nationalId: Yup.string()
    .matches(/^\d{10}$/, "کد ملی باید 10 رقم باشد")
    .test("national-id", "کد ملی معتبر نیست", function (value) {
      if (!value) return false;

      // بررسی کد ملی ایرانی
      if (value.length !== 10) return false;

      // بررسی اینکه تمام ارقام یکسان نباشند
      if (/^(\d)\1{9}$/.test(value)) return false;

      // محاسبه رقم کنترل
      const check = parseInt(value[9]);
      let sum = 0;

      for (let i = 0; i < 9; i++) {
        sum += parseInt(value[i]) * (10 - i);
      }

      const remainder = sum % 11;

      if (remainder < 2) {
        return check === remainder;
      } else {
        return check === 11 - remainder;
      }
    })
    .required("کد ملی الزامی است!"),

  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "فرمت ایمیل صحیح نیست"
    )
    .required("پست الکترونیک الزامی است!"),
});

export default loginvalidationSchema;
