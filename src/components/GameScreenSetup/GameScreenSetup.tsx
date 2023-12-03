import React from "react";

import {
  // CARD_VARIETY_LOW,
  // CARD_VARIETY_MEDIUM,
  // CARD_VARIETY_HIGH,
  EVENT_FREQUENCY_LOW,
  EVENT_FREQUENCY_MEDIUM,
  EVENT_FREQUENCY_HIGH,
} from "../../utils/constants";
import Button from "../Button";
import type {
  AirtableData,
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
  filteredData: AirtableData;
}

const GameScreenSetup = ({
  onClickStart,
  players,
  onChangePlayers,
  gameSettings,
  onChangeSettings,
  activeFilters,
  onChangeFilters,
  filteredData,
}: GameScreenSetupProps) => {
  const onSinglePlayerChange = (updatedPlayer: Player, index: number) => {
    const allPlayers = players;
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
    const newSettings = { ...gameSettings };
    newSettings[setting] = value;
    onChangeSettings({ ...newSettings });
  };

  return (
    <div className={styles.GameScreenSetup}>
      <h1>Fate of Catan</h1>

      <section>
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
      </section>

      <section>
        <h2>Who‘s Playing?</h2>

        <div className={styles.Row}>
          {players.map((p, i) => (
            <SinglePlayerSelect
              key={`Player-${i}`}
              player={p}
              onChange={(v) => onSinglePlayerChange(v, i)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Rules</h2>

        <div className={styles.Row}>
          <h3>Victory Points ({gameSettings.maxPointsNeeded})</h3>
          <Slider
            name="Victory Points"
            value={gameSettings.maxPointsNeeded}
            min={3}
            max={30}
            onChange={(v) => settingsChange(v, "maxPointsNeeded")}
          />
        </div>
      </section>

      <section>
        <h2>Events</h2>
        <div className={styles.Row}>
          <h3>Frequency</h3>
          <TabSelect
            name="Frequency"
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
        </div>
        <div className={styles.Row}>
          <h3>Evilness</h3>
          <Slider
            name="Evilness Level"
            value={gameSettings.evilLevel}
            min={0}
            labelMin={"kind"}
            max={10}
            labelMax={"evil"}
            onChange={(v) => settingsChange(v, "evilLevel")}
          />
        </div>
        <div className={styles.Row}>
          <h3>Funkiness</h3>
          <Slider
            name="Funkiness Level"
            value={gameSettings.funkLevel}
            min={0}
            labelMin={"ordinary"}
            max={10}
            labelMax={"funky"}
            onChange={(v) => settingsChange(v, "funkLevel")}
          />
        </div>
        {/*<div className={styles.Row}>
          <h3>Card Variety</h3>
          <TabSelect
            options={[
              {
                label: "Low",
                value: CARD_VARIETY_LOW,
              },
              {
                label: "Medium",
                value: CARD_VARIETY_MEDIUM,
              },
              {
                label: "High",
                value: CARD_VARIETY_HIGH,
              },
            ]}
            value={gameSettings.cardVariety}
            onChange={(v) => settingsChange(v, "cardVariety")}
          />
        </div>*/}
      </section>

      <section>
        <div className={styles.Row}>
          {/*<Button disabled onClick={() => {}}>
            Edit Deck
          </Button>*/}
          <div className={styles.DisplaySettings}>
            <span>Cards: {filteredData.length}</span>
            <span>New card check every {gameSettings.eventFrequency}s</span>
          </div>
          <Button
            className={styles.StartButton}
            disabled={players.filter((p) => p.isActive).length < 2}
            onClick={onClickStart}
          >
            Play!
          </Button>
        </div>
      </section>
    </div>
  );
};
export default GameScreenSetup;
