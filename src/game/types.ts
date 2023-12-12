export type Player = {
  name?: string;
  points?: number;
  isActive: boolean;
  color: "red" | "orange" | "blue" | "white" | "brown" | "green";
};

export type GameSettings = {
  /** 0-10 */
  funkLevel: number;
  /** 0-10 */
  evilLevel: number;
  eventFrequency: number;
  maxPointsNeeded: number;
  cardVariety: number;
};

export type EventType =
  | "Until barbarian ship"
  | "Temporary Event"
  | "One time event"
  | "Permanent Rule";

export type ExpansionPack = "Cities and Knights" | "Seafarers";

export type CardFilter = {
  expansionPacks: Set<ExpansionPack>;
};

export type CardID = string;

export type Card = {
  Name: string;
  "Name ENG": string;
  Description: string;
  "Description ENG": string;
  "Expansion Packs"?: ExpansionPack[];
  "Enabled (Moderated)"?: boolean;
  "Timing Details"?: number;
  "Active at the beginning"?: boolean;
  Evil: number;
  Funk: number;
  Type: EventType;
  "Start Time"?: number;
  "End Time"?: number;
  Icon: string;
  id: string;
  Set?: string[];
  /** number between 1 - 10 */
  Probability: number;
};

export interface SetupCard extends InGameCard {
  isUsed: boolean;
  stats: {
    funk: number;
    evil: number;
    probability: number;
    expansionPacks?: ExpansionPack[];
  };
}

export type AirtableData = Card[];

export type InGameCard = {
  name: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  icon: string;
  isNew?: boolean;
  id: CardID;
  timing: EventType;
  timingDetails?: number;
};

export type GameData = {
  cards: InGameCard[];
  newEvent?: InGameCard;
};
