export const convertApiObjectToTableRow = (apiObjects) => {
  console.log("apiObjects", apiObjects);
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        console.log("apiObject", apiObject);
        return {
          id: apiObject?.id,
          نام: apiObject?.firstname || "-",
          "نام خانوادگی": apiObject?.lastname || "-",
          "نام کاربری": apiObject?.username || "-",
          وضعیت: apiObject?.active ? "فعال" : "غیرفعال",
        };
      })
    : [];
};
