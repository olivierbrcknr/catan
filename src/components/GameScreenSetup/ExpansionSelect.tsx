import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

import type { ExpansionPack } from "../../game/types";
import {
  type Language,
  type Label as LanguageLabel,
} from "../../utils/language";

import styles from "./ExpansionSelect.module.scss";

interface ExpansionSelectProps {
  value: Set<ExpansionPack>;
  onChange: (v: Set<ExpansionPack>) => void;
  language: Language;
}

const exp1: ExpansionPack = "Cities and Knights";
const exp2: ExpansionPack = "Seafarers";

const expansions: {
  label: LanguageLabel;
  value: Set<ExpansionPack>;
  className: string;
  icon: string | string[];
}[] = [
  {
    label: { en: "Base Game Only", de: "Nur Standardspiel" },
    value: new Set([]),
    className: styles.TypeBase,
    icon: "square",
  },
  {
    label: { en: "Seafarers", de: "Seefahrer" },
    value: new Set([exp2]),
    className: styles.TypeSeafarers,
    icon: "anchor",
  },
  {
    label: { en: "Cities & Knights", de: "Händler und Barbaren" },
    value: new Set([exp1]),
    className: styles.TypeCitiesKinghts,
    icon: "chess-knight",
  },
  {
    label: {
      en: "Seafarers and Cities & Knights",
      de: "Seefahrer und Händler und Barbaren",
    },
    value: new Set([exp1, exp2]),
    className: styles.TypeSeaAndKinights,
    icon: ["anchor", "chess-knight"],
  },
];

const ExpansionSelect = ({
  value,
  onChange,
  language,
}: ExpansionSelectProps) => {
  return (
    <RadixRadioGroup.Root
      className={styles.ExpansionSelect}
      onValueChange={(label) => {
        const set = expansions.find((exp) => exp.label.en === label);
        onChange(set.value);
      }}
    >
      {expansions.map((exp, i) => (
        <RadixRadioGroup.Item
          key={"expansion-" + i}
          className={clsx(
            styles.Expansion,
            value === exp.value && styles.isSelected,
            value.size === 0 && i === 0 && styles.isSelected,
            exp.className
          )}
          value={exp.label.en}
        >
          <div className={styles.IconContainer}>
            {Array.isArray(exp.icon) ? (
              exp.icon.map((ico, i) => (
                <FontAwesomeIcon
                  key={"icon-" + i}
                  className={styles.Icon}
                  /* @ts-ignore */
                  icon={ico}
                />
              ))
            ) : (
              <>
                <FontAwesomeIcon
                  className={styles.Icon}
                  /* @ts-ignore */
                  icon={"fa-" + exp.icon}
                />
              </>
            )}
          </div>
          <span className={styles.Label}>{exp.label[language]}</span>
        </RadixRadioGroup.Item>
      ))}
    </RadixRadioGroup.Root>
  );
};
export default ExpansionSelect;
