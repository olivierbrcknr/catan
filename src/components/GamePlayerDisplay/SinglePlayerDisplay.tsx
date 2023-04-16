import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { Player } from "../GameContainer/types";

import styles from "./SinglePlayerDisplay.module.scss";

export interface SinglePlayerDisplayProps {
  player: Player;
  onChangePoints: (v: number) => void;
}

const SinglePlayerDisplay = ({
  player,
  onChangePoints,
}: SinglePlayerDisplayProps) => {
  if (!player.isActive) return null;

  const addPoint = () => {
    onChangePoints(player.points + 1);
  };
  const removePoint = () => {
    onChangePoints(player.points - 1);
  };

  return (
    <div className={clsx(styles.SinglePlayerDisplay, `color-${player.color}`)}>
      {player.name} ({player.points})<button onClick={addPoint}>+</button>
      <button onClick={removePoint}>-</button>
    </div>
  );
};
export default SinglePlayerDisplay;
