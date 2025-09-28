// Button.jsx
import React from "react";
import styles from "./GButton.module.scss";

const GButton = ({
  type = "primary",
  variant = "filled",
  size = "medium",
  fullWidth = false,
  children,
  onClick,
  disabled = false,
  className = "",
  loadingText = "",
  loading = false,
  text,
  htmlType = "submit", // نوع HTML دکمه: 'button', 'submit', 'reset'
  icon,
  ...props
}) => {
  const getButtonClasses = () => {
    const classes = [
      styles.button,
      styles[size],
      styles[`${type}${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
      fullWidth ? styles.fullWidth : "",
      loading ? styles.loading : "",
      className,
    ];

    return classes.filter(Boolean).join(" ");
  };

  return (
    <button
      type={htmlType}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? loadingText : text || children} {icon}
    </button>
  );
};

export default GButton;
