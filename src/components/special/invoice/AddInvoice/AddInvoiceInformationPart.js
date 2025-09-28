"use client";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import styles from "../AddInvoice/InvoiceInfo/editProfile.module.scss";

import GeneralFormTitleShow from "@/components/general/GeneralFormTitleShow/GeneralFormTitleShow";
import { ROUTES } from "@/constValues/Routes";
import { InvoiceProvider } from "./InvoiceContext";
import InvoiceContent from "./InvoiceContent";

const AddInvoiceInformationPart = () => {
  return (
    <InvoiceProvider>
      <div className={styles["authentication-box-edit"]}>
        <Row
          className=" align-items-center justify-content-center g-0"
          style={{ width: "100%" }}
        >
          <Col
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            className=" order-lg-1 order-2 d-flex align-items-center"
          >
            <Card className={`card ${styles["width-full"]}`}>
              <CardBody className="card-body p-4 p-md-5">
                <GeneralFormTitleShow
                  title={"ثبت صورت حساب"}
                  hasOuterURL={true}
                  outerUrl={ROUTES.PRIVATE.INVOICE}
                />
                <InvoiceContent />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </InvoiceProvider>
  );
};

export default AddInvoiceInformationPart;
