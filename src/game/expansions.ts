import { type Label as LanguageLabel } from "../utils/language";

import type { ExpansionPack } from "./types";

const exp1: ExpansionPack = "Cities and Knights";
const exp2: ExpansionPack = "Seafarers";

export const expansions: {
  label: LanguageLabel;
  value: Set<ExpansionPack>;
  className: string;
  icon: string | string[];
}[] = [
  {
    label: { en: "Base Game Only", de: "Nur Standardspiel" },
    value: new Set([]),
    className: "expansion--type-base",
    icon: "square",
  },
  {
    label: { en: "Seafarers", de: "Seefahrer" },
    value: new Set([exp2]),
    className: "expansion--type-seafarers",
    icon: "anchor",
  },
  {
    label: { en: "Cities & Knights", de: "Händler und Barbaren" },
    value: new Set([exp1]),
    className: "expansion--type-cities-and-knights",
    icon: "chess-knight",
  },
  {
    label: {
      en: "Seafarers and Cities & Knights",
      de: "Seefahrer und Händler und Barbaren",
    },
    value: new Set([exp1, exp2]),
    className: "expansion--type-cities-and-knights-and-seafarers",
    icon: ["anchor", "chess-knight"],
  },
];
