import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./ExpansionSelect.module.scss";

interface ExpansionSelectProps {
  value: Set<ExpansionPack>;
  onChange: (v: Set<ExpansionPack>) => void;
}

const expansions: {
  label: string;
  value: Set<ExpansionPack>;
  className: string;
}[] = [
  {
    label: "Base Game only",
    value: new Set([]),
    className: styles.TypeBase,
  },
  {
    label: "Seafarers",
    value: new Set(["Cities and Knights"]),
    className: styles.TypeSeafarers,
  },
  {
    label: "Cities & Knights",
    value: new Set(["Seafarers"]),
    className: styles.TypeCitiesKinghts,
  },
  {
    label: "Seafarers and Cities & Knights",
    value: new Set(["Cities and Knights", "Seafarers"]),
    className: styles.TypeSeaAndKinights,
  },
];

const ExpansionSelect = ({ value, onChange }: ExpansionSelectProps) => {
  return (
    <div className={styles.ExpansionSelect}>
      {expansions.map((exp, i) => (
        <button
          key={"expansion-" + i}
          onClick={() => {
            onChange(exp.value);
          }}
          className={clsx(
            styles.Expansion,
            value === exp.value && styles.isSelected,
            value.size === 0 && i === 0 && styles.isSelected,
            exp.className
          )}
        >
          {exp.label}
        </button>
      ))}
    </div>
  );
};
export default ExpansionSelect;
