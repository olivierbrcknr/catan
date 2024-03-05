import React from "react";

import * as RadixToggle from "@radix-ui/react-toggle";
import clsx from "clsx";

import styles from "./Toggle.module.scss";

export type ToggleTheme = "default" | "green" | "blue" | "purple" | "orange";

interface ToggleProps {
  onChange: (_v: boolean) => void;
  value: boolean;
  disabled?: boolean;
  theme?: ToggleTheme;
}

const Toggle = ({
  onChange,
  value,
  disabled = false,
  theme = "default",
}: ToggleProps) => {
  return (
    <RadixToggle.Root
      onPressedChange={onChange}
      pressed={value}
      className={clsx(
        styles.Toggle,
        value && styles.isPressed,
        disabled && styles.isDisabled,
        styles[`Theme--${theme}`]
      )}
      disabled={disabled}
    >
      <div className={styles.Knob} />
    </RadixToggle.Root>
  );
};
export default Toggle;
