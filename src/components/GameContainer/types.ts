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
};

export type EventType =
  | "Until barbarian ship"
  | "Temporary Event"
  | "One time event";

export type ExpansionPack = "Cities and Knights" | "Seafarers";

export type CardFilter = {
  expansionPacks?: Set<ExpansionPack>;
};

export type CardID = string;

export type Event = {
  Name: string;
  Evil: number;
  "Expansion Packs"?: ExpansionPack[];
  "Enabled (Moderated)"?: boolean;
  "Timing Details"?: string;
  Funk: number;
  Description: string;
  Type: EventType;
  "Start Time"?: number;
  "End Time"?: number;
  Icon: string;
  id: string;
  Set?: string[];
  /** number between 1 - 10 */
  Probability: number;
};

export type Rule = {
  "Enabled [moderated]"?: boolean;
  "Expansion Packs"?: ExpansionPack[];
  Funk: number;
  Evil: number;
  Name: string;
  Set?: string[];
  Description: string;
  "Start Time"?: number;
  "End Time"?: number;
  Icon: string;
  id: string;
  Permanent: boolean;
  /** number between 1 - 10 */
  Probability: number;
};

export type AirtableData = {
  events: Event[];
  rules: Rule[];
};

interface InGameActionBase {
  name: string;
  description: string;
  icon: string;
  isNew?: boolean;
  id: CardID;
}

export interface InGameEvent extends InGameActionBase {
  type: "event";
  timing: EventType;
  timingDetails?: number;
}

export interface InGameRule extends InGameActionBase {
  type: "rule";
}

export type InGameAction = InGameEvent | InGameRule;

export type GameData = {
  events: InGameEvent[];
  rules: InGameRule[];
  newEvent?: InGameAction;
};
