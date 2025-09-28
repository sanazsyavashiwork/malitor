"use client";
import React from "react";
import dynamic from "next/dynamic";
import useMobileSize from "@/utils/useMobileSize";

const WhatsAppButtonClient = dynamic(() => import("./WhatsAppButtonClient"), {
  ssr: false,
});

const WhatsAppButtonDetail = () => {
  const phoneNumber = "+989114233141";
  const mobileSize = useMobileSize();

  const containerStyle = {
    display: mobileSize ? "none" : "block",
    position: "fixed",
    bottom: "1.5rem", // bottom-6
    left: "1.5rem", // right-6
    zIndex: 50, // z-50
  };

  return (
    <div style={containerStyle}>
      <WhatsAppButtonClient phoneNumber={phoneNumber} />
    </div>
  );
};

export default WhatsAppButtonDetail;
