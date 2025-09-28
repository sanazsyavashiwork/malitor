"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./renderMenuItem.modules.scss";
import { useState } from "react";
import { useGetMemberCookie } from "@/hooks/useGetMemberCookie";
import { ROUTES } from "@/constValues/Routes";

export const RenderMenuItem = ({ item }) => {
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
      key={item.key + "3"}
      className={`menu-item ${isMenuActive ? "active-item" : ""}`}
      style={{ width: "100%", height: "100%", padding: "0px" }}
    >
      {!item.subSet?.length > 0 ? (
        <a
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
            color: "#01494b",

            ...getHoverStyle(isHovered, isMenuActive),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={`menu-title ${isMenuActive ? "active-item" : ""}`}>
            <span
              style={{
                marginInline: "10px",

                color: isMenuActive ? "white" : isHovered ? "white" : "",
                transition: "color 0.3s ease",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                textAlign: "start",
                color: isMenuActive ? "white" : isHovered ? "white" : "",
                transition: "color 0.3s ease",
              }}
            >
              {item.title}
            </span>
          </span>
        </a>
      ) : (
        <>
          <div
            onClick={() => {
              console.log("Toggle clicked");
              console.log(item.title);
              setIsOpen(!isOpen);
            }}
            className="full-width-flex-row"
            style={{
              width: "100%",
              height: "100%",

              ...getHoverStyle(isHovered, false),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="menu-title">
              <span
                style={{
                  marginInline: "10px",
                  color: isHovered ? "white" : "",
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  textAlign: "end",
                  color: isHovered ? "white" : "",
                  transition: "color 0.3s ease",
                }}
              >
                {item.title}
              </span>
            </span>
          </div>
          {item.subSet && isOpen && (
            <ul className="listMenu">
              {item.subSet.map((child) => (
                <li
                  key={child.key}
                  className={`menu-item ${
                    isActive(child.path) ? "active-item" : ""
                  }`}
                >
                  <a
                    href={`${child.path}`}
                    className="full-width-flex-row"
                    style={{
                      width: "100%",
                      height: "100%",
                      textDecoration: "none",
                      ...getChildHoverStyle(
                        child.key,
                        hoveredChild === child.key
                      ),
                    }}
                    onMouseEnter={() => setHoveredChild(child.key)}
                    onMouseLeave={() => setHoveredChild(null)}
                  >
                    <span className="menu-title">
                      <span
                        style={{
                          marginInline: "10px",
                          color: isActive(child.path)
                            ? "white"
                            : hoveredChild === child.key
                            ? "white"
                            : "",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {child.icon}
                      </span>
                      <span
                        style={{
                          textAlign: "end",
                          color: isActive(child.path)
                            ? "white"
                            : hoveredChild === child.key
                            ? "#white"
                            : "",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {child.title}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};
