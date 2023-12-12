import React from "react";

import * as RadixProgress from "@radix-ui/react-progress";
import clsx from "clsx";

import styles from "./ProgressBar.module.scss";

export type ProgressBarTheme =
  | "default"
  | "green"
  | "blue"
  | "purple"
  | "orange";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  theme?: ProgressBarTheme;
}

const ProgressBar = ({
  value,
  max = 100,
  label,
  theme = "default",
}: ProgressBarProps) => {
  const percent = (100 / max) * value;

  return (
    <div className={clsx(styles.ProgressBar, styles[`Theme--${theme}`])}>
      <RadixProgress.Root className={styles.Progress} value={value} max={max}>
        <RadixProgress.Indicator
          className={styles.ProgressIndicator}
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
      </RadixProgress.Root>

      {label && <label>{label}</label>}
    </div>
  );
};
export default ProgressBar;
