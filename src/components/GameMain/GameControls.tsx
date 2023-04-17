import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button";
import type { Player } from "../GameContainer/types";

import SinglePlayerDisplay from "./SinglePlayerDisplay";

import styles from "./GameControls.module.scss";

export interface GameControlsProps {
  onClickCancelGame: () => void;
  players: Player[];
  setPlayers: (v: Player[]) => void;
  isPause: boolean;
  onTogglePause: () => void;
  onBarbarianShipArrived: () => void;
  hasShipExtension: boolean;
  maxPoints: number;
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
  maxPoints,
}: GameControlsProps) => {
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
    <div className={styles.GameControls}>
      <div className={styles.playpause}>
        <div className={styles.Button_Play}>
          <Button onClick={onTogglePause}>
            {isPause ? (
              <>
                <FontAwesomeIcon className={styles.Button_Icon} icon="play" />
                <span className={styles.Button_Text}>Play</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon className={styles.Button_Icon} icon="pause" />
                <span className={styles.Button_Text}>Pause</span>
              </>
            )}
          </Button>
        </div>

        {hasShipExtension && (
          <Button onClick={onBarbarianShipArrived}>
            <>
              <FontAwesomeIcon className={styles.Button_Icon} icon="sailboat" />
              <span className={styles.Button_Text}>Ship</span>
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
        <Button
          className={styles.ExitButton}
          isSmall
          onClick={onClickCancelGame}
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
