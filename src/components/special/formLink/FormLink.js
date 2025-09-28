import React from "react";
import "./formLink.css";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FormLink({ titleLink, linkText, link }) {
  console.log("FormLink rendered with link:", link);
  return (
    <div className="container-form-link">
      <div className="text-form-link">
        {titleLink}
        <Link href={link} className="link-form-link">
          {linkText}
        </Link>
        <ChevronLeft size={14} />
      </div>
    </div>
  );
}
