import React, { useState, useMemo, useEffect } from "react";
import { Search } from "react-feather";
import GeneralTable from "@/components/general/GeneralTable/GeneralTable";
import styles from "./ListMember.module.scss";

// Constants
import { TABLE_HEADERS } from "./constants/tableHeader";
import { renderHeader } from "./renderParts/renderHeader";
import { ROUTES } from "@/constValues/Routes";
import { Plus } from "react-feather";
import { convertApiObjectToTableRow, TruncatedText } from "./utils";
import { useGetStuffIdsQuery } from "@/hooks/Stuff-ids/useGetStuffIdsQuery";
import Loading from "../../loading/loading";
import { usePostTaxPayersIDStuffQuery } from "@/hooks/Tax-payers/usePostTaxPayersIDStuffQuery";
import { useToast } from "@/hooks/useToast2";

const ListStuff = () => {
  // State management
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { stuffList, isLoadingStuffList, refetch } = useGetStuffIdsQuery({});
  const { mutate, isPending } = usePostTaxPayersIDStuffQuery({});
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    if (
      !isLoadingStuffList &&
      stuffList?.data &&
      Array.isArray(stuffList.data)
    ) {
      setMembers(convertApiObjectToTableRow(stuffList.data));
    }
  }, [isLoadingStuffList, stuffList]);

  const customRenderers = {
    // رندر کردن ستون "شخص حقوقی"
    "نام کالا یا خدمات": (item, rowIndex, cellValue) => {
      return <TruncatedText text={item["نام کالا یا خدمات"]} maxLength={20} />;
    },
  };

  // Memoized filtered data
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;

    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member["شناسه کالا یا خدمات"].includes(searchTerm) ||
        member["نام کالا یا خدمات"].includes(searchTerm) ||
        member["نوع"].includes(searchTerm)
      );
    });
  }, [members, searchTerm]);

  // Event handlers
  const handleEdit = (member, index) => {
    window.location.href = `${ROUTES.PRIVATE.MOVADIAN_EDIT}/${member.id}`;
  };

  const handleDelete = (member, index) => {
    const confirmDelete = window.confirm(
      `آیا از حذف ${member.نام} مطمئن هستید؟`
    );

    if (confirmDelete) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
      alert(`${member.نام} حذف شد`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultActions = [
    {
      label: "افزودن",
      icon: <Plus size={14} className="action-icon action-icon--edit" />,
      onClick: (item, index) => {
        console.log(item.id);
        mutate(
          {
            data: {},
            stuffId: item.id,
          },
          {
            onSuccess: (data) => {
              successToast("با موفقیت به لیست کالا افزوده شد");
            },
            onSettled: () => {
              setSubmitting(false);
            },
            onError: (error) => {
              handleError(error);
              errorToast("افزودن با خطا روبرو شد ");
            },
          }
        );
      },
    },
  ];
  const renderSearchSection = () => (
    <div className={styles.filterSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="جستجو بر اساس شناسه کالا یا خدمات یا نام کالا و خدمات  ..."
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
        customRenderers={customRenderers}
      />
      {filteredMembers.length === 0 && renderEmptyState()}
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📋</div>
      <h3>هیچ موردی یافت نشد</h3>
      <p>
        برای نمایش نتایج، فیلترها را تغییر دهید یا شناسه کالا یا خدمات جدید
        اضافه کنید
      </p>
    </div>
  );
  if (isLoadingStuffList) {
    return <Loading />;
  } else {
    return (
      <div className={styles.memberListContainer} dir="rtl">
        {renderHeader()}
        {renderSearchSection()}
        {renderTable()}
      </div>
    );
  }
};

export default ListStuff;
