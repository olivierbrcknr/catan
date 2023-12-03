import React from "react";

import clsx from "clsx";

import type { Player } from "../GameContainer/types";

import styles from "./SinglePlayerSelect.module.scss";

interface SinglePlayerSelectProps {
  player: Player;
  onChange: (v: Player) => void;
}

const SinglePlayerSelect = ({ player, onChange }: SinglePlayerSelectProps) => {
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
        placeholder={`Player ${player.color}`}
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
