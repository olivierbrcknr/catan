import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

// import { useIsMobile } from "../../utils/hooks";
import type { InGameCard, CardID } from "../../game/types";
import { printLabel, type Language } from "../../utils/language";

import ProgressBar from "../ProgressBar";

import styles from "./Card.module.scss";

export interface CardProps {
  isPause: boolean;
  event: InGameCard;
  onIsDone?: (id: CardID) => void;
  isInit?: boolean;
  isPopOver?: boolean;
  language: Language;
}

const Card = ({ isPause, event, onIsDone, isInit, language }: CardProps) => {
  const [sec, setSec] = useState(0);

  const [progress, setProgress] = useState(0);

  // const isMobile = useIsMobile();

  // start our card internal timer if is a temporary event
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | false = false;

    // if we are in pause, we do not want the interval to work
    if (!isPause && event.timing === "Temporary Event") {
      interval = setInterval(
        () =>
          setSec((sec) => {
            const next = sec + 1;
            return next;
          }),
        1000
      );
    }
    return () => interval && clearInterval(interval);
  }, [event, isPause]);

  useEffect(() => {
    if (event.timing === "Temporary Event") {
      // total time in sec
      const totalTime = event.timingDetails * 60;
      const value = (sec / totalTime) * 100;
      setProgress(value);
    }
  }, [sec, event]);

  useEffect(() => {
    if (event.timing === "Temporary Event") {
      if (progress >= 100) {
        onIsDone(event.id);
      }
    }
  }, [event, progress, onIsDone]);

  let timeRemaining: number;
  let timeRemainingLabel: string;

  if (event?.timing === "Temporary Event") {
    timeRemaining = (1 - progress / 100) * event.timingDetails;

    if (timeRemaining < 1) {
      timeRemainingLabel = Math.round(timeRemaining * 60) + "\u2009sec";
    } else {
      timeRemainingLabel = Math.round(timeRemaining) + "\u2009min";
    }
  }

  return (
    <div
      className={clsx(
        styles.Card,
        event.timing === "Permanent Rule" && styles.typeRule,
        event.timing === "Temporary Event" && styles.typeTemporary,
        event.timing === "Until barbarian ship" && styles.typeBarbarianShip,
        event.timing === "One time event" && styles.typeOneTime,
        isInit && styles.isInit
      )}
    >
      <div className={styles.Header}>
        <div className={styles.Icon}>
          {/* @ts-ignore */}
          <FontAwesomeIcon className={styles.CardIcon} icon={event.icon} />
        </div>
        <div className={styles.Title}>{event.name[language]}</div>
      </div>
      <div className={styles.Description}>{event.description[language]}</div>

      {event.timing === "Permanent Rule" && (
        <div className={styles.Footer}>
          <div className={styles.FooterLine} />
          <div className={styles.FooterLabel}>
            {printLabel("TypeRule", language)}
          </div>
          <div className={styles.FooterLine} />
        </div>
      )}
      {event.timing === "One time event" && (
        <div className={styles.Footer}>
          <div className={styles.FooterLine} />
          <div className={styles.FooterLabel}>
            {printLabel("TypeEvent", language)}
          </div>
          <div className={styles.FooterLine} />
        </div>
      )}
      {event.timing === "Until barbarian ship" && (
        <div className={styles.Footer}>
          <div className={styles.FooterLine} />
          <div className={styles.FooterLabel}>
            {printLabel("TypeShip", language)}
          </div>
          <div className={styles.FooterLine} />
        </div>
      )}
      {event.timing === "Temporary Event" && (
        <div className={styles.Footer}>
          <ProgressBar value={progress} max={100} label={timeRemainingLabel} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
