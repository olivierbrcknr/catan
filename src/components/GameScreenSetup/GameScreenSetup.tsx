import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type {
  Player,
  GameSettings,
  CardFilter,
  ExpansionPack,
} from "../GameContainer/types";

import SinglePlayerSelect from "./SinglePlayerSelect";

import styles from "./GameScreenSetup.module.scss";

export interface GameScreenSetupProps {
  onClickStart: () => void;
  players: Player[];
  onChangePlayers: (v: Player[]) => void;
  gameSettings: GameSettings;
  onChangeSettings: (v: GameSettings) => void;
  activeFilters: CardFilter;
  onChangeFilters: (v: CardFilter) => void;
}

const expansions: ExpansionPack[] = ["Cities and Knights", "Seafarers"];

const GameScreenSetup = ({
  onClickStart,
  players,
  onChangePlayers,
  gameSettings,
  onChangeSettings,
  activeFilters,
  onChangeFilters,
}: GameScreenSetupProps) => {
  const onSinglePlayerChange = (updatedPlayer: Player, index: number) => {
    let allPlayers = players;
    allPlayers[index] = {
      ...updatedPlayer,
    };
    onChangePlayers([...allPlayers]);
  };

  const onExpansionChange = (v: boolean, expansion: ExpansionPack) => {
    let newExpansions = new Set(activeFilters.expansionPacks);

    if (v) {
      newExpansions.add(expansion);
    } else {
      newExpansions.delete(expansion);
    }

    onChangeFilters({
      ...activeFilters,
      expansionPacks: newExpansions,
    });
  };

  const settingsChange = (value: any, setting: string) => {
    let newSettings = { ...gameSettings };
    newSettings[setting] = value;
    onChangeSettings({ ...newSettings });
  };

  return (
    <div className={styles.GameScreenSetup}>
      <h3>Expansion Packs</h3>

      <div>
        {expansions.map((exp, i) => (
          <span key={`expansion-${i}`}>
            <input
              id={`checkbox-expansion-${i}`}
              type="checkbox"
              onChange={(evt) => onExpansionChange(evt.target.checked, exp)}
            />
            <label htmlFor={`checkbox-expansion-${i}`}>{exp}</label>
          </span>
        ))}
      </div>

      <h3>Players</h3>

      <div className={styles.PlayerSelection}>
        {players.map((p, i) => (
          <SinglePlayerSelect
            key={`Player-${i}`}
            player={p}
            onChange={(v) => onSinglePlayerChange(v, i)}
          />
        ))}
      </div>

      <h3>Settings</h3>

      {Object.keys(gameSettings).map((key, i) => (
        <span key={`setting-${i}`}>
          <input
            type="range"
            id={`setting-${i}`}
            value={gameSettings[key]}
            onChange={(e) => {
              settingsChange(parseInt(e.target.value), key);
            }}
            min={0}
            max={10}
          />
          <label htmlFor={`setting-${i}`}>{key}</label>
        </span>
      ))}

      <h3>Cards</h3>

      <button
        disabled={players.filter((p) => p.isActive).length < 2}
        onClick={onClickStart}
      >
        Start!
      </button>
    </div>
  );
};
export default GameScreenSetup;
