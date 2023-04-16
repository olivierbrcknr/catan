import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EventCard from "../EventCard";
import type {
  InGameEvent,
  InGameRule,
  InGameAction,
} from "../GameContainer/types";
import RuleCard from "../RuleCard";

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
  let card: JSX.Element = null;

  if (newEvent.type === "event") {
    card = <EventCard isInit isPause event={newEvent} />;
  }
  if (newEvent.type === "rule") {
    card = <RuleCard rule={newEvent} />;
  }

  return (
    <div className={styles.GameEventPopover}>
      {card}

      <button onClick={onClickContinue}>Continue</button>
    </div>
  );
};

export default GameEventPopover;
