import React, { useEffect } from "react";

import type { InGameCard } from "../../game/types";
import { type Language, printLabel } from "../../utils/language";
import Button from "../Button";
import Card from "../Card";

import styles from "./GameEventPopover.module.scss";

export interface GameEventPopoverProps {
  newEvent: InGameCard;
  onClickContinue: () => void;
  language: Language;
}

const GameEventPopover = ({
  newEvent,
  onClickContinue,
  language,
}: GameEventPopoverProps) => {
  useEffect(() => {
    const audio = new Audio("/sound.wav");
    audio.play();
  }, []);

  return (
    <div className={styles.GameEventPopover}>
      <div className={styles.CardContainer}>
        <Card isInit isPause event={newEvent} language={language} />
      </div>
      <div className={styles.ButtonWrapper}>
        <Button defaultFocus onClick={onClickContinue}>
          {printLabel("EventButtonLabel", language)}
        </Button>
      </div>
    </div>
  );
};

export default GameEventPopover;
