import React from "react";
import "./formLink.css";
import { ChevronLeft } from "lucide-react";

export default function FormLink({ titleLink, linkText, link }) {
  console.log("FormLink rendered with link:", link);
  return (
    <div className="container-form-link">
      <div className="text-form-link">
        {titleLink}
        <a href={link} className="link-form-link">
          {linkText}
        </a>
        <ChevronLeft size={14} />
      </div>
    </div>
  );
}
