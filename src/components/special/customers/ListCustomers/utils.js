export const convertApiObjectToTableRow = (apiObjects) => {
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        return {
          id: apiObject?.id,
          "کد شناسایی": apiObject?.identificationCode,
          مشتری: apiObject?.name,
          "شناسه ملی/مدنی/اتباع": apiObject?.nationalId || "-",
          "شماره اقتصادی": apiObject?.economicCode,
          "کد پستی": apiObject?.postalCode,
          نوع: apiObject?.customerType,
        };
      })
    : [];
};
