export const convertPersianNumberToEnglish = (s = "", number) => {
  const elem = s
    .toString()
    .replace(/[۰-۹]/g, (d) => `${"۰۱۲۳۴۵۶۷۸۹".indexOf(d)}`)
    .replace(/[٠-٩]/g, (d) => `${"٠١٢٣٤٥٦٧٨٩".indexOf(d)}`);
  if (number) return +elem;
  return elem;
};
