import React, { useState, useEffect, useRef } from "react";

import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  isSmall?: boolean;
  className?: string;
  defaultFocus?: boolean;
}

const Button = ({
  onClick,
  children,
  disabled,
  isSmall,
  className,
  defaultFocus = false,
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current && defaultFocus) {
      ref.current.focus();
    }
  }, [defaultFocus, ref]);

  return (
    <button
      ref={ref}
      onClick={disabled ? null : onClick}
      className={clsx(
        styles.Button,
        disabled && styles.isDisabled,
        isSmall && styles.isSmall,
        className
      )}
    >
      {children}
    </button>
  );
};
export default React.memo(Button);
