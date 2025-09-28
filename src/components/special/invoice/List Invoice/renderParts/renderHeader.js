import GButton from "@/components/general/GeneralButton/GeneralButton";
import styles from "../ListMember.module.scss";
import { ROUTES } from "@/constValues/Routes";
import { PlusIcon } from "lucide-react";

export const renderHeader = () => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h2 className={styles.pageTitle}>لیست صورت حساب ها</h2>
        </div>
        <a href={ROUTES.PRIVATE.INVOICE_ADD} className={styles.headerActions}>
          <GButton
            type="primary"
            variant="filled"
            text="ثبت صورتحساب جدید"
            loading={false}
            htmlType="button"
            size="medium"
            icon={<PlusIcon size={18} style={{ marginRight: "15px" }} />}
          />
        </a>
      </div>
    </div>
  );
};
