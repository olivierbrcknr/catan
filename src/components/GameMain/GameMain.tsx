import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { printLabel, type Language } from "../../utils/language";
import Card from "../Card";
import type {
  Player,
  GameSettings,
  AirtableData,
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
  language: Language;
}

const GameMain = ({
  onClickCancelGame,
  players,
  setPlayers,
  gameSettings,
  filteredData,
  hasShipExtension,
  language,
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
    sec,
  } = useGameChange(filteredData, gameSettings);

  const [winner, setWinner] = useState<Player | undefined>();

  useEffect(() => {
    const togglePause = (evt) => {
      if (evt.keyCode === 32) {
        setIsPause(!isPause);
      }
    };

    document.addEventListener("keydown", togglePause);

    return () => {
      document.removeEventListener("keydown", togglePause);
    };
  }, [isPause, setIsPause]);

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

  const minutes = Math.floor(sec / 60);
  const hours = Math.floor(minutes / 60);
  const minutesRemaining = minutes - hours * 60;

  return (
    <div className={styles.GameMain}>
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <div className={clsx(styles.Stats)}>
            <label>{printLabel("PlayTime", language)}</label>
            {hours}:{minutesRemaining < 10 && "0"}
            {minutesRemaining}
          </div>
        </div>

        <div className={styles.Events}>
          {gameData?.cards.map((card, i) => (
            <Card
              isPause={isPause}
              key={`Card-${card.id}`}
              event={card}
              onIsDone={setEventIsDone}
              language={language}
            />
          ))}
        </div>

        {isPause && !gameData.newEvent && (
          <div className={clsx(styles.Overlay, styles.IsPauseIndicator)}>
            <FontAwesomeIcon
              className={styles.IsPauseIndicator_Icon}
              icon="pause"
            />
          </div>
        )}

        {gameData.newEvent && (
          <div
            className={clsx(
              styles.NewEventContainer,
              styles.Overlay,
              gameData.newEvent.timing === "Permanent Rule" && styles.typeRule,
              gameData.newEvent.timing === "Temporary Event" &&
                styles.typeTemporary,
              gameData.newEvent.timing === "Until barbarian ship" &&
                styles.typeBarbarianShip,
              gameData.newEvent.timing === "One time event" &&
                styles.typeOneTime
            )}
          >
            <GameEventPopover
              onClickContinue={setEventIsRead}
              newEvent={gameData.newEvent}
              language={language}
            />
          </div>
        )}
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
          isNewEvent={gameData.newEvent ? true : false}
          language={language}
        />
      </div>

      {winner && (
        <div className={styles.WinnerContainer}>
          <GameWinnerPopover
            onDone={handleCancelGame}
            winner={winner}
            language={language}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(GameMain);
