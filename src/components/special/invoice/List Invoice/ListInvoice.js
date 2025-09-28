import React, { useState, useMemo, useEffect } from "react";
import { Search } from "react-feather";
import GeneralTable from "@/components/general/GeneralTable/GeneralTable";
import styles from "./ListMember.module.scss";

// Constants
import { TABLE_HEADERS } from "./constants/tableHeader";
import { renderHeader } from "./renderParts/renderHeader";
import { ROUTES } from "@/constValues/Routes";
import { useGetInvoicesQuery } from "@/hooks/Invoices/useGetInvoicesQuery";
import Loading from "../../loading/loading";
import { convertApiObjectToTableRow } from "./utils";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import { Eye } from "lucide-react";
import GeneralModal from "@/components/general/GeneralModal/GeneralModal";
import { useDeleteInvoicesQuery } from "@/hooks/Invoices/useDeleteInvoicesQuery";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import { useToast } from "@/hooks/useToast2";

const ListInvoice = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate, isPending } = useDeleteInvoicesQuery();
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const { successToast, errorToast } = useToast();

  const onClose = () => setIsDeleteModalOpen(false);

  const { invoicesList, isLoadingInvoicesList, refetch } = useGetInvoicesQuery(
    {}
  );
  useEffect(() => {
    if (
      !isLoadingInvoicesList &&
      invoicesList?.data &&
      Array.isArray(invoicesList.data)
    ) {
      setMembers(convertApiObjectToTableRow(invoicesList.data));
    }
  }, [isLoadingInvoicesList, invoicesList]);

  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;

    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member["مشتری"].toLowerCase().includes(searchLower) ||
        member["سریال"].includes(searchTerm) ||
        member["موضوع"].includes(searchTerm)
      );
    });
  }, [members, searchTerm]);

  // Event handlers
  const handleEdit = (member, index) => {
    window.location.href = `${ROUTES.PRIVATE.INVOICE_EDIT}/${member.id}`;
  };

  const handleView = (member, index) => {
    window.location.href = `${ROUTES.PRIVATE.INVOICE_PRINT}/${member.id}`;
  };

  const handleDelete = (member, index) => {
    setSelectedMemberId(member.id);
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultActions = [
    {
      label: "مشاهده",
      icon: <Eye size={14} className="action-icon action-icon--edit" />,
      onClick: (item, index) => handleView(item, index),
    },
    {
      label: "ویرایش",
      icon: <Edit size={14} className="action-icon action-icon--edit" />,
      onClick: (item, index) => handleEdit(item, index),
    },
    {
      label: "حذف",
      icon: <Trash2 size={14} className="action-icon action-icon--delete" />,
      onClick: (item, index) => handleDelete(item, index),
    },
  ];

  const onLogout = () => {
    mutate(
      { id: selectedMemberId },
      {
        onSuccess: (data) => {
          setIsDeleteModalOpen(false);
          successToast(`صورت حساب با موفقیت حذف شد`);
          refetch();
        },
        onSettled: () => {},
        onError: (error) => {
          errorToast(`حذف صورت حساب با خطا روبرو شد`);
          setIsDeleteModalOpen(false);
        },
      }
    );
  };

  const modalActions = [
    <GButton
      key="cancel"
      onClick={onClose}
      type="secondary"
      variant="outline"
      fullWidth={true}
    >
      {"انصراف"}
    </GButton>,

    <GButton
      key="confirm"
      type="danger"
      variant="filled"
      fullWidth={true}
      onClick={onLogout}
      loadingText={"در حال حذف"}
      loading={isPending}
    >
      {"حذف"}
    </GButton>,
  ];

  const renderSearchSection = () => (
    <div className={styles.filterSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="جستجو بر اساس سریال صورت حساب و مشتری"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
  const renderTable = () => (
    <div className={styles.tableContainer}>
      <GeneralTable
        headers={TABLE_HEADERS}
        items={filteredMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actions={defaultActions}
      />
      {filteredMembers.length === 0 && renderEmptyState()}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ موردی یافت نشد</h3>
      <p>
        برای نمایش نتایج، فیلترها را تغییر دهید یا صورت حساب جدید اضافه کنید
      </p>
    </div>
  );

  if (isLoadingInvoicesList) {
    return <Loading />;
  } else {
    return (
      <>
        <div className={styles.memberListContainer} dir="rtl">
          {renderHeader()}
          {renderSearchSection()}
          {renderTable()}
        </div>
        <GeneralModal
          isOpen={isDeleteModalOpen}
          onClose={onClose}
          actions={modalActions}
          preventClose={false}
          closeOnOverlayClick={true}
          title={"پاک کردن صورت حساب"}
        >
          <p>{`آیا از حذف صورت حساب مطمئن هستید؟`}</p>
        </GeneralModal>
      </>
    );
  }
};

export default ListInvoice;
