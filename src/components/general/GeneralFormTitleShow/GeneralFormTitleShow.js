import React from "react";
import "./generalFormTitleShow.css";
import { ChevronRight } from "lucide-react";
import useMobileSize from "@/utils/useMobileSize";
import Link from "next/link";

const GeneralFormTitleShow = ({
  title,
  hasOuterURL = false,
  outerUrl,
  innerComponent,
}) => {
  const isMobile = useMobileSize();
  return (
    <div className="form-title-content">
      {/* Left side - Inner Component */}
      <div className="left-section">{innerComponent}</div>

      {/* Center - Title */}
      <h5
        className={"form-title"}
        style={{
          fontSize: isMobile ? "12px" : !!innerComponent ? "14px" : "24px",
          flex: !!innerComponent ? 2 : 3,
        }}
      >
        {title}
      </h5>

      {hasOuterURL && (
        <div className="right-section">
          <Link
            href={outerUrl}
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              color: "var(--base) !important",
            }}
          >
            <ChevronRight size={24} />

            <h5 className={"form-back"}>برگشت</h5>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GeneralFormTitleShow;
