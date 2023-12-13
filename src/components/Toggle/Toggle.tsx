import React from "react";

import * as RadixToggle from "@radix-ui/react-toggle";
import clsx from "clsx";

import styles from "./Toggle.module.scss";

interface ToggleProps {
  onChange: (_v: boolean) => void;
  value: boolean;
  disabled?: boolean;
}

const Toggle = ({ onChange, value, disabled = false }: ToggleProps) => {
  return (
    <RadixToggle.Root
      onPressedChange={onChange}
      pressed={value}
      className={clsx(
        styles.Toggle,
        value && styles.isPressed,
        disabled && styles.isDisabled
      )}
      disabled={disabled}
    >
      <div className={styles.Knob} />
    </RadixToggle.Root>
  );
};
export default Toggle;
