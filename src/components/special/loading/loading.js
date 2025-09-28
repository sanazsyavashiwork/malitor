import React, { Fragment } from "react";
import styles from "./loading-spinner.module.scss";

const Loading = () => {
  return (
    <Fragment>
      <div className={styles["loader-wrapper"]}>
        <div className={`${styles["row"]}  ${styles["loader-text"]}`}>
          <div className={styles["col-12"]}>
            {/* دایره چرخان معمولی */}
            <div className={styles.loadingSpinner}></div>

            {/* یا دایره چرخان بزرگ */}
            {/* <div className={`${styles.loadingSpinner} ${styles.large}`}></div> */}

            {/* یا نقاط لودینگ */}
            {/* <div className={styles.loadingDots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div> */}

            {/* یا loading bar */}
            {/* <div className={styles.loadingBar}></div> */}

            {/* یا دایره نابض */}
            <div className={styles.pulsingCircle}></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
