import React from "react";

import clsx from "clsx";

import type { Player } from "../../game/types";
import { type Language, printLabel } from "../../utils/language";

import styles from "./SinglePlayerSelect.module.scss";

interface SinglePlayerSelectProps {
  player: Player;
  onChange: (v: Player) => void;
  language: Language;
}

const SinglePlayerSelect = ({
  player,
  onChange,
  language,
}: SinglePlayerSelectProps) => {
  const onChangeName = (v: string) => {
    onChange({
      ...player,
      name: v,
      isActive: v !== "",
    });
  };

  const onDisablePlayer = () => {
    onChange({
      ...player,
      name: undefined,
      isActive: false,
    });
  };

  return (
    <div
      className={clsx(
        styles.SinglePlayerSelect,
        `color-${player.color}`,
        !player.isActive && styles.isInactive
      )}
    >
      <input
        placeholder={`${printLabel("Player", language)} ${printLabel(
          player.color,
          language
        )}`}
        value={player?.name || ""}
        onChange={(evt) => onChangeName(evt.target.value)}
      />
      {player.isActive && (
        <div className={styles.RemoveButton} onClick={onDisablePlayer}>
          ×
        </div>
      )}
    </div>
  );
};
export default SinglePlayerSelect;
