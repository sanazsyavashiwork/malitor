import React, { useEffect, useState } from "react";
import GeneralTable from "@/components/general/GeneralTable/GeneralTable";
import styles from "./ListMember.module.scss";

// Constants
import { TABLE_HEADERS } from "./constants/tableHeader";
import { useInvoice } from "../../InvoiceContext";
import { convertApiObjectToTableRow } from "./utils";
import { Trash2 } from "lucide-react";
import { useGetInvoiceQuery } from "@/hooks/Invoices/useGetInvoiceQuery";

const ListStuffes = ({ id }) => {
  const [members, setMembers] = useState([]);
  const {
    invoiceData,
    calculateTotalAmount,
    removeInvoiceItem,
    addInvoiceItem,
  } = useInvoice();
  const { invoice, isLoadingInvoice } = useGetInvoiceQuery({ id });

  useEffect(() => {
    invoice?.data.invoiceItems.map((item) => {
      addInvoiceItem(item);
    });
  }, [invoice]);
  console.log(invoiceData.invoiceItems);
  useEffect(() => {
    setMembers(convertApiObjectToTableRow(invoiceData.invoiceItems));
  }, [invoiceData.invoiceItems]);

  const handleDelete = (member, index) => {
    removeInvoiceItem(index);
    successToast(`کالا با موفقیت حذف شد`);
  };

  const defaultActions = [
    {
      label: "حذف",
      icon: <Trash2 size={14} className="action-icon action-icon--delete" />,
      onClick: (item, index) => handleDelete(item, index),
    },
  ];

  const renderTable = () => (
    <div className={styles.tableContainer}>
      <GeneralTable
        headers={TABLE_HEADERS}
        items={members}
        actions={defaultActions}
      />
      {members?.length === 0 && renderEmptyState()}
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <span>مجموع مبلغ: </span>
          <strong>{calculateTotalAmount().toLocaleString()} تومان</strong>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ کالایی یافت نشد</h3>
    </div>
  );

  return (
    <>
      <div className={styles.memberListContainer} dir="rtl">
        {renderTable()}
      </div>
    </>
  );
};

export default ListStuffes;
