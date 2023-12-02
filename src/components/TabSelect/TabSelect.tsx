import React, { useState, useEffect } from "react";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./TabSelect.module.scss";

interface TabSelectProps {
  onChange: (v: string | number) => void;
  options: { label: string; value: string | number }[];
  value: string | number;
  name: string;
}

const TabSelect = ({ onChange, options, value, name }: TabSelectProps) => {
  return (
    <RadixRadioGroup.Root
      className={styles.TabSelect}
      aria-label={name}
      onValueChange={(v) => {
        const corredtedVal = typeof value === "number" ? parseInt(v) : v;
        onChange(corredtedVal);
      }}
      value={typeof value === "number" ? value.toString() : value}
    >
      {options.map((tab, i) => (
        <RadixRadioGroup.Item
          className={clsx(styles.Tab, value === tab.value && styles.isSelected)}
          value={
            typeof tab.value === "number" ? tab.value.toString() : tab.value
          }
          key={`${name}-opt-${i}`}
          id={`${name}-opt-${i}`}
        >
          {/*<label className={styles.Label} htmlFor={`${name}-opt-${i}`}>*/}
          {tab.label}
          {/*</label>*/}
        </RadixRadioGroup.Item>
      ))}
    </RadixRadioGroup.Root>
  );
};
export default TabSelect;
