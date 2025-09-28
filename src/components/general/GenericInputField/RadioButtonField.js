import { Field } from 'formik';
import ErrorShow from './ErrorShow';
import styles from './fields.css';
import { FormLabel } from './FormLable/FormLabel';
import React from 'react';

export const RadioButtonField = ({
  name,
  label,
  options = [], // [{value: 'male', label: 'مرد'}, {value: 'female', label: 'زن'}]

  errors = {},
  touched = {},
  isCol = false,
  className = '',
  twoItemInOneRow = false,
  direction = 'horizontal', // 'horizontal' | 'vertical'

  isDisabled = false,
  ...fieldProps
}) => {
  const hasError = errors[name] && touched[name];

  const containerClassName = `form-group ${twoItemInOneRow ? styles['two-in-one-row'] : ''}`;
  const radioGroupClassName = `radio-group ${direction === 'horizontal' ? 'radio-horizontal' : 'radio-vertical'} ${className} ${isCol ? 'col' : 'row'}`;

  return (
    <div className={containerClassName}>
      <FormLabel name={name} label={label} />

      <Field name={name}>
        {({ field }) => (
          <div className={radioGroupClassName} dir='rtl'>
            {options.map((option, index) => {
              const isChecked = field.value === option.value;
              const radioId = `${name}_${option.value}_${index}`;

              return (
                <div key={option.value || index} className={`radio-item ${direction === 'horizontal' ? 'radio-item-horizontal' : 'radio-item-vertical'}`}>
                  <input
                    type='radio'
                    id={radioId}
                    name={field.name}
                    value={option.value}
                    checked={isChecked}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={isDisabled}
                    className={`radio-input ${hasError ? 'is-invalid' : ''}`}
                  />
                  <label htmlFor={radioId} className={`radio-label  ${isDisabled ? 'disabled' : ''}`}>
                    <span className='radio-custom'></span>
                    <span className='radio-text'>{option.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </Field>

      <ErrorShow errors={errors} touched={touched} name={name} />
    </div>
  );
};
