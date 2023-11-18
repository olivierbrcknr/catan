import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIsMobile } from "../../utils/hooks";
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
import TabSelect from "../TabSelect";

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
  const [mobileViewSelect, setMobileViewSelect] = useState<"events" | "rules">(
    "events"
  );

  const isMobile = useIsMobile();

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
      <div className={styles.Header}>
        <div className={clsx(styles.Stats)}>
          <label>Time Running</label>
          {hours}:{minutesRemaining < 10 && "0"}
          {minutesRemaining}
        </div>
      </div>

      <div className={styles.Events}>
        {gameData?.rules.map((rul, i) => (
          <Card isPause={isPause} key={`Rule-${rul.id}`} event={rul} />
        ))}
        {gameData?.events.map((ev, i) => (
          <Card
            isPause={isPause}
            key={`Event-${ev.id}`}
            event={ev}
            onIsDone={setEventIsDone}
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
            gameData.newEvent.type === "rule" && styles.typeRule,
            gameData.newEvent.type === "event" &&
              gameData.newEvent.timing === "Temporary Event" &&
              styles.typeTemporary,
            gameData.newEvent.type === "event" &&
              gameData.newEvent.timing === "Until barbarian ship" &&
              styles.typeBarbarianShip,
            gameData.newEvent.type === "event" &&
              gameData.newEvent.timing === "One time event" &&
              styles.typeOneTime
          )}
        >
          <GameEventPopover
            onClickContinue={setEventIsRead}
            newEvent={gameData.newEvent}
          />
        </div>
      )}

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
        />
      </div>

      {winner && (
        <div className={styles.WinnerContainer}>
          <GameWinnerPopover onDone={handleCancelGame} winner={winner} />
        </div>
      )}
    </div>
  );
};

export default React.memo(GameMain);
