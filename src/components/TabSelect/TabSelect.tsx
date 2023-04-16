import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./TabSelect.module.scss";

interface TabSelectProps {
  onChange: (v: number | string) => void;
  options: { label: string; value: number | string }[];
  value: number | string;
}

const TabSelect = ({ onChange, options, value }: TabSelectProps) => {
  return (
    <div className={styles.TabSelect}>
      {options.map((tab, i) => (
        <div
          key={`tab-${tab.label}`}
          className={clsx(styles.Tab, value === tab.value && styles.isSelected)}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};
export default TabSelect;
