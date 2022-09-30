/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import { Switch } from "components";

import styles from "./TakeProfit.module.scss";

type Props = {
  handleChange(boolean: boolean): void;
  checked: boolean;
};

export const TakeProfit = ({ handleChange, checked }: Props) => {
  return (
    <div className={styles.root}>
      <span className={styles.headerTakeProfit}>Take Profit</span>
      <HelpRoundedIcon className={styles.helpIcon} />
      <span className={styles.takeProfitToggleButton}>
        <Switch checked={checked} onChange={handleChange} />
      </span>
    </div>
  );
};
