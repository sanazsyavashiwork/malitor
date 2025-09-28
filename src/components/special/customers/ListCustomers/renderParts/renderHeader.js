import GButton from "@/components/general/GeneralButton/GeneralButton";
import styles from "../ListMember.module.scss";
import { ROUTES } from "@/constValues/Routes";
import { UserPlus2, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export const renderHeader = (customerCount = 0) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>مدیریت مشتریان</h1>
        </div>

        <Link
          href={ROUTES.PRIVATE.CUSTOMERS_ADD}
          className={styles.headerActions}
        >
          <GButton
            type="primary"
            variant="filled"
            text="ثبت مشتری جدید"
            loading={false}
            htmlType="button"
            size="medium"
            icon={<UserPlus2 size={18} style={{ marginRight: "12px" }} />}
          />
        </Link>
      </div>
    </div>
  );
};
