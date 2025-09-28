export const formatPersianNumber = (num, hasComma = false) => {
  if (!num && num !== 0) return "۰";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let formattedNum = num.toString();

  // اگر hasComma درست باشه، کاما اضافه کن
  if (hasComma) {
    formattedNum = formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // تبدیل به اعداد فارسی
  return formattedNum.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export const formatDate = (date) => {
  if (!date) return "";

  // اگر رشته باشه
  if (typeof date === "string") {
    return date.replace(/-/g, "/");
  }

  // اگر آبجکت باشه (مثل {year, monthPersian, day})
  if (typeof date === "object") {
    const monthMap = {
      FARVARDIN: "01",
      ORDIBEHESHT: "02",
      KHORDAD: "03",
      TIR: "04",
      MORDAD: "05",
      SHAHRIVAR: "06",
      MEHR: "07",
      ABAN: "08",
      AZAR: "09",
      DEY: "10",
      BAHMAN: "11",
      ESFAND: "12",
    };

    const monthNumber = monthMap[date.monthPersian] || "01";
    return `${date.year}/${monthNumber}/${String(date.day).padStart(2, "0")}`;
  }

  // اگر Date object باشه
  if (date instanceof Date) {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  }

  return "";
};
