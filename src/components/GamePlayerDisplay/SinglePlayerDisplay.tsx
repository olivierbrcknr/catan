import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { Player } from "../GameContainer/types";

import styles from "./SinglePlayerDisplay.module.scss";

export interface SinglePlayerDisplayProps {
  player: Player;
}

const SinglePlayerDisplay = ({ player }: SinglePlayerDisplayProps) => {
  if (!player.isActive) return null;

  return (
    <div className={clsx(styles.SinglePlayerDisplay, `color-${player.color}`)}>
      {player.name}
    </div>
  );
};
export default SinglePlayerDisplay;
