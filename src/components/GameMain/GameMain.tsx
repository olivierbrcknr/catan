import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../Card";
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

import { useGameChange } from "./game";
import GameControls from "./GameControls";
import GameEventPopover from "./GameEventPopover";
import GameWinnerPopover from "./GameWinnerPopover";

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
    resetGame,
    spawnCard,
  } = useGameChange(filteredData, gameSettings);

  const [winner, setWinner] = useState<Player | undefined>();

  useEffect(() => {
    players.forEach((p) => {
      if (p.points >= gameSettings.maxPointsNeeded) {
        setIsPause(true);
        setWinner(p);
      }
    });
  }, [players, gameSettings.maxPointsNeeded, setIsPause]);

  const handleCancelGame = () => {
    resetGame();
    onClickCancelGame();
  };

  return (
    <div className={styles.GameMain}>
      <div className={styles.Events}>
        {gameData?.events.map((ev, i) => (
          <Card
            isPause={isPause}
            key={`Event-${i}`}
            event={ev}
            onIsDone={setEventIsDone}
          />
        ))}
      </div>

      <div className={styles.Rules}>
        {gameData?.rules.map((rul, i) => (
          <Card isPause={isPause} key={`Rule-${i}`} event={rul} />
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
          onClickCancelGame={handleCancelGame}
          players={players}
          setPlayers={setPlayers}
          maxPoints={gameSettings.maxPointsNeeded}
          onClickSpawnCard={spawnCard}
        />
      </div>

      {isPause && !gameData.newEvent && (
        <div className={styles.IsPauseIndicator}>
          <FontAwesomeIcon
            className={styles.IsPauseIndicator_Icon}
            icon="pause"
          />
        </div>
      )}

      {gameData.newEvent && (
        <div className={styles.NewEventContainer}>
          <GameEventPopover
            onClickContinue={setEventIsRead}
            newEvent={gameData.newEvent}
          />
        </div>
      )}

      {winner && (
        <div className={styles.WinnerContainer}>
          <GameWinnerPopover onDone={handleCancelGame} winner={winner} />
        </div>
      )}
    </div>
  );
};

export default GameMain;
