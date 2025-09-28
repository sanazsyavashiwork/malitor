import { formatNumber } from "../../../List Invoice/utils";

export const convertApiObjectToTableRow = (apiObjects) => {
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        return {
          "مقدار / تعداد": apiObject?.quantity,
          "واحد اندازه گیری": apiObject?.unit || "-",
          فی: apiObject?.unitPrice || "-",
          "مبلغ قبل از تخفیف":
            formatNumber(apiObject?.quantity * apiObject?.unitPrice) || "-",
          "مبلغ تخفیف": formatNumber(apiObject?.unitDiscount) || "-",
        };
      })
    : [];
};
