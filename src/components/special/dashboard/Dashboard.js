import React from "react";
import styles from "./ListMember.module.scss";
import Image from "next/image";
import SimpleStepItem from "@/components/general/StepProcess/StepProcess";
import { ROUTES } from "@/constValues/Routes";

const Dashboard = () => {
  const steps = [
    {
      title: "ثبت مودی",
      description: "محدودیتی برای ثبت مودی یا مودیان مختلف ندارید",
      link: ROUTES.PRIVATE.MOVADIAN_ADD,
      shouldHaveMovadi: true,
    },
    // {
    //   title: "انتقال شارژ",
    //   description: "اعتبار را به مودی مورد نظر انتقال دهید",
    //   link: "#",
    // },
    // {
    //   title: "خرید و اعتبار",
    //   description: "انتخاب پلن دائمی یا اعتباری",
    //   link: "#",
    // },
    {
      title: "شناسه کالا و خدمت من",
      description:
        "شناسه کالا و خدمت مرتبط با فعالیت خود را از لیست انتخاب نمایید",
      link: ROUTES.PRIVATE.ITEMS_LIST,
      shouldHaveMovadi: true,
    },
    {
      title: "ثبت مشتری",
      description: "مشتری و تامین کننده های خود را ثبت نمایید",
      link: ROUTES.PRIVATE.CUSTOMERS_ADD,
      shouldHaveMovadi: true,
    },
    {
      title: "ثبت صورتحساب",
      description: "اولین صورتحساب خود را ثبت نمایید",
      link: ROUTES.PRIVATE.INVOICE_ADD,
      shouldHaveMovadi: true,
    },
  ];

  return (
    <div className={styles.memberListContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.pageLeftSideImage} style={{ height: "500px" }}>
          <Image
            src={`/assets/images/svg/2.svg`}
            alt="Authentication illustration"
            className={`img-fluid ${styles["sign-up-image"]}`}
            width={600}
            height={600}
          />
        </div>
        <div className={styles.pageRightSideImage}>
          <p style={{ textAlign: "end" }}>
            قبل از شروع کار,مراحل زیر را انجام دهید
          </p>
          {steps.map((step, index) => (
            <SimpleStepItem
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              // onClick={() => handleStepClick(index)}
              circleColor={"#01494b"}
              link={step.link}
              shouldHaveMovadi={step.shouldHaveMovadi}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
