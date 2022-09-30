import React from "react";
import "./ProjectedProfit.module.scss";
import styles from "./ProjectedProfit.module.scss";

type Props = {
  currency: string;
  projectedProfitNumber: number;
};

export const ProjectedProfit = ({ currency, projectedProfitNumber }: Props) => {
  return (
    <div className={styles.root}>
      <span className={styles.projectedProfitLeftTitle}>Projected profit</span>
      <span className={styles.projectedProfitRightCount}>
        <span className={styles.count}>{projectedProfitNumber}</span>
        <span> {currency}</span>
      </span>
    </div>
  );
};
