export const convertApiObjectToTableRow = (apiObjects) => {
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        const isKeysValid = !!(apiObject?.privateKey && apiObject?.memoryId);

        return {
          id: apiObject?.id,
          نام: apiObject?.name || "-",
          "شناسه ملی/مدنی/اتباع": apiObject?.nationalId || "-",
          "شماره ثبت": apiObject?.registrationNumber || "-",
          تلفن: apiObject?.phoneNumber || "-",
          "شخص حقوقی": apiObject?.legal,
          "صحت کلید ها": isKeysValid,
        };
      })
    : [];
};
