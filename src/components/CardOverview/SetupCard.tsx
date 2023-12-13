import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

// import { useIsMobile } from "../../utils/hooks";
import { type SetupCard as SetupCardType, expansions } from "../../game";
import { type Labels, type Language, printLabel } from "../../utils/language";
import ProgressBar, { ProgressBarTheme } from "../ProgressBar";
import TooltipLabel from "../TooltipLabel";

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
      {card.stats.expansionPacks && (
        <div className={styles.ExpansionPackContainer}>
          {card.stats.expansionPacks?.map((exp) => {
            const expObj = expansions.find((e) => e.value.has(exp));
            return (
              <div
                key={`${card.id} {exp}`}
                className={clsx(styles.ExpansionPack, expObj.className)}
              >
                <TooltipLabel
                  label={
                    printLabel("requiresExpansion", language) +
                    " “" +
                    expObj.label[language] +
                    "”"
                  }
                >
                  <FontAwesomeIcon
                    className={styles.ExpIcon}
                    // @ts-ignore
                    icon={expObj.icon}
                  />
                </TooltipLabel>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.Header}>
        <div className={styles.Icon}>
          {/* @ts-ignore */}
          <FontAwesomeIcon className={styles.CardIcon} icon={card.icon} />
        </div>
        <div className={styles.Title}>{card.name[language]}</div>
      </div>
      <div className={styles.Description}>{card.description[language]}</div>

      <div className={styles.Stats}>
        {card.timing === "Temporary Event" && (
          <div className={styles.Timing}>
            {/*{printLabel("duration", language)}: */}
            {card.timingDetails}min
          </div>
        )}

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
