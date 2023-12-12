import React, { useEffect, useState } from "react";

import type { AirtableData, SetupCard as SetupCardType } from "../../game";
import { type Language, printLabel } from "../../utils/language";

import SetupCard from "./SetupCard";

import styles from "./CardOverview.module.scss";

export interface CardOverviewProps {
  language: Language;
  airTableData: AirtableData;
  filteredData: AirtableData;
}

const CardOverview = ({
  language,
  airTableData,
  filteredData,
}: CardOverviewProps) => {
  const [cards, setCards] = useState<SetupCardType[]>([]);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const cards = airTableData
      // .filter((c) => c["Active at the beginning"] === true)
      .map((r) => {
        const isUsed = filteredData.find((c) => c.id === r.id) ? true : false;

        // return simplified version of event
        const transformedCard: SetupCardType = {
          id: r.id,
          name: {
            de: r.Name,
            en: r["Name ENG"],
          },
          description: {
            de: r.Description,
            en: r["Description ENG"],
          },
          icon: r.Icon,
          timing: r.Type,
          timingDetails: r?.["Timing Details"],
          isUsed: isUsed,
          stats: {
            funk: r.Funk,
            evil: r.Evil,
            probability: r.Probability,
            expansionPacks: r["Expansion Packs"],
          },
        };

        return transformedCard;
      });

    setCards(cards);
  }, [airTableData, filteredData]);

  return (
    <div className={styles.CardOverview}>
      <div className={styles.Header}>
        <h2>
          {printLabel("CardOverview", language)} ({filteredData.length})
        </h2>

        <button
          className={styles.ShowHideButton}
          onClick={() => setIsShown(!isShown)}
        >
          {isShown
            ? printLabel("HideCards", language)
            : printLabel("ShowCards", language)}
        </button>
      </div>

      {isShown && (
        <div className={styles.Grid}>
          {cards.map((card) => (
            <SetupCard
              key={`SetupCard-${card.id}`}
              card={card}
              language={language}
              isUsed={card.isUsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(CardOverview);
