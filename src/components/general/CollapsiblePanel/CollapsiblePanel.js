"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CollapsiblePanel.module.scss";

const CollapsiblePanel = ({
  title,
  children,
  defaultOpen = false,
  variant = "default",
  size = "md",
  icon,
  className = "",
  headerClassName = "",
  contentClassName = "",
  onToggle,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  const handleToggle = () => {
    if (disabled) return;

    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  // Generate class names based on props
  const containerClasses = [
    styles.panel,
    styles[`panel--${variant}`],
    styles[`panel--${size}`],
    isOpen ? styles["panel--open"] : "",
    disabled ? styles["panel--disabled"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const headerClasses = [
    styles.header,
    styles[`header--${variant}`],
    styles[`header--${size}`],
    headerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    styles.content,
    styles[`content--${variant}`],
    styles[`content--${size}`],
    contentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {/* Header */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={headerClasses}
        aria-expanded={isOpen}
        aria-controls="panel-content"
      >
        <svg
          className={`${styles.chevron} ${
            isOpen ? styles["chevron--rotated"] : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <div className={styles.headerContent}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
      </button>

      {/* Content */}
      <div className={styles.contentWrapper} style={{ height: `${height}px` }}>
        <div ref={contentRef} id="panel-content" className={contentClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
