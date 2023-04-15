import React, { useState, useEffect } from "react";

import EventCard from "../EventCard";
import type {
  Player,
  GameSettings,
  CardFilter,
  ExpansionPack,
  AirtableData,
} from "../GameContainer/types";

import GameControls from "./GameControls";

import styles from "./GameMain.module.scss";

export interface GameMainProps {
  onClickCancelGame: () => void;
  players: Player[];
  gameSettings: GameSettings;
  activeData: AirtableData;
}

const isDev = process.env.NODE_ENV === "development";

const GameMain = ({
  onClickCancelGame,
  players,
  gameSettings,
  activeData,
}: GameMainProps) => {
  return (
    <div className={styles.GameMain}>
      <div className={styles.Events}>
        {activeData.events.map((ev, i) => (
          <EventCard key={`Event-${i}`} event={ev} />
        ))}
      </div>
      <div className={styles.Rules}>Rules</div>
      <div className={styles.Controls}>
        <GameControls onClickCancelGame={onClickCancelGame} players={players} />
      </div>
    </div>
  );
};

export default GameMain;
