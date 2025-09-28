import React from "react";
import dynamic from "next/dynamic";
import WhatsAppButtonClient from "./WhatsAppButtonClient";

const WhatsAppButton = () => {
  const phoneNumber = "905539071193";

  const containerStyle = {
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

export default WhatsAppButton;
