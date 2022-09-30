import React from "react";
import cn from "classnames";

import styles from "./Switch.module.scss";

type Props = {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  reversed?: boolean;
  fullWidth?: boolean;
  onChange(value: boolean): void;
};

function Switch({
  checked,
  label,
  disabled = false,
  reversed,
  fullWidth,
  onChange
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return (
    <label
      className={cn(styles.root, {
        [styles.reversed]: reversed,
        [styles.fullWidth]: fullWidth
      })}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={styles.switch} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export { Switch };