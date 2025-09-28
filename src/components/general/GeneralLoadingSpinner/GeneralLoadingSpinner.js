import React from 'react';
import styles from './GeneralLoadingSpinner.module.scss';

const GeneralLoadingSpinner = () => (
  <div className={styles['spinner-wrapper']}>
    <div className={styles['spinner-edit']}></div>
  </div>
);

export default GeneralLoadingSpinner;
