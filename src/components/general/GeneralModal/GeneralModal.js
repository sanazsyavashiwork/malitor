import React from "react";
import styles from "./generalModal.module.scss";

const GeneralModal = ({
  isOpen,
  onClose,
  title = null,
  titleKey = null,
  children,
  showHeader = true,
  showCloseButton = false,
  closeOnOverlayClick = true,
  preventClose = false,
  actions = null,
  className = "",
  bodyClassName = "",
  actionsClassName = "",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && !preventClose) {
      e.stopPropagation();
      onClose();
    }
  };

  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.active : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`${styles.modal} ${className}`}>
        {showHeader && title && (
          <div className={styles.modalHeader}>
            <h3 className={`${styles.modalTitle} ${styles["modal-text-rtl"]}`}>
              {title}
            </h3>
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={handleClose}
                disabled={preventClose}
              >
                ×
              </button>
            )}
          </div>
        )}

        <div
          className={`${styles.modalBody} ${bodyClassName} ${styles["modal-text-rtl"]}`}
        >
          {children}
        </div>

        {actions && actions.length > 0 && (
          <div className={`${styles.modalActions} ${actionsClassName} fa}`}>
            {actions.map((action, index) => (
              <div key={index} className={styles.actionButton}>
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralModal;
