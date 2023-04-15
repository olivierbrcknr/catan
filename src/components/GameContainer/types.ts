export type Player = {
  name?: string;
  points?: number;
  isActive: boolean;
  color: "red" | "orange" | "blue" | "white";
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

export type CardID = number;

export type Event = {
  "Start Time"?: number;
  Name: string;
  Evil: number;
  "Expansion Packs"?: ExpansionPack[];
  "Enabled (Moderated)"?: boolean;
  "Timing Details"?: string;
  Funk: number;
  Description: string;
  Type: EventType;
  "End Time"?: number;
  Icon: string;
  id: string;
  Set?: string[];
};

export type Rule = {
  "Enabled [moderated]"?: boolean;
  "Expansion Packs"?: ExpansionPack[];
  Funk: number;
  Evil: number;
  Name: string;
  Set?: string[];
  Description: string;
  "End Time"?: number;
  Icon: string;
  "Start Time"?: number;
  id: string;
};

export type AirtableData = {
  events: Event[];
  rules: Rule[];
};
