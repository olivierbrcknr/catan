export const Languages = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
] as const;

export type Language = (typeof Languages)[number]["code"];

export const isPossibleLanguage = (value: any): value is Language => {
  return Languages.find((l) => l.code === value) ? true : false;
};

export interface Label {
  en: string;
  de: string;
}

const LocalizedLabel = {
  Extensions: <Label>{
    en: "Extensions",
    de: "Erweiterungen",
  },
  Rules: <Label>{
    en: "Rules",
    de: "Regeln",
  },
  "Victory Points": <Label>{
    en: "Victory Points",
    de: "Siegpunkte",
  },
  "Who is Playing": <Label>{
    en: "Who's Playing?",
    de: "Wer Spielt?",
  },
  Events: <Label>{
    en: "Events",
    de: "Ereignisse",
  },
  Frequency: <Label>{
    en: "Frequency",
    de: "Frequenz",
  },
  Low: <Label>{
    en: "Low",
    de: "Selten",
  },
  Medium: <Label>{
    en: "Medium",
    de: "Normal",
  },
  High: <Label>{
    en: "High",
    de: "Häufig",
  },
  Evilness: <Label>{
    en: "Evilness",
    de: "Gemeinheit",
  },
  Funkiness: <Label>{
    en: "Funkiness",
    de: "Verrücktheit",
  },
  Probability: <Label>{
    en: "Probability",
    de: "Wahrscheinlichkeit",
  },
  ordinary: <Label>{
    en: "ordinary",
    de: "ruhig",
  },
  funky: <Label>{
    en: "funky",
    de: "funky",
  },
  kind: <Label>{
    en: "kind",
    de: "freundlich",
  },
  evil: <Label>{
    en: "evil",
    de: "gemein",
  },
  CustomCardsNotice: <Label>{
    en: "You are using custom cards, therefore the generator is inactive. Using it again will remove your custom selection.",
    de: "Du benutzt eine individuelle Auswahl an Karten, daher ist der Generator inaktiv. Ihn wieder zu benutzen löscht alle individuell ausgewählten Karten.",
  },
  UseGenerator: <Label>{
    en: "Use Generator",
    de: "Generator Benutzen",
  },
  CardCheck: <Label>{
    en: "New card check",
    de: "Potentiell neue Karte alle",
  },
  StartToPlay: <Label>{
    en: "Play!",
    de: "Spielen!",
  },
  Cards: <Label>{
    en: "Cards",
    de: "Karten",
  },
  Player: <Label>{
    en: "Player",
    de: "Spieler*in",
  },
  red: <Label>{
    en: "red",
    de: "Rot",
  },
  blue: <Label>{
    en: "blue",
    de: "Blau",
  },
  orange: <Label>{
    en: "orange",
    de: "Orange",
  },
  white: <Label>{
    en: "white",
    de: "Weiß",
  },
  green: <Label>{
    en: "green",
    de: "Grün",
  },
  brown: <Label>{
    en: "brown",
    de: "Braun",
  },
  and: <Label>{
    en: "and",
    de: "und",
  },
  Ship: <Label>{
    en: "Ship",
    de: "Schiff",
  },
  "Spawn Card": <Label>{
    en: "Spawn Card",
    de: "Direkte Karte",
  },
  Exit: <Label>{
    en: "Exit",
    de: "Beenden",
  },
  "Zoom Out": <Label>{
    en: "Zoom Out",
    de: "Verkleinern",
  },
  "Zoom In": <Label>{
    en: "Zoom In",
    de: "Vergrößern",
  },
  "Reset Zoom": <Label>{
    en: "Reset Zoom",
    de: "Originalgröße",
  },
  Play: <Label>{
    en: "Play",
    de: "Play",
  },
  Pause: <Label>{
    en: "Pause",
    de: "Pause",
  },
  TypeRule: <Label>{
    en: "Permanent Rule",
    de: "Dauerhafte Regel",
  },
  TypeEvent: <Label>{
    en: "Event",
    de: "Ereignis",
  },
  TypeShip: <Label>{
    en: "Barbarian Ship",
    de: "Barbarenschiff",
  },
  TypeTemporary: <Label>{
    en: "Temporary Rule",
    de: "Zeitlich Begrenzte Regel",
  },
  EventButtonLabel: <Label>{
    en: "Continue",
    de: "Weiterspielen",
  },
  PlayTime: <Label>{
    en: "Time Running",
    de: "Spielzeit",
  },
  won: <Label>{
    en: "won!",
    de: "hat gewonnen!",
  },
  WinnerButtonLabel: <Label>{
    en: "Done",
    de: "Fertig",
  },
  loading: <Label>{
    en: "is loading",
    de: "lädt…",
  },
  CardOverview: <Label>{
    en: "Cards",
    de: "Karten",
  },
  ShowCards: <Label>{
    en: "Show Cards",
    de: "Karten Anzeigen",
  },
  HideCards: <Label>{
    en: "Hide Cards",
    de: "Karten Verstecken",
  },
  requiresExpansion: <Label>{
    en: "This card requires the expansion",
    de: "Diese Karte benötigt die Erweiterung",
  },
  Type: <Label>{
    en: "Type",
    de: "Typ",
  },
  hideInvalidCards: <Label>{
    en: "Hide invalid cards",
    de: "Verstecke ungültig Karten",
  },
  SortBy: <Label>{
    en: "Sort by",
    de: "Sortiere Nach",
  },
  cardsShown: <Label>{
    en: "cards shown",
    de: "Karten angezeigt",
  },
  duration: <Label>{
    en: "Duration",
    de: "Dauer",
  },
} as const;

export type Labels = keyof typeof LocalizedLabel;

export const printLabel = (label: Labels, language: Language): string => {
  return LocalizedLabel[label][language];
};
