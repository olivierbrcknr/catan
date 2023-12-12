import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

// import { useIsMobile } from "../../utils/hooks";
import type { SetupCard as SetupCardType } from "../../game/types";
import { type Labels, type Language, printLabel } from "../../utils/language";
import ProgressBar, { ProgressBarTheme } from "../ProgressBar";

import styles from "./SetupCard.module.scss";

export interface SetupCardProps {
  card: SetupCardType;
  language: Language;
  isUsed: boolean;
}

const SetupCard = ({ card, language, isUsed }: SetupCardProps) => {
  let label: Labels;
  let theme: ProgressBarTheme;

  switch (card.timing) {
    case "Permanent Rule":
      label = "TypeRule";
      theme = "blue";
      break;
    case "One time event":
      label = "TypeEvent";
      theme = "purple";
      break;
    case "Until barbarian ship":
      label = "TypeShip";
      theme = "orange";
      break;
    case "Temporary Event":
      label = "TypeTemporary";
      theme = "green";
      break;
  }

  return (
    <div
      className={clsx(
        styles.SetupCard,
        card.timing === "Permanent Rule" && styles.typeRule,
        card.timing === "Temporary Event" && styles.typeTemporary,
        card.timing === "Until barbarian ship" && styles.typeBarbarianShip,
        card.timing === "One time event" && styles.typeOneTime,
        !isUsed && styles.isNotUsed
      )}
    >
      <div className={styles.Header}>
        <div className={styles.Icon}>
          {/* @ts-ignore */}
          <FontAwesomeIcon className={styles.CardIcon} icon={card.icon} />
        </div>
        <div className={styles.Title}>{card.name[language]}</div>
      </div>
      <div className={styles.Description}>{card.description[language]}</div>

      <div className={styles.Stats}>
        <h4>{printLabel("Evilness", language)}</h4>
        <ProgressBar
          value={card.stats.evil}
          label={card.stats.evil.toString()}
          max={10}
          theme={theme}
        />

        <h4>{printLabel("Funkiness", language)}</h4>
        <ProgressBar
          value={card.stats.funk}
          label={card.stats.funk.toString()}
          max={10}
          theme={theme}
        />

        <h4>{printLabel("Probability", language)}</h4>
        <ProgressBar
          value={card.stats.probability}
          label={card.stats.probability.toString()}
          max={10}
          theme={theme}
        />
      </div>

      <div className={styles.Footer}>
        <div className={styles.FooterLine} />
        <div className={styles.FooterLabel}>{printLabel(label, language)}</div>
        <div className={styles.FooterLine} />
      </div>
    </div>
  );
};

export default React.memo(SetupCard);
