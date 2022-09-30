/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import styles from "./AddProfitTarget.module.scss";

type Props = {
  addRow: () => any;
  numberOf: number;
};

export const AddProfitTarget = ({ addRow, numberOf }: Props) => {
  return (
    <div className={styles.root}>
      <AddCircleIcon className={styles.addIcon} onClick={() => addRow()} />
      <span className={styles.addProfitMessage}>
        Add profit target {numberOf} / 5
      </span>
    </div>
  );
};
