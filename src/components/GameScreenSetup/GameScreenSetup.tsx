import React, { useState, useEffect } from "react";

import clsx from "clsx";

import Button from "../Button";
import type {
  Player,
  GameSettings,
  CardFilter,
  ExpansionPack,
} from "../GameContainer/types";

import ExpansionSelect from "./ExpansionSelect";
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

  const onExpansionChange = (expPacks: ExpansionPack[]) => {
    onChangeFilters({
      ...activeFilters,
      expansionPacks: new Set(expPacks),
    });
  };

  const settingsChange = (value: any, setting: string) => {
    let newSettings = { ...gameSettings };
    newSettings[setting] = value;
    onChangeSettings({ ...newSettings });
  };

  return (
    <div className={styles.GameScreenSetup}>
      <h2>Extensions</h2>

      <ExpansionSelect onChange={onExpansionChange} />

      {/*<div onChange={onExpansionChange}>
        {expansions.map((exp, i) => (
          <span key={`expansion-${i}`}>
            <input
              type="radio"
              value={exp.type}
              name="expansion"
              id={`checkbox-expansion-${i}`}
            />
            <label htmlFor={`checkbox-expansion-${i}`}>{exp.label}</label>
          </span>
        ))}
      </div>*/}

      <h2>Who‘s Playing?</h2>

      <div className={styles.PlayerSelection}>
        {players.map((p, i) => (
          <SinglePlayerSelect
            key={`Player-${i}`}
            player={p}
            onChange={(v) => onSinglePlayerChange(v, i)}
          />
        ))}
      </div>

      <h2>Gameplay</h2>

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

      <h2>Events & Rules</h2>

      <button>Edit Deck</button>

      <Button
        disabled={players.filter((p) => p.isActive).length < 2}
        onClick={onClickStart}
      >
        Start!
      </Button>
    </div>
  );
};
export default GameScreenSetup;
