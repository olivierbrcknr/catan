import React, { useEffect, useState } from "react";

import type {
  AirtableData,
  SetupCard as SetupCardType,
  CardFilter,
} from "../../game";
import { type Language, printLabel } from "../../utils/language";
import Dropdown from "../Dropdown";
import Toggle from "../Toggle";

import SetupCard from "./SetupCard";

import styles from "./CardOverview.module.scss";

export interface CardOverviewProps {
  language: Language;
  airTableData: AirtableData;
  filteredData: AirtableData;
  cardFilter: CardFilter;
  onCardToggle: (id: string, value: boolean) => void;
}

interface SortSettings {
  hideInvalidCards: boolean;
  order: "type" | "id" | "funkiness" | "evilness" | "probablity";
}

const isUsable = (c: SetupCardType, filter: CardFilter) => {
  let expansionsNum = c.stats.expansionPacks?.length ?? 0;

  c.stats.expansionPacks?.forEach((exp) => {
    filter?.expansionPacks?.has(exp) && expansionsNum--;
  });

  return expansionsNum === 0;
};

const CardOverview = ({
  language,
  airTableData,
  filteredData,
  cardFilter,
  onCardToggle,
}: CardOverviewProps) => {
  const [cards, setCards] = useState<SetupCardType[]>([]);
  const [sortedCards, setSortedCards] = useState<SetupCardType[]>([]);

  const [isShown, setIsShown] = useState(false);

  const [sortSettings, setSortSettings] = useState<SortSettings>({
    hideInvalidCards: true,
    order: "type",
  });

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

  useEffect(() => {
    let sorted = [...cards];

    if (sortSettings.hideInvalidCards) {
      sorted = sorted.filter((c) => isUsable(c, cardFilter));
    }

    switch (sortSettings.order) {
      case "type":
        sorted = sorted.sort((a, b) => (a.timing < b.timing ? -1 : 1));
        break;
      case "evilness":
        sorted = sorted.sort((a, b) => (a.stats.evil < b.stats.evil ? -1 : 1));
        break;
      case "funkiness":
        sorted = sorted.sort((a, b) => (a.stats.funk < b.stats.funk ? -1 : 1));
        break;
      case "probablity":
        sorted = sorted.sort((a, b) =>
          a.stats.probability < b.stats.probability ? -1 : 1
        );
        break;
      default:
      case "id":
        sorted = sorted.sort((a, b) => (a.id < b.id ? -1 : 1));
        break;
    }

    setSortedCards(sorted);
  }, [cards, sortSettings, cardFilter]);

  return (
    <div className={styles.CardOverview}>
      <div className={styles.Header}>
        <h2>
          {printLabel("CardOverview", language)} ({filteredData.length}/
          {airTableData.length})
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
        <div className={styles.Wrapper}>
          <div className={styles.Filter}>
            <span>
              <label>
                {" "}
                {sortedCards.length} {printLabel("cardsShown", language)}
              </label>
            </span>

            <span>
              <label>{printLabel("hideInvalidCards", language)}</label>

              <Toggle
                value={sortSettings.hideInvalidCards}
                onChange={(v) =>
                  setSortSettings({
                    ...sortSettings,
                    hideInvalidCards: v,
                  })
                }
              />
            </span>

            <span>
              <label>{printLabel("SortBy", language)}</label>

              <Dropdown
                name="Frequency"
                options={[
                  {
                    label: "ID",
                    value: "id",
                  },
                  {
                    label: printLabel("Type", language),
                    value: "type",
                  },
                  {
                    label: printLabel("Evilness", language),
                    value: "evilness",
                  },
                  {
                    label: printLabel("Funkiness", language),
                    value: "funkiness",
                  },
                  {
                    label: printLabel("Probability", language),
                    value: "probablity",
                  },
                ]}
                value={sortSettings.order}
                onChange={(v) =>
                  setSortSettings({
                    ...sortSettings,
                    // @ts-ignore
                    order: v,
                  })
                }
              />
            </span>
          </div>

          <div className={styles.Grid}>
            {sortedCards.map((card) => (
              <SetupCard
                key={`SetupCard-${card.id}`}
                card={card}
                language={language}
                isUsed={card.isUsed}
                isUsable={isUsable(card, cardFilter)}
                onToggle={(v) => onCardToggle(card.id, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CardOverview);
