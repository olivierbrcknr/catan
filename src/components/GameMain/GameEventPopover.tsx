import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button";
import Card from "../Card";
import type {
  InGameEvent,
  InGameRule,
  InGameAction,
} from "../GameContainer/types";

import styles from "./GameEventPopover.module.scss";

export interface GameEventPopoverProps {
  newEvent: InGameAction;
  onClickContinue: () => void;
}

const isDev = process.env.NODE_ENV === "development";

const GameEventPopover = ({
  newEvent,
  onClickContinue,
}: GameEventPopoverProps) => {
  useEffect(() => {
    const audio = new Audio("/sound.wav");
    audio.play();
  }, []);

  return (
    <div className={styles.GameEventPopover}>
      <div className={styles.CardContainer}>
        <Card isInit isPause event={newEvent} />
      </div>
      <Button onClick={onClickContinue}>Continue</Button>
    </div>
  );
};

export default GameEventPopover;
