import React, { useState, useMemo, useEffect } from "react";
import { Search } from "react-feather";
import GeneralTable from "@/components/general/GeneralTable/GeneralTable";
import styles from "./ListMember.module.scss";

// Constants
import { TABLE_HEADERS } from "./constants/tableHeader";
import { renderHeader } from "./renderParts/renderHeader";
import { ROUTES } from "@/constValues/Routes";
import Loading from "../../loading/loading";
import { useGetTaxPayersQuery } from "@/hooks/Tax-payers/useGetTaxPayersQuery";
import { convertApiObjectToTableRow } from "./utils";
import BooleanStatus from "./BooleanStatus";
import { useDeleteTaxPayersQuery } from "@/hooks/Tax-payers/useDeleteTaxPayersQuery";
import { useToast } from "@/hooks/useToast2";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import GeneralModal from "@/components/general/GeneralModal/GeneralModal";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Receipt } from "lucide-react";
import { User } from "lucide-react";
import { useGetUsersQuery } from "@/hooks/AuthenticationController/useGetUsresQuery";
import { useDeleteUsersQuery } from "@/hooks/AuthenticationController/useDeleteUsersQuery";

const ListUsers = () => {
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State management
  const { users, isLoadingUsers, refetch } = useGetUsersQuery({});
  const { mutate, isPending } = useDeleteUsersQuery();
  const { successToast, errorToast } = useToast();

  const [members, setMembers] = useState([]);

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
    if (!isLoadingUsers && users?.data && Array.isArray(users.data)) {
      setMembers(convertApiObjectToTableRow(users.data));
    }
  }, [isLoadingUsers, users]);

  const [searchTerm, setSearchTerm] = useState("");

  // Memoized filtered data
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;

    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member.نام.toLowerCase().includes(searchLower) ||
        member["نام خانوادگی"].toLowerCase().includes(searchLower) ||
        member["نام کاربری"].toLowerCase().includes(searchLower) ||
        member["وضعیت"].toLowerCase().includes(searchLower)
        //  ||
        // member["شناسه ملی/مدنی/اتباع"].includes(searchTerm) ||
        // member.تلفن.includes(searchTerm)
      );
    });
  }, [members, searchTerm]);

  // Event handlers
  const handleEdit = (member, index) => {
    window.location.href = `${ROUTES.ADMIN.USER_EDIT}/${member.id}`;
  };

  const handleDelete = (member, index) => {
    setSelectedMemberName(member.نام);
    setSelectedMemberId(member.id);
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultActions = [
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

  const renderSearchSection = () => (
    <div className={styles.filterSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="جستجو بر اساس نام، کدملی  یا تلفن..."
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
      {filteredMembers?.length === 0 && renderEmptyState()}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ کاربری یافت نشد</h3>
      <p>برای نمایش نتایج، فیلترها را تغییر دهید یا کاربر جدید اضافه کنید</p>
    </div>
  );

  if (isLoadingUsers) {
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
          title={"پاک کردن کاربر"}
        >
          <p>{`آیا از حذف ${selectedMemberName} مطمئن هستید؟`}</p>
        </GeneralModal>
      </>
    );
  }
};

export default ListUsers;
