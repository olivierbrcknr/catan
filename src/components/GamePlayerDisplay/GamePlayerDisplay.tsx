import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { Player } from "../GameContainer/types";

import SinglePlayerDisplay from "./SinglePlayerDisplay";

import styles from "./GamePlayerDisplay.module.scss";

export interface GamePlayerDisplayProps {
  players: Player[];
}

const GamePlayerDisplay = ({ players }: GamePlayerDisplayProps) => {
  return (
    <div className={styles.GamePlayerDisplay}>
      {players.map((p) => (
        <SinglePlayerDisplay key={`Player-${p.color}`} player={p} />
      ))}
    </div>
  );
};
export default GamePlayerDisplay;
