import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { Player } from "../GameContainer/types";

import SinglePlayerDisplay from "./SinglePlayerDisplay";

import styles from "./GamePlayerDisplay.module.scss";

export interface GamePlayerDisplayProps {
  players: Player[];
  setPlayers: (v: Player[]) => void;
}

const GamePlayerDisplay = ({ players, setPlayers }: GamePlayerDisplayProps) => {
  const onSinglePlayerChangePoints = (
    player: Player,
    index: number,
    value: number
  ) => {
    let allPlayers = players;
    allPlayers[index] = {
      ...player,
      points: value,
    };
    setPlayers([...allPlayers]);
  };

  return (
    <div className={styles.GamePlayerDisplay}>
      {players.map((p, i) => (
        <SinglePlayerDisplay
          onChangePoints={(v) => onSinglePlayerChangePoints(p, i, v)}
          key={`Player-${p.color}`}
          player={p}
        />
      ))}
    </div>
  );
};
export default GamePlayerDisplay;
