import React, { useEffect } from "react";

import Button from "../Button";
import Card from "../Card";
import type { InGameCard } from "../GameContainer/types";

import styles from "./GameEventPopover.module.scss";

export interface GameEventPopoverProps {
  newEvent: InGameCard;
  onClickContinue: () => void;
}

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
      <div className={styles.ButtonWrapper}>
        <Button defaultFocus onClick={onClickContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GameEventPopover;
