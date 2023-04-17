import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  isSmall?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  children,
  disabled,
  isSmall,
  className,
}: ButtonProps) => {
  return (
    <button
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
export default Button;
