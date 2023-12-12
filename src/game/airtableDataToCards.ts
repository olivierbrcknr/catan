import type { AirtableData, CardID, InGameCard } from "./types";

export const airtableDataToCards = (airTableData: AirtableData) => {
  const cards = airTableData
    // .filter((c) => c["Active at the beginning"] === true)
    .map((r) => {
      // return simplified version of event
      const transformedCard: InGameCard = {
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
      };

      return transformedCard;
    });

  return cards;
};

export const getCardData = (id: CardID, cards: AirtableData) => {
  const event = cards.find((e) => e.id === id);

  const eventData: InGameCard = {
    id: id,
    name: {
      de: event.Name,
      en: event["Name ENG"],
    },
    description: {
      de: event.Description,
      en: event["Description ENG"],
    },
    icon: event.Icon,
    isNew: true,
    timing: event.Type,
    timingDetails: event?.["Timing Details"],
  };

  return eventData;
};
