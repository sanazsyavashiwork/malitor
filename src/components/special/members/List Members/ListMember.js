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
import { useSetMemberCookie } from "@/hooks/useSetMemberCookie";

const ListMember = () => {
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setMemberLength } = useSetMemberCookie();

  // State management
  const { taxPayerList, isLoadingTaxPayerList, refetch } = useGetTaxPayersQuery(
    {}
  );
  const { mutate, isPending } = useDeleteTaxPayersQuery();
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
          setMemberLength(taxPayerList?.data?.length);
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

  // و بعد از اینکه دیتا اومد، state رو آپدیت کن
  useEffect(() => {
    if (
      !isLoadingTaxPayerList &&
      taxPayerList?.data &&
      Array.isArray(taxPayerList.data)
    ) {
      setMembers(convertApiObjectToTableRow(taxPayerList.data));
    }
    setMemberLength(taxPayerList?.data?.length);
  }, [isLoadingTaxPayerList, taxPayerList]);

  const [searchTerm, setSearchTerm] = useState("");

  const customRenderers = {
    "شخص حقوقی": (item, rowIndex, cellValue) => {
      return (
        <BooleanStatus
          value={item["شخص حقوقی"] ?? false}
          showText={false}
          size={16}
          trueColor="#01494b"
        />
      );
    },

    "صحت کلید ها": (item, rowIndex, cellValue) => {
      return (
        <BooleanStatus
          value={item["صحت کلید ها"] ?? true}
          showText={false}
          trueColor="#01494b"
          size={16}
        />
      );
    },
  };
  // Memoized filtered data
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;

    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member.نام.toLowerCase().includes(searchLower) ||
        member["شناسه ملی/مدنی/اتباع"].includes(searchTerm) ||
        member.تلفن.includes(searchTerm) ||
        member["شماره ثبت"].includes(searchTerm)
      );
    });
  }, [members, searchTerm]);

  // Event handlers
  const handleEdit = (member, index) => {
    window.location.href = `${ROUTES.PRIVATE.MOVADIAN_EDIT}/${member.id}`;
  };

  const { setMemberId } = useSetMemberCookie();

  const handleAdd = (member, index) => {
    setMemberId(member.id);
    successToast("مودی با موفقیت انتخاب شد ");
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
      label: "انتخاب مودی",
      icon: <User size={14} className="action-icon action-icon--edit" />,
      onClick: (item, index) => handleAdd(item, index),
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

  const renderSearchSection = () => (
    <div className={styles.filterSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="جستجو بر اساس نام، شناسه یا تلفن..."
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
        customRenderers={customRenderers}
        actions={defaultActions}
      />
      {filteredMembers?.length === 0 && renderEmptyState()}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ موردی یافت نشد</h3>
      <p>برای نمایش نتایج، فیلترها را تغییر دهید یا مودی جدید اضافه کنید</p>
    </div>
  );

  if (isLoadingTaxPayerList) {
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

export default ListMember;
