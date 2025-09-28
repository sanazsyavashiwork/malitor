import GButton from "@/components/general/GeneralButton/GeneralButton";
import styles from "../ListMember.module.scss";
import { ROUTES } from "@/constValues/Routes";
import { UserPlus2 } from "lucide-react";
import { PackagePlus } from "lucide-react";

export const renderHeader = () => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h2 className={styles.pageTitle}>مدیریت شناسه کالا و خدمات</h2>
        </div>
        <a href={ROUTES.PRIVATE.ITEMS_ADD} className={styles.headerActions}>
          <GButton
            type="primary"
            variant="filled"
            text="ثبت شناسه کالا یا خدمات جدید"
            loading={false}
            htmlType="button"
            size="medium"
            icon={<PackagePlus size={18} style={{ marginRight: "15px" }} />}
          />
        </a>
      </div>
    </div>
  );
};
