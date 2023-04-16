import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={clsx(styles.Button, disabled && styles.isDisabled)}
    >
      {children}
    </button>
  );
};
export default Button;
