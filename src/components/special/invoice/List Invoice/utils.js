const getMonthNumber = (monthPersian) => {
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

  return monthMap[monthPersian] || "00";
};

export const convertApiObjectToTableRow = (apiObjects) => {
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        const formatDate = (dateObj) => {
          if (!dateObj) return "-";
          const monthNumber = getMonthNumber(dateObj.monthPersian);
          return `${dateObj.year}/${monthNumber}/${String(dateObj.day).padStart(
            2,
            "0"
          )}`;
        };

        const isKeysValid = !!(apiObject?.privateKey && apiObject?.memoryId);

        return {
          id: apiObject?.id,
          سریال: apiObject?.internalSerial || "-",
          // " تاریخ صورت حساب": apiObject?.date || "-",
          // " تاریخ صورت حساب": "-",
          " تاریخ صورت حساب": formatDate(apiObject?.date),

          مشتری: apiObject?.customer?.name || "-",
          موضوع: apiObject?.subject || "-",
          مجموع: formatNumber(apiObject?.totalFinalPrice) || "-",
          "شماره منحصر به فرد مالیاتی": apiObject?.taxPayer?.economicCode,
        };
      })
    : [];
};

export const formatNumber = (value, separator = ",") => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  // تبدیل به رشته و حذف کاراکترهای غیرعددی (جز نقطه و منفی)
  const cleanValue = value.toString().replace(/[^0-9.-]/g, "");

  if (cleanValue === "" || isNaN(cleanValue)) {
    return "0";
  }

  const number = parseFloat(cleanValue);

  // اگر عدد اعشاری است
  if (number % 1 !== 0) {
    const parts = number.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return `${integerPart}.${parts[1]}`;
  }

  // اگر عدد صحیح است
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
