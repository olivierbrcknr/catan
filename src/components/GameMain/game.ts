import { useEffect, useState, useCallback } from "react";

import { BASE_PROBABILITY } from "../../utils/constants";
import type {
  AirtableData,
  GameData,
  GameSettings,
  Event,
  Rule,
  InGameEvent,
  InGameRule,
  InGameAction,
  CardID,
} from "../GameContainer/types";

type DeckCard = {
  id: CardID;
  type: "event" | "rule";
};

let currentDeck: DeckCard[] = [];

const startGame = (cards: AirtableData, settings: GameSettings) => {
  // generate initial setup
  cards.events.forEach((e) => {
    // add card id in amount of probability to deck
    for (let i = 0; i < e.Probability; i++) {
      currentDeck.push({ id: e.id, type: "event" });
    }

    // no events at the beginning

    // return simplified version of event
    // return {
    //   name: e.Name,
    //   description: e.Description,
    //   icon: e.Icon,
    //   type: "event",
    // };
  });

  // select initial setup
  let inGameRules: InGameRule[] = cards.rules
    .filter((r) => r.Permanent)
    .map((r) => {
      // return simplified version of event
      return {
        id: r.id,
        name: r.Name,
        description: r.Description,
        icon: r.Icon,
        type: "rule",
      };
    });

  cards.rules
    .filter((r) => !r.Permanent)
    .forEach((r) => {
      // add card id in amount of probability to deck
      for (let i = 0; i < r.Probability; i++) {
        currentDeck.push({
          id: r.id,
          type: "rule",
        });
      }
    });

  const initGameData: GameData = {
    events: [],
    rules: inGameRules,
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

  let action: Rule | Event = cards.events.find((e) => e.id === id);
  let type: "event" | "rule" = "event";
  // if there is no event with that id, it has to be a rule
  if (!action) {
    action = cards.rules.find((r) => r.id === id);
    type = "rule";
  }

  for (let i = 0; i < action.Probability; i++) {
    currentDeck.push({
      id: id,
      type: type,
    });
  }

  shuffle(currentDeck);
};

const controlDeck = (min: number, cards: AirtableData, gameData: GameData) => {
  // somtimes we want to add new cards depending on the timing
  const currentEventIDs = new Set(gameData.events.map((e) => e.id));
  const currentRuleIDs = new Set(gameData.rules.map((e) => e.id));

  currentDeck = [];

  cards.events.forEach((e) => {
    const startTime = e?.["Start Time"];
    const endTime = e?.["End Time"];

    // if in range, add to deck
    if (!startTime || startTime <= min || startTime <= 1) {
      if (!endTime || endTime > min) {
        // only add if not in game already
        if (!currentEventIDs.has(e.id)) {
          addIdToDeck(e.id, cards);
        }
      }
    }
  });

  cards.rules.forEach((r) => {
    const startTime = r?.["Start Time"];
    const endTime = r?.["End Time"];

    // if in range, add to deck
    if (!startTime || startTime <= min) {
      if (!endTime || endTime > min) {
        // only add if not in game already
        if (!currentRuleIDs.has(r.id)) {
          addIdToDeck(r.id, cards);
        }
      }
    }
  });
};

const getNextEvent = () => {
  shuffle(currentDeck);

  return currentDeck[0];
};

const getEventData = (id: CardID, cards: AirtableData) => {
  const event = cards.events.find((e) => e.id === id);

  const eventData: InGameEvent = {
    id: id,
    type: "event",
    name: event.Name,
    description: event.Description,
    icon: event.Icon,
    isNew: true,
    timing: event.Type,
    timingDetails: parseInt(event?.["Timing Details"]),
  };

  return eventData;
};

const getRuleData = (id: CardID, cards: AirtableData) => {
  const rule = cards.rules.find((e) => e.id === id);

  const ruleData: InGameRule = {
    id: id,
    name: rule.Name,
    description: rule.Description,
    icon: rule.Icon,
    isNew: true,
    type: "rule",
  };

  return ruleData;
};

const checkForEvent = () => {
  return Math.random() < BASE_PROBABILITY;
};

export const useGameChange = (cards: AirtableData, settings: GameSettings) => {
  const [gameData, setGameData] = useState<GameData>({
    events: [],
    rules: [],
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
          let newGameData = { ...gameData };

          let newAction: InGameAction | false = false;

          if (newEvent.type === "event") {
            newAction = getEventData(newEvent.id, cards);
          } else {
            newAction = getRuleData(newEvent.id, cards);
          }

          // if a new action is there we want to remove it from the deck
          removeIDFromDeck(newAction.id);

          return {
            ...newGameData,
            newEvent: newAction,
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
  }, [cards, settings]);

  // setup our interval checker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | false = false;

    // if we are in pause, we do not want the interval to work
    if (!isPause) {
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
      let currentData = { ...gameData };

      switch (gameData.newEvent.type) {
        case "event":
          currentData.events.push({ ...gameData.newEvent });
          break;
        case "rule":
          currentData.rules.push({ ...gameData.newEvent });
          break;
      }
      currentData.newEvent = undefined;
      setGameData({
        ...currentData,
      });

      setIsPause(false);
    }
  };

  const setEventIsDone = (id: CardID) => {
    if (gameData?.events) {
      let currentData = { ...gameData };

      const removeIndex = currentData.events.findIndex((evt) => evt.id === id);
      currentData.events.splice(removeIndex, 1);

      setGameData({
        ...currentData,
      });

      // add the event to the deck again so it can appear again
      addIdToDeck(id, cards);
    }
  };

  const setbarbarianShipArrived = () => {
    gameData.events
      .filter((evt) => evt.timing === "Until barbarian ship")
      .forEach((evt) => setEventIsDone(evt.id));
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
  };
};
