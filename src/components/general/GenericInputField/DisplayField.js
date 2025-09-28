import React from 'react';
import styles from './fields.css';
import { FormLabel } from './FormLable/FormLabel';

export const DisplayField = ({
  label,
  value,
  name,

  className = '',
  twoItemInOneRow = false,

  // استایل‌بندی
  valueStyle = {},
  valueClassName = '',

  // فرمت‌بندی
  formatValue = null, // تابع برای فرمت کردن مقدار
  prefix = '', // پیشوند
  suffix = '', // پسوند

  // حالت‌های خاص
  isLoading = false,
  placeholder = '---', // وقتی مقدار خالی باشه

  ...props
}) => {
  const containerClassName = `form-group ${twoItemInOneRow ? styles['two-in-one-row'] : ''} ${className}`;

  // فرمت کردن مقدار
  const getDisplayValue = () => {
    // اگه لودینگ باشه
    if (isLoading) {
      return <span className='loading-dots'>در حال بارگذاری...</span>;
    }

    // اگه تابع فرمت داشته باشیم
    let displayValue = formatValue ? formatValue(value) : value;

    // اضافه کردن پیشوند و پسوند
    if (prefix) displayValue = prefix + displayValue;
    if (suffix) displayValue = displayValue + suffix;

    return displayValue;
  };

  return (
    <div className={containerClassName} {...props} style={{ ...props.style, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
      {label && <FormLabel name={name} label={label} />}

      <div className={`display-value ${valueClassName}`} style={{ ...valueStyle, display: 'flex', alignItems: 'baseline' }}>
        {getDisplayValue()}
      </div>
    </div>
  );
};
