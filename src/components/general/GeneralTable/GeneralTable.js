import React, { useState, useMemo } from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import "./GeneralTable.scss";
import ActionMenu from "./ActionMenu";

const GeneralTable = ({
  headers,
  items,
  onEdit,
  onDelete,
  shouldHandleInsideTable = false,
  // پراپ‌های جدید برای پجینیشن
  pagination = true,
  itemsPerPage = 5,
  showPageSize = true,
  pageSizeOptions = [5, 10, 20, 50],
  actions = null,
  // پراپ جدید برای رندرکردن سفارشی ستون‌ها
  customRenderers = {},
  hasAction = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  // اکشن‌های پیش‌فرض
  const defaultActions = [
    {
      label: "ویرایش",
      icon: <Edit size={14} className="action-icon action-icon--edit" />,
      onClick: (item, index) => onEdit && onEdit(item, index),
    },
    {
      label: "حذف",
      icon: <Trash2 size={14} className="action-icon action-icon--delete" />,
      onClick: (item, index) => onDelete && onDelete(item, index),
    },
  ];

  // محاسبه داده‌های صفحه فعلی
  const paginatedData = useMemo(() => {
    if (!pagination) return items;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items?.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize, pagination]);

  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(items?.length / pageSize);

  // تولید آرایه شماره صفحات برای نمایش
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // تنظیم مجدد startPage اگر endPage به حد maximum رسید
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // تغییر صفحه
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // تغییر تعداد آیتم‌های هر صفحه
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // بازگشت به صفحه اول
  };

  // فانکشن رندر سل سفارشی
  const renderCell = (item, header, rowIndex) => {
    // اگر برای این header رندر سفارشی تعریف شده باشد
    if (customRenderers[header]) {
      return customRenderers[header](item, rowIndex, item[header]);
    }

    // در غیر این صورت نمایش معمولی
    return item[header] || "-";
  };

  // محاسبه اطلاعات نمایشی
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, items?.length);

  return (
    <div className="general-table">
      <table className="general-table__table">
        <thead className="general-table__header">
          <tr>
            {headers?.map((header, index) => (
              <th key={index} className="general-table__th">
                {header}
              </th>
            ))}
            {hasAction && (
              <th className="general-table__th general-table__th--actions">
                عملیات
              </th>
            )}
          </tr>
        </thead>

        <tbody className="general-table__body">
          {paginatedData?.map((item, rowIndex) => (
            <tr key={rowIndex} className="general-table__row">
              {headers?.map((header, colIndex) => (
                <td key={colIndex} className="general-table__td">
                  {renderCell(item, header, rowIndex)}
                </td>
              ))}

              {hasAction && (
                <td className="general-table__td general-table__td--actions">
                  <ActionMenu
                    actions={actions ?? defaultActions}
                    item={item}
                    rowIndex={rowIndex}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!!shouldHandleInsideTable && items?.length === 0 && (
        <div className="general-table__empty">
          هیچ داده‌ای برای نمایش وجود ندارد
        </div>
      )}

      {/* پجینیشن */}
      {pagination && items?.length > 0 && (
        <div className="general-table__pagination">
          {/* اطلاعات نمایشی */}
          {/* <div className="pagination__info">
            نمایش {startItem} تا {endItem} از {items.length} مورد
          </div> */}

          <div className="pagination__controls">
            {/* انتخاب تعداد آیتم در هر صفحه */}
            {showPageSize && (
              <div className="pagination__page-size">
                <label htmlFor="page-size">تعداد در صفحه:</label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="pagination__select"
                >
                  {pageSizeOptions?.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* دکمه‌های ناوبری */}
            <div className="pagination__navigation">
              {/* دکمه صفحه قبل */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination__btn pagination__btn--prev"
                title="صفحه قبل"
              >
                <ChevronRight size={16} />
              </button>

              {/* شماره صفحات */}
              <div className="pagination__pages">
                {/* اولین صفحه */}
                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="pagination__btn pagination__btn--page"
                    >
                      1
                    </button>
                    {getPageNumbers()[0] > 2 && (
                      <span className="pagination__dots">...</span>
                    )}
                  </>
                )}

                {/* صفحات قابل مشاهده */}
                {getPageNumbers()?.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination__btn pagination__btn--page ${
                      currentPage === page ? "pagination__btn--active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* آخرین صفحه */}
                {getPageNumbers()[getPageNumbers()?.length - 1] <
                  totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] <
                      totalPages - 1 && (
                      <span className="pagination__dots">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="pagination__btn pagination__btn--page"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* دکمه صفحه بعد */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination__btn pagination__btn--next"
                title="صفحه بعد"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralTable;
