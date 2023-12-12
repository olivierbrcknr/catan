import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { type Language, printLabel } from "../../utils/language";

import styles from "./LoadingIndicator.module.scss";

interface LoadingIndicatorProps {
  label?: string;
  language: Language;
}

const LoadingIndicator = ({ language, label }: LoadingIndicatorProps) => {
  const defaultLabel = printLabel("loading", language);

  return (
    <div className={styles.LoadingIndicator}>
      <FontAwesomeIcon className={styles.Icon} icon={"asterisk"} />
      <div className={styles.Label}>{label ?? defaultLabel}</div>
    </div>
  );
};
export default LoadingIndicator;
