import React from "react";
import { Check, X } from "react-feather";

const BooleanStatus = ({
  value,
  size = 16,
  trueColor = "#22c55e",
  falseColor = "#ef4444",
  showText = false,
  trueText = "فعال",
  falseText = "غیرفعال",
}) => {
  const isTrue = Boolean(value);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        color: isTrue ? trueColor : falseColor,
      }}
    >
      {isTrue ? <Check size={size} /> : <X size={size} />}

      {showText && (
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {isTrue ? trueText : falseText}
        </span>
      )}
    </div>
  );
};

export default BooleanStatus;
