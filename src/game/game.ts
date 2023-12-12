import { useEffect, useState, useCallback } from "react";

import { BASE_PROBABILITY } from "../utils/constants";

import { airtableDataToCards, getCardData } from "./airtableDataToCards";
import type {
  AirtableData,
  GameData,
  GameSettings,
  Card,
  CardID,
} from "./types";

type DeckCard = {
  id: CardID;
};

let currentDeck: DeckCard[] = [];

const startGame = (cards: AirtableData, settings: GameSettings) => {
  // generate initial setup
  cards.forEach((e) => {
    // add card id in amount of probability to deck
    for (let i = 0; i < e.Probability; i++) {
      currentDeck.push({ id: e.id });
    }
  });

  const startCards = airtableDataToCards(
    cards.filter((c) => c["Active at the beginning"] === true)
  );

  const initGameData: GameData = {
    // events: [],
    // rules: inGameRules,
    cards: startCards,
  };

  return initGameData;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// if a rule is on the field, it should not be bale to be shuffled anymore
const removeIDFromDeck = (id: CardID) => {
  currentDeck = currentDeck.filter((card) => card.id !== id);
};

const addIdToDeck = (id: CardID, cards: AirtableData) => {
  // generate initial setup

  const action: Card = cards.find((e) => e.id === id);

  for (let i = 0; i < action.Probability; i++) {
    currentDeck.push({
      id: id,
    });
  }

  shuffle(currentDeck);
};

const controlDeck = (min: number, cards: AirtableData, gameData: GameData) => {
  // somtimes we want to add new cards depending on the timing
  const currentCardIDs = new Set(gameData.cards.map((e) => e.id));

  currentDeck = [];

  cards.forEach((e) => {
    const startTime = e?.["Start Time"];
    const endTime = e?.["End Time"];

    // if in range, add to deck
    if (!startTime || startTime <= min || startTime <= 1) {
      if (!endTime || endTime > min) {
        // only add if not in game already
        if (!currentCardIDs.has(e.id)) {
          addIdToDeck(e.id, cards);
        }
      }
    }
  });
};

const getNextEvent = () => {
  shuffle(currentDeck);

  return currentDeck[0];
};

const checkForEvent = () => {
  return Math.random() < BASE_PROBABILITY;
};

export const useGameChange = (cards: AirtableData, settings: GameSettings) => {
  const [gameData, setGameData] = useState<GameData>({
    cards: [],
  });
  const [isPause, setIsPause] = useState(false);
  const [sec, setSec] = useState(0);
  const [eventInterval, setEventInterval] = useState(0);

  const spawnCard = useCallback(() => {
    console.log("spawn card. Cards in Deck", currentDeck.length);

    if (currentDeck.length === 0) {
      console.log("No cards in deck");
    } else {
      const newEvent = getNextEvent();

      if (newEvent) {
        setGameData((gameData) => {
          const newGameData = { ...gameData };

          const newCard = getCardData(newEvent.id, cards);

          // if a new action is there we want to remove it from the deck
          removeIDFromDeck(newCard.id);

          return {
            ...newGameData,
            newEvent: newCard,
          };
        });

        setIsPause(true);
      }
    }
  }, [cards]);

  // setup the first game data
  useEffect(() => {
    console.log("init game");
    const initGameData = startGame(cards, settings);
    setGameData(initGameData);
    setIsPause(true);
  }, [cards, settings]);

  // setup our interval checker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | false = false;

    // if we are in pause, we do not want the interval to work
    if (!isPause) {
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
  }, [isPause]);

  useEffect(() => {
    setEventInterval((eI) => {
      const intervalTimer = settings.eventFrequency;
      if (sec > intervalTimer * eI) return eI + 1;
      return eI;
    });
  }, [sec, settings.eventFrequency]);

  // everytime the timer counts one up, check for new events
  useEffect(() => {
    console.log("check if event should happen");
    const eventShouldHappen = checkForEvent();

    if (eventShouldHappen) {
      console.log("a new event should happen!");
      spawnCard();
    }
  }, [cards, eventInterval, spawnCard]);

  useEffect(() => {
    if (sec % 60 === 0) {
      controlDeck(sec / 60, cards, gameData);
    }
  }, [sec, cards, gameData]);

  useEffect(() => {
    console.log("pause", isPause);
  }, [isPause]);

  const setEventIsRead = () => {
    if (gameData?.newEvent) {
      const currentData = { ...gameData };

      if (gameData.newEvent.timing !== "One time event") {
        currentData.cards.push({ ...gameData.newEvent });
      }

      currentData.newEvent = undefined;
      setGameData({
        ...currentData,
      });

      setIsPause(false);
    }
  };

  const setEventIsDone = (id: CardID) => {
    if (gameData?.cards) {
      const currentData = { ...gameData };

      const removeIndex = currentData.cards.findIndex((card) => card.id === id);
      currentData.cards.splice(removeIndex, 1);

      setGameData({
        ...currentData,
      });

      // add the event to the deck again so it can appear again
      addIdToDeck(id, cards);
    }
  };

  const setbarbarianShipArrived = () => {
    gameData.cards
      .filter((card) => card.timing === "Until barbarian ship")
      .forEach((card) => setEventIsDone(card.id));
  };

  const resetGame = () => {
    setIsPause(true);
    setSec(0);
  };

  return {
    gameData,
    isPause,
    setIsPause,
    setEventIsRead,
    setEventIsDone,
    setbarbarianShipArrived,
    resetGame,
    spawnCard,
    sec,
  };
};
