"use client";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import "./sidebar.modules.scss";
// import Image from "next/image";

const Sidebar = ({ toggle, setToggle }) => {
  const ChevronsLeftIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="11,17 6,12 11,7" />
      <polyline points="18,17 13,12 18,7" />
    </svg>
  );

  return (
    <>
      {!toggle && (
        <div
          className={`sidebar-overlay ${!toggle ? "show" : ""}`}
          onClick={() => setToggle(true)}
        />
      )}
      <div
        className={`overlay ${toggle ? "active" : ""}`}
        onClick={() => setToggle(false)}
      />

      <div
        className={` ${
          toggle ? "page-sidebar" : "page-sidebar-toggle"
        } ${"sidebar-position-rtl"}`}
      >
        <div className="logo-wrap">
          {toggle && (
            <div
              className={`back-btn d-lg-none d-inline-block`}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <ChevronsLeftIcon />
            </div>
          )}
        </div>

        <div className="main-sidebar">
          <div className="mainsidebar">
            {/* <div className="logo-container">
              <Image
                src="/assets/images/favicon.ico"
                alt="Logo"
                width={100}
                height={100}
                className={`img-fluid logo_sidebar animated-logo ${
                  toggle ? "large" : "small"
                }`}
              />
            </div> */}
            <SidebarMenu toggle={toggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
