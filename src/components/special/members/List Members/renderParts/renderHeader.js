import GButton from "@/components/general/GeneralButton/GeneralButton";
import styles from "../ListMember.module.scss";
import { ROUTES } from "@/constValues/Routes";
import { UserPlus2 } from "lucide-react";
import Link from "next/link";

export const renderHeader = () => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h2 className={styles.pageTitle}>مدیریت مودیان</h2>
        </div>
        <Link
          href={ROUTES.PRIVATE.MOVADIAN_ADD}
          className={styles.headerActions}
        >
          <GButton
            type="primary"
            variant="filled"
            text="ثبت مودی جدید"
            loading={false}
            htmlType="button"
            size="medium"
            icon={<UserPlus2 size={18} style={{ marginRight: "15px" }} />}
          />
        </Link>
      </div>
    </div>
  );
};
