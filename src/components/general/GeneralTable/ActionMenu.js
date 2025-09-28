import React, { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "react-feather";
import "./GeneralTable.scss";

// کامپوننت منو اکشن
const ActionMenu = ({ actions, item, rowIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (action) => {
    action.onClick(item, rowIndex);
    setIsOpen(false);
  };

  return (
    <div className="action-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="action-menu__trigger"
        title="عملیات"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <div
            className="action-menu__backdrop"
            onClick={() => setIsOpen(false)}
          />

          <div className="action-menu__dropdown">
            <div className="action-menu__list">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action)}
                  className="action-menu__item"
                  style={{ zIndex: "999999999999", cursor: "pointer" }}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;
