import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";
import React from "react";
import { Check } from "react-feather";

const NameHandler = ({
  value,
  id,
  size = 16,
  trueColor = "#22c55e",
  falseColor = "#ef4444",
}) => {
  const { getMemberId } = useGetMemberCookie();

  const isTrue = getMemberId() === id;
  console.log(getMemberId());
  console.log({ id });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        gap: "6px",
        textAlign: "right",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {value} + {id}
      </span>
      {isTrue ? <Check size={size} /> : ""}
    </div>
  );
};

export default NameHandler;
