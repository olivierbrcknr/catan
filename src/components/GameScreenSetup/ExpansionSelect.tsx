import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { ExpansionPack } from "../GameContainer/types";

import styles from "./ExpansionSelect.module.scss";

interface ExpansionSelectProps {
  onChange: (expansions: ExpansionPack[]) => void;
}

const expansions: {
  label: string;
  value: ExpansionPack[];
  className: string;
}[] = [
  {
    label: "Base Game only",
    value: [],
    className: styles.TypeBase,
  },
  {
    label: "Seafarers",
    value: ["Cities and Knights"],
    className: styles.TypeSeafarers,
  },
  {
    label: "Cities & Knights",
    value: ["Seafarers"],
    className: styles.TypeCitiesKinghts,
  },
  {
    label: "Seafarers and Cities & Knights",
    value: ["Cities and Knights", "Seafarers"],
    className: styles.TypeSeaAndKinights,
  },
];

const ExpansionSelect = ({ onChange }: ExpansionSelectProps) => {
  const [selection, setSelection] = useState<ExpansionPack[]>(
    expansions[0].value
  );

  return (
    <div className={styles.ExpansionSelect}>
      {expansions.map((exp, i) => (
        <button
          key={"expansion-" + i}
          onClick={() => {
            setSelection(exp.value);
          }}
          className={clsx(
            styles.Expansion,
            selection === exp.value && styles.isSelected,
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
