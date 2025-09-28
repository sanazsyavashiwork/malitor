import React, { useState, useMemo, useEffect } from "react";
import { Search } from "react-feather";
import GeneralTable from "@/components/general/GeneralTable/GeneralTable";
import styles from "./ListMember.module.scss";

// Constants
import { TABLE_HEADERS } from "./constants/tableHeader";
import { renderHeader } from "./renderParts/renderHeader";
import { ROUTES } from "@/constValues/Routes";
import { useDeleteCustomerQuery } from "@/hooks/Customers/useDeleteCustomerQuery";
import { useGetCustomersQuery } from "@/hooks/Customers/useGetCustomersQuery";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import { convertApiObjectToTableRow } from "./utils";
import GeneralModal from "@/components/general/GeneralModal/GeneralModal";
import { useToast } from "@/hooks/useToast2";
import Loading from "../../loading/loading";

const ListCustomer = () => {
  const { successToast, errorToast } = useToast();

  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { customerList, isLoadingCustomerList, refetch } = useGetCustomersQuery(
    {}
  );
  const { mutate, isPending } = useDeleteCustomerQuery();

  // State management
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onClose = () => setIsDeleteModalOpen(false);

  const onLogout = () => {
    mutate(
      { id: selectedMemberId },
      {
        onSuccess: (data) => {
          setIsDeleteModalOpen(false);
          successToast(`${selectedMemberName} با موفقیت حذف شد`);
          refetch();
        },
        onSettled: () => {},
        onError: (error) => {
          errorToast(`حذف ${selectedMemberName} با خطا روبرو شد`);
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

  useEffect(() => {
    if (
      !isLoadingCustomerList &&
      customerList?.data &&
      Array.isArray(customerList.data)
    ) {
      setMembers(convertApiObjectToTableRow(customerList.data));
    }
  }, [isLoadingCustomerList, customerList]);

  // Memoized filtered data
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;

    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member["شناسه ملی/مدنی/اتباع"].includes(searchTerm) ||
        member["شماره اقتصادی"]?.includes(searchTerm) ||
        member["کد پستی"]?.includes(searchTerm) ||
        member["نوع"]?.toLowerCase().includes(searchLower) ||
        member["کد شناسایی"]?.includes(searchTerm) ||
        member["مشتری"]?.toLowerCase().includes(searchLower)
      );
    });
  }, [members, searchTerm]);

  // Event handlers
  const handleEdit = (member, index) => {
    window.location.href = `${ROUTES.PRIVATE.CUSTOMERS_EDIT}/${member.id}`;
  };

  const handleDelete = (member, index) => {
    setSelectedMemberName(member.مشتری);
    setSelectedMemberId(member.id);
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const renderSearchSection = () => (
    <div className={styles.filterSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="جستجو بر اساس شماره اقتصادی و..."
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
      />
      {filteredMembers.length === 0 && renderEmptyState()}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ موردی یافت نشد</h3>
      <p>برای نمایش نتایج، فیلترها را تغییر دهید یا مشتری جدید اضافه کنید</p>
    </div>
  );
  if (isLoadingCustomerList) {
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
          title={"پاک کردن مودی"}
        >
          <p>{`آیا از حذف ${selectedMemberName} مطمئن هستید؟`}</p>
        </GeneralModal>
      </>
    );
  }
};

export default ListCustomer;
