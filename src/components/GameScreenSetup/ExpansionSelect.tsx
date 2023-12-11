import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./ExpansionSelect.module.scss";

interface ExpansionSelectProps {
  value: Set<ExpansionPack>;
  onChange: (v: Set<ExpansionPack>) => void;
}

const exp1: ExpansionPack = "Cities and Knights";
const exp2: ExpansionPack = "Seafarers";

const expansions: {
  label: string;
  value: Set<ExpansionPack>;
  className: string;
  icon: string | string[];
}[] = [
  {
    label: "Base Game Only",
    value: new Set([]),
    className: styles.TypeBase,
    icon: "square",
  },
  {
    label: "Seafarers",
    value: new Set([exp2]),
    className: styles.TypeSeafarers,
    icon: "anchor",
  },
  {
    label: "Cities & Knights",
    value: new Set([exp1]),
    className: styles.TypeCitiesKinghts,
    icon: "chess-knight",
  },
  {
    label: "Seafarers and Cities & Knights",
    value: new Set([exp1, exp2]),
    className: styles.TypeSeaAndKinights,
    icon: ["anchor", "chess-knight"],
  },
];

const ExpansionSelect = ({ value, onChange }: ExpansionSelectProps) => {
  return (
    <RadixRadioGroup.Root
      className={styles.ExpansionSelect}
      onValueChange={(label) => {
        const set = expansions.find((exp) => exp.label === label);
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
          value={exp.label}
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
          <span className={styles.Label}>{exp.label}</span>
        </RadixRadioGroup.Item>
      ))}
    </RadixRadioGroup.Root>
  );
};
export default ExpansionSelect;
