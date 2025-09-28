import { Info } from "react-feather";
import styles from "./formLable.module.scss";
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import GeneralModal from "../../GeneralModal/GeneralModal";
import GButton from "../../GeneralButton/GeneralButton";
import { InfoIcon } from "lucide-react";
export const FormLabel = ({ name, label, hasInfoIcon, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const modalActions = [];
  return (
    <>
      <label htmlFor={name} className={styles["form-label"]} dir="rtl">
        <div style={{ display: "flex" }} className={styles["form-label"]}>
          {label}
          <Tippy
            content={"!برای مشاهده ی آموزش کلیک کنید"}
            placement="top"
            zIndex={99999}
            appendTo={() => document.body}
          >
            {hasInfoIcon && (
              <span
                className={styles["info-icon"]}
                onClick={() => setIsOpen(true)}
              >
                <InfoIcon className={styles["icon-rotate"]} size={18} />
              </span>
            )}
          </Tippy>
        </div>
      </label>
      <GeneralModal
        isOpen={isOpen}
        onClose={onClose}
        actions={modalActions}
        preventClose={false}
        closeOnOverlayClick={true}
        title={title}
        showCloseButton={true}
      >
        {content}
      </GeneralModal>
    </>
  );
};
