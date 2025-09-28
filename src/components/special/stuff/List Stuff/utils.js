export const convertApiObjectToTableRow = (apiObjects) => {
  return apiObjects.length > 0
    ? apiObjects?.map((apiObject) => {
        return {
          id: apiObject?.id,
          "شناسه کالا یا خدمات": apiObject?.stuffId || "-",
          "نام کالا یا خدمات": apiObject?.name || "-",
          "نرخ ارزش افزوده": apiObject?.vatRate || "-",
          نوع: apiObject?.stuffIdType || "-",
        };
      })
    : [];
};

import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const TruncatedText = ({ text, maxLength = 20, ...props }) => {
  // اگر متن خالی یا undefined باشد
  if (!text || typeof text !== "string") {
    return <span>-</span>;
  }

  // اگر طول متن کمتر از حداکثر طول باشد، tooltip نمایش ندهیم
  if (text.length <= maxLength) {
    return <span {...props}>{text}</span>;
  }

  // متن کوتاه شده
  const truncatedText = text.substring(0, maxLength) + "...";

  return (
    <Tippy
      content={text}
      placement="top"
      animation="fade"
      duration={200}
      maxWidth={300}
      theme="light"
    >
      <span
        style={{
          cursor: "pointer",
          display: "inline-block",
        }}
        {...props}
      >
        {truncatedText}
      </span>
    </Tippy>
  );
};
