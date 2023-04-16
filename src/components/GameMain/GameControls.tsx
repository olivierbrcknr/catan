import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Player } from "../GameContainer/types";
import GamePlayerDisplay from "../GamePlayerDisplay";

import styles from "./GameControls.module.scss";

export interface GameControlsProps {
  onClickCancelGame: () => void;
  players: Player[];
  setPlayers: (v: Player[]) => void;
  isPause: boolean;
  onTogglePause: () => void;
  onBarbarianShipArrived: () => void;
  hasShipExtension: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const GameControls = ({
  onClickCancelGame,
  players,
  setPlayers,
  isPause,
  onTogglePause,
  onBarbarianShipArrived,
  hasShipExtension,
}: GameControlsProps) => {
  return (
    <div className={styles.GameControls}>
      <div className={styles.playpause}>
        <button onClick={onTogglePause}>{isPause ? "Play" : "Pause"}</button>

        {hasShipExtension && (
          <button onClick={onBarbarianShipArrived}>
            {/* @ts-ignore */}
            <FontAwesomeIcon icon="fa-sailboat" />
          </button>
        )}
      </div>
      <div className={styles.players}>
        <GamePlayerDisplay setPlayers={setPlayers} players={players} />
      </div>
      <div className={styles.settings}>
        <button onClick={onClickCancelGame}>Exit</button>
      </div>
    </div>
  );
};

export default GameControls;
