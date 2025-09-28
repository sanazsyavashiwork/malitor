"use client";

import React, { useState, useEffect } from "react";
import "./layout.modules.scss";
import useMobileSize from "@/utils/useMobileSize";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  const isMobile = useMobileSize();

  const [toggle, setToggle] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);
  useEffect(() => {
    setToggle(!isMobile);
  }, [isMobile]);

  const headerClass = !isInitialRender && "page-position-rtl";
  return (
    <div className="page-wrapper">
      <Header setToggle={setToggle} toggle={toggle} />
      <div className="page-body-wrapper">
        <Sidebar toggle={toggle} setToggle={() => setToggle(!toggle)} />
        <div
          className={[
            "page-body",
            toggle ? "page-toggle" : "page-not-toggle",
            toggle && headerClass,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {" "}
          <div className={`inner-body ${!toggle ? "page-position-rtl" : ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
