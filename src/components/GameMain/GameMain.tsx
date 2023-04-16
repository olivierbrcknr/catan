import React, { useState, useEffect } from "react";

import EventCard from "../EventCard";
import type {
  Player,
  GameSettings,
  CardFilter,
  ExpansionPack,
  AirtableData,
  GameData,
  InGameEvent,
  InGameRule,
  InGameAction,
} from "../GameContainer/types";
import RuleCard from "../RuleCard";

import { useGameChange } from "./game";
import GameControls from "./GameControls";
import GameEventPopover from "./GameEventPopover";

import styles from "./GameMain.module.scss";

export interface GameMainProps {
  onClickCancelGame: () => void;
  players: Player[];
  setPlayers: (v: Player[]) => void;
  gameSettings: GameSettings;
  filteredData: AirtableData;
  hasShipExtension: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const GameMain = ({
  onClickCancelGame,
  players,
  setPlayers,
  gameSettings,
  filteredData,
  hasShipExtension,
}: GameMainProps) => {
  const {
    gameData,
    isPause,
    setIsPause,
    setEventIsRead,
    setEventIsDone,
    setbarbarianShipArrived,
  } = useGameChange(filteredData, gameSettings);

  return (
    <div className={styles.GameMain}>
      <div className={styles.Events}>
        {gameData?.events.map((ev, i) => (
          <EventCard
            isPause={isPause}
            key={`Event-${i}`}
            event={ev}
            onIsDone={setEventIsDone}
          />
        ))}
      </div>

      <div className={styles.Rules}>
        {gameData?.rules.map((rul, i) => (
          <RuleCard key={`Rule-${i}`} rule={rul} />
        ))}
      </div>

      <div className={styles.Controls}>
        <GameControls
          hasShipExtension={hasShipExtension}
          onBarbarianShipArrived={setbarbarianShipArrived}
          isPause={isPause as boolean}
          onTogglePause={() => {
            setIsPause(!isPause);
          }}
          onClickCancelGame={onClickCancelGame}
          players={players}
          setPlayers={setPlayers}
        />
      </div>

      {gameData.newEvent && (
        <div className={styles.NewEventContainer}>
          <GameEventPopover
            onClickContinue={setEventIsRead}
            newEvent={gameData.newEvent}
          />
        </div>
      )}
    </div>
  );
};

export default GameMain;
