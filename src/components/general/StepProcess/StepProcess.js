import { ROUTES } from "@/constValues/Routes";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";
import Link from "next/link";
import React, { useState } from "react";

const SimpleStepItem = ({
  number,
  title,
  description,
  isCompleted = false,
  isCurrent = false,
  onClick = null,
  circleColor = "#3b82f6",
  textColor = "#1f2937",
  link,
  shouldHaveMovadi = false,
}) => {
  const { getMemberLength } = useGetMemberCookie();

  const lengthOfMember = getMemberLength();

  const containerStyle = {
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    flexDirection: "row-reverse",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: isCurrent ? "#f8fafc" : "transparent",
    border: isCurrent ? "2px solid #e2e8f0" : "2px solid transparent",
    transition: "all 0.3s ease",
  };

  const linkStyle = {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#01494b  !important",
    textDecoration: "none",
    cursor: "pointer",
    marginBottom: "0.5rem",
    display: "block",
    textAlign: "end",
  };

  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    lineHeight: "1.5",
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      {/* دایره */}

      {/* محتوا */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Link
          href={
            shouldHaveMovadi
              ? lengthOfMember > 0
                ? `${link}`
                : `${ROUTES.PRIVATE.MOVADIAN_ADD}?shoudAddMovadian=true`
              : `${link}`
          }
          style={linkStyle}
          // onClick={(e) => {
          //   e.preventDefault();
          //   onClick && onClick();
          // }}
        >
          {title}
        </Link>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
};

export default SimpleStepItem;
