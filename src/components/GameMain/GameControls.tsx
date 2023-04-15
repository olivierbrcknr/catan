import React, { useState, useEffect } from "react";

import type { Player } from "../GameContainer/types";
import GamePlayerDisplay from "../GamePlayerDisplay";

import styles from "./GameControls.module.scss";

export interface GameControlsProps {
  onClickCancelGame: () => void;
  players: Player[];
}

const isDev = process.env.NODE_ENV === "development";

const GameControls = ({ onClickCancelGame, players }: GameControlsProps) => {
  return (
    <div className={styles.GameControls}>
      <div className={styles.playpause}>Play/Pause</div>
      <div className={styles.players}>
        <GamePlayerDisplay players={players} />
      </div>
      <div className={styles.settings}>settings</div>
    </div>
  );
};

export default GameControls;
