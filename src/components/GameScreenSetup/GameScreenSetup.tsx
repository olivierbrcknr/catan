import React, { useState, useEffect } from "react";

import clsx from "clsx";

import {
  EVENT_FREQUENCY_LOW,
  EVENT_FREQUENCY_MEDIUM,
  EVENT_FREQUENCY_HIGH,
} from "../../utils/constants";
import Button from "../Button";
import type {
  Player,
  GameSettings,
  CardFilter,
  ExpansionPack,
} from "../GameContainer/types";
import Slider from "../Slider";
import TabSelect from "../TabSelect";

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

  const onExpansionChange = (expPacks: Set<ExpansionPack>) => {
    onChangeFilters({
      ...activeFilters,
      expansionPacks: expPacks,
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

      <ExpansionSelect
        value={activeFilters.expansionPacks}
        onChange={onExpansionChange}
      />

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

      <TabSelect
        options={[
          {
            label: "Low",
            value: EVENT_FREQUENCY_LOW,
          },
          {
            label: "Medium",
            value: EVENT_FREQUENCY_MEDIUM,
          },
          {
            label: "High",
            value: EVENT_FREQUENCY_HIGH,
          },
        ]}
        value={gameSettings.eventFrequency}
        onChange={(v) => settingsChange(v, "eventFrequency")}
      />

      <h2>Events & Rules</h2>

      <Slider
        value={gameSettings.evilLevel}
        min={0}
        labelMin={"kind"}
        max={10}
        labelMax={"evil"}
        onChange={(v) => settingsChange(v, "evilLevel")}
      />

      <Slider
        value={gameSettings.funkLevel}
        min={0}
        labelMin={"ordinary"}
        max={10}
        labelMax={"funky"}
        onChange={(v) => settingsChange(v, "funkLevel")}
      />

      <Button onClick={() => {}}>Edit Deck</Button>

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
