import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIsMobile } from "../../utils/hooks";
import Button from "../Button";
import type {
  InGameAction,
  InGameEvent,
  InGameRule,
  CardID,
} from "../GameContainer/types";

import styles from "./Card.module.scss";

export interface CardProps {
  isPause: boolean;
  event: InGameAction;
  onIsDone?: (id: CardID) => void;
  isInit?: boolean;
  isPopOver?: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const Card = ({ isPause, event, onIsDone, isInit }: CardProps) => {
  const [sec, setSec] = useState(0);

  const [progress, setProgress] = useState(0);

  const isMobile = useIsMobile();

  // start our card internal timer if is a temporary event
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | false = false;

    // if we are in pause, we do not want the interval to work
    if (
      !isPause &&
      event.type === "event" &&
      event.timing === "Temporary Event"
    ) {
      interval = setInterval(
        () =>
          setSec((sec) => {
            let next = sec + 1;
            return next;
          }),
        1000
      );
    }
    return () => interval && clearInterval(interval);
  }, [event, isPause]);

  useEffect(() => {
    if (event.type === "event") {
      // total time in sec
      const totalTime = event.timingDetails * 60;

      let value = (sec / totalTime) * 100;

      setProgress(value);
    }
  }, [sec, event]);

  useEffect(() => {
    if (event.type === "event" && event.timing === "Temporary Event") {
      if (progress >= 100) {
        onIsDone(event.id);
      }
    }
  }, [event, progress, onIsDone]);

  return (
    <div
      className={clsx(
        styles.Card,
        event.type === "event" && styles.isEvent,
        event.type === "rule" && styles.isRule,
        event.type === "event" &&
          event.timing === "Temporary Event" &&
          styles.typeTemporary,
        event.type === "event" &&
          event.timing === "Until barbarian ship" &&
          styles.typeBarbarianShip,
        event.type === "event" &&
          event.timing === "One time event" &&
          styles.typeOneTime,
        isInit && styles.isInit
      )}
    >
      <div className={styles.Icon}>
        {/* @ts-ignore */}
        <FontAwesomeIcon className={styles.CardIcon} icon={event.icon} />
      </div>
      <div className={styles.Title}>{event.name}</div>
      <div className={styles.Description}>{event.description}</div>

      {!isInit && event.type === "event" && (
        <div className={styles.Controls}>
          {event.timing === "One time event" && (
            <Button
              className={styles.DoneButton}
              onClick={() => onIsDone(event.id)}
              isSmall
            >
              Close
            </Button>
          )}
          {event.timing === "Until barbarian ship" && (
            <>
              {/* @ts-ignore */}
              <FontAwesomeIcon
                className={styles.BarbarianShipIcon}
                icon="sailboat"
              />
            </>
          )}
          {event.timing === "Temporary Event" && (
            <div className={styles.ControlsProgress}>
              <progress value={progress} max={100} />
              <label>
                {Math.round((1 - progress / 100) * event.timingDetails)}min
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
