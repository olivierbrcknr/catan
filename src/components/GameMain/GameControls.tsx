import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { printLabel, type Language } from "../../utils/language";
import Button from "../Button";
import type { Player } from "../GameContainer/types";

import SinglePlayerDisplay from "./SinglePlayerDisplay";

import styles from "./GameControls.module.scss";

export interface GameControlsProps {
  onClickCancelGame: () => void;
  players: Player[];
  setPlayers: (v: Player[]) => void;
  isPause: boolean;
  isNewEvent: boolean;
  onTogglePause: () => void;
  onBarbarianShipArrived: () => void;
  hasShipExtension: boolean;
  maxPoints: number;
  onClickSpawnCard: () => void;
  language: Language;
}

// const isDev = process.env.NODE_ENV === "development";

const GameControls = ({
  onClickCancelGame,
  players,
  setPlayers,
  isPause,
  isNewEvent,
  onTogglePause,
  onBarbarianShipArrived,
  hasShipExtension,
  maxPoints,
  onClickSpawnCard,
  language,
}: GameControlsProps) => {
  const onSinglePlayerChangePoints = (
    player: Player,
    index: number,
    value: number
  ) => {
    const allPlayers = players;
    allPlayers[index] = {
      ...player,
      points: value,
    };
    setPlayers([...allPlayers]);
  };

  return (
    <div className={styles.GameControls}>
      <div className={styles.playpause}>
        <Button disabled={isNewEvent} onClick={onTogglePause}>
          {isPause || isNewEvent ? (
            <>
              <FontAwesomeIcon className={styles.Button_Icon} icon="play" />
              <span className={styles.Button_Text}>
                {printLabel("Play", language)}
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon className={styles.Button_Icon} icon="pause" />
              <span className={styles.Button_Text}>
                {printLabel("Pause", language)}
              </span>
            </>
          )}
        </Button>

        {hasShipExtension && (
          <Button disabled={isPause} onClick={onBarbarianShipArrived}>
            <>
              <FontAwesomeIcon className={styles.Button_Icon} icon="sailboat" />
              <span className={styles.Button_Text}>
                {printLabel("Ship", language)}
              </span>
            </>
          </Button>
        )}
      </div>
      <div className={styles.players}>
        {players.map((p, i) => (
          <SinglePlayerDisplay
            onChangePoints={(v) => onSinglePlayerChangePoints(p, i, v)}
            key={`Player-${p.color}`}
            player={p}
            maxPoints={maxPoints}
          />
        ))}
      </div>
      <div className={styles.settings}>
        <Button isSmall onClick={onClickSpawnCard} disabled={isPause}>
          {printLabel("Spawn Card", language)}
        </Button>
        <Button
          className={styles.ExitButton}
          isSmall
          onClick={onClickCancelGame}
        >
          {printLabel("Exit", language)}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(GameControls);
