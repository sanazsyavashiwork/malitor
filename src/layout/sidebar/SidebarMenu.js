"use client";

import React from "react";
import "./sidebar.modules.scss";
import { adminPanelHeader } from "@/data/adminPanelHeader";
import { RenderMenuItem } from "./RenderMenuItem";
import RenderMenuItemToggle from "./RenderMenuItemToggle";

const SidebarMenu = ({ toggle }) => {
  return (
    <nav className="sidebar-menu" style={{ width: "100%" }}>
      {adminPanelHeader.menuItemsSidebar.map((item) =>
        toggle ? (
          <ul className="listMenu" key={item.key + "3" + item.title}>
            <RenderMenuItem key={item.key + "1" + item.title} item={item} />
          </ul>
        ) : (
          <RenderMenuItemToggle key={item.key + "2" + item.title} item={item} />
        )
      )}
    </nav>
  );
};

export default SidebarMenu;
