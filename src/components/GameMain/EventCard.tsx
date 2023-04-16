import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import type { InGameEvent, CardID } from "../GameContainer/types";

import styles from "./EventCard.module.scss";

export interface EventCardProps {
  isPause: boolean;
  event: InGameEvent;
  onIsDone?: (id: CardID) => void;
  isInit?: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const EventCard = ({ isPause, event, onIsDone, isInit }: EventCardProps) => {
  const [sec, setSec] = useState(0);

  const [progress, setProgress] = useState(0);

  // start our card internal timer if is a temporary event
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | false = false;

    // if we are in pause, we do not want the interval to work
    if (!isPause && event.timing === "Temporary Event") {
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
  }, [event.timing, isPause]);

  useEffect(() => {
    // total time in sec
    const totalTime = event.timingDetails * 60;

    let value = (sec / totalTime) * 100;

    setProgress(value);
  }, [sec, event.timingDetails]);

  useEffect(() => {
    if (event.timing === "Temporary Event") {
      if (progress >= 100) {
        onIsDone(event.id);
      }
    }
  }, [event, progress, onIsDone]);

  return (
    <div
      className={clsx(
        styles.EventCard,
        event.timing === "Temporary Event" && styles.typeTemporary,
        event.timing === "Until barbarian ship" && styles.typeBarbarianShip,
        event.timing === "One time event" && styles.typeOneTime
      )}
    >
      <div className={styles.Icon}>
        {/* @ts-ignore */}
        <FontAwesomeIcon icon={"fa-" + event.icon} />
      </div>
      <div className={styles.Title}>{event.name}</div>
      <div className={styles.Description}>{event.description}</div>

      {!isInit && (
        <div className={styles.Controls}>
          {event.timing === "One time event" && (
            <button onClick={() => onIsDone(event.id)}>Close</button>
          )}
          {event.timing === "Until barbarian ship" && (
            <>
              {/* @ts-ignore */}
              <FontAwesomeIcon icon="fa-sailboat" />
            </>
          )}
          {event.timing === "Temporary Event" && (
            <>
              {Math.round((1 - progress / 100) * event.timingDetails)}min
              <progress value={progress} max={100} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;
