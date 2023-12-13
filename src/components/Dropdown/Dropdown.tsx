import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
  onChange: (_v: string) => void;
  options: { label: string; value: string }[];
  value: string;
  name: string;
}

const Dropdown = ({ onChange, options, value, name }: DropdownProps) => {
  const printLabel = options.find((opt) => opt.value === value).label;

  return (
    <div className={styles.Dropdown}>
      <RadixSelect.Root
        aria-label={name}
        onValueChange={onChange}
        value={value}
      >
        <RadixSelect.Trigger className={styles.Trigger}>
          <RadixSelect.Value>{printLabel}</RadixSelect.Value>
          <RadixSelect.Icon className="SelectIcon">
            <FontAwesomeIcon
              className={styles.DropdownIcon}
              icon={"chevron-down"}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={styles.Content}>
            <RadixSelect.ScrollUpButton />
            <RadixSelect.Viewport>
              {options.map((tab, i) => (
                <RadixSelect.Item
                  className={clsx(
                    styles.Item,
                    value === tab.value && styles.isSelected
                  )}
                  value={tab.value}
                  key={`${name}-opt-${i}`}
                  id={`${name}-opt-${i}`}
                >
                  <RadixSelect.ItemIndicator className={styles.SelectIcon}>
                    <FontAwesomeIcon
                      className={styles.CheckIcon}
                      icon={"check"}
                    />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{tab.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton />
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
export default Dropdown;
