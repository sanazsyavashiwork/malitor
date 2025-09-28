"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./renderMenuItem.modules.scss";
import { useState } from "react";
import { ROUTES } from "@/constValues/Routes";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";

const RenderMenuItemToggle = ({ item }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredChild, setHoveredChild] = useState(null);
  const { getMemberLength } = useGetMemberCookie();
  const lengthOfMember = getMemberLength();
  const isActive = (path) => {
    const currentPath = pathname.split("?")[0];
    const normalizedCurrent = currentPath.replace(/\/$/, "");
    const normalizedPath = path.replace(/\/$/, "");

    // اگه exact match باشه یا با path/ شروع بشه
    return (
      normalizedCurrent === normalizedPath ||
      normalizedCurrent.startsWith(normalizedPath + "/")
    );
  };

  const isMenuActive = isActive(item.path);

  // استایل‌های hover
  const getHoverStyle = (isHovered, isActive) => ({
    color: isHovered && !isActive ? "white" : "",
    cursor: "pointer",
  });

  const getChildHoverStyle = (childKey, isHovered) => ({
    backgroundColor: hoveredChild === childKey ? "#e8e8e8" : "",
    color: hoveredChild === childKey ? "white" : "",
    transition: "all 0.3s ease",
    cursor: "pointer",
  });

  return (
    <li
      key={item.key + "4" + item.title}
      className={`menu-item ${isMenuActive ? "active-item" : ""}`}
      style={{
        width: "100%",
        height: "100%",
        padding: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href={
          item.shouldHaveMovadi
            ? lengthOfMember > 0
              ? `${item.path}`
              : `${ROUTES.PRIVATE.MOVADIAN_ADD}?shoudAddMovadian=true`
            : `${item.path}`
        }
        className="full-width-flex-row"
        style={{
          width: "100%",
          textDecoration: "none",
          height: "100%",

          ...getHoverStyle(isHovered, isMenuActive),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={`menu-title ${isMenuActive ? "active-item" : ""}`}>
          <Tippy
            content={item.title}
            placement="right"
            zIndex={99999}
            appendTo={() => document.body}
          >
            <span
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                color: isMenuActive ? "white" : isHovered ? "white" : "",
              }}
            >
              {item.icon}
            </span>
          </Tippy>
        </span>
      </Link>
    </li>
  );
};

export default RenderMenuItemToggle;
