"use client";
import React, { useEffect, useState } from "react";
import { ChevronsRight, Menu } from "react-feather";
import { Col, Row } from "reactstrap";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { adminPanelHeader } from "@/data/adminPanelHeader";
import LogoutModal from "@/components/special/logoutModal/LogoutModal";
import { Users } from "lucide-react";
import { User } from "lucide-react";
import { Settings } from "lucide-react";
import { SelectField } from "@/components/general/GenericInputField/SelectField";
import ChangeMember from "./ChangeMember/ChangeMember";
import { useSetMemberCookie } from "@/hooks/useSetMemberCookie";
import { useGetTaxPayersQuery } from "@/hooks/Tax-payers/useGetTaxPayersQuery";

const Header = ({ setToggle, toggle }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const handleCloseModal = () => setLogoutModalOpen(false);
  const handleOpen = () => setLogoutModalOpen(true);
  const { setMemberLength } = useSetMemberCookie();
  const { taxPayerList, isLoadingTaxPayerList, refetch } = useGetTaxPayersQuery(
    {}
  );
  useEffect(() => {
    setIsInitialRender(false);
    setMemberLength(taxPayerList?.data?.length);
  }, []);
  useEffect(() => {
    setMemberLength(taxPayerList?.data?.length);
  }, [taxPayerList]);
  const headerClass = !isInitialRender && styles["is-menu-rtl"];
  return (
    <>
      <Row
        className={`${styles["page-main-header"]} ${styles["page-main-rtl"]}  ${
          !toggle ? styles["close_icon"] : ""
        } ${!toggle ? "width-main-Header" : ""}`}
      >
        <Col className="nav-right p-0">
          <ul className="header-menu" dir={"rtl"}>
            <li className="profile-avatar onhover-dropdown">
              <Settings
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
              <div
                className={`onhover-show-div profile-dropdown ${headerClass}`}
              >
                <ul>
                  {adminPanelHeader.headerItems.map((item) => (
                    <li key={item.key}>
                      {item.key !== "logout" ? (
                        <Link
                          href={`${item.link}`}
                          className={styles["header-link-option"]}
                        >
                          {item.title}
                          {item.icon}
                        </Link>
                      ) : (
                        <div
                          className={styles["header-link-option"]}
                          onClick={handleOpen}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              handleOpen();
                          }}
                        >
                          {item.title}
                          {item.icon}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
          <ul className="header-menu" dir={"rtl"}>
            <li className="profile-avatar onhover-dropdown">
              <Users
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              />
              <div
                className={`onhover-show-div  profile-dropdown ${headerClass}`}
              >
                {/* <ul>hello</ul> */}
                <ChangeMember />
              </div>
            </li>
          </ul>
        </Col>

        <Col className="toggle-sidebar col-auto">
          <Menu
            size={18}
            onClick={() => setToggle(!toggle)}
            className="menu-icon"
          />
          <ChevronsRight
            size={18}
            onClick={() => setToggle(!toggle)}
            className="chevronsRight-icon"
          />
        </Col>
      </Row>
      <LogoutModal isOpen={logoutModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Header;
