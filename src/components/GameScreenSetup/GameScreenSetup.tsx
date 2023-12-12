import React, { useEffect, useState } from "react";

import { filterData } from "../../game";
import type {
  AirtableData,
  CardFilter,
  ExpansionPack,
  GameSettings,
  Player,
} from "../../game/types";
import {
  EVENT_FREQUENCY_LOW,
  EVENT_FREQUENCY_MEDIUM,
  EVENT_FREQUENCY_HIGH,
} from "../../utils/constants";
import { type Language, printLabel } from "../../utils/language";
import Button from "../Button";
import CardOverview from "../CardOverview";
import LoadingIndicator from "../LoadingIndicator";
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
  language: Language;
  airTableData: AirtableData;
  onFilterData: (v: AirtableData) => void;
}

const GameScreenSetup = ({
  onClickStart,
  players,
  onChangePlayers,
  gameSettings,
  onChangeSettings,
  activeFilters,
  onChangeFilters,
  language,
  airTableData,
  onFilterData,
}: GameScreenSetupProps) => {
  const [filteredData, setFilteredData] = useState<AirtableData>([]);

  useEffect(() => {
    onFilterData(filteredData);
  }, [filteredData, onFilterData]);

  useEffect(() => {
    setFilteredData(filterData(airTableData, activeFilters, gameSettings));
  }, [airTableData, activeFilters, gameSettings]);

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

  const settingsChange = (value: string | number, setting: string) => {
    const newSettings = { ...gameSettings };
    newSettings[setting] = value;
    onChangeSettings({ ...newSettings });
  };

  return (
    <div className={styles.GameScreenSetup}>
      <h1>Fate of Catan</h1>

      <section>
        <h2>{printLabel("Extensions", language)}</h2>

        <ExpansionSelect
          value={activeFilters.expansionPacks}
          onChange={onExpansionChange}
          language={language}
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
        <h2>{printLabel("Who is Playing", language)}</h2>

        <div className={styles.Row}>
          {players.map((p, i) => (
            <SinglePlayerSelect
              key={`Player-${i}`}
              player={p}
              onChange={(v) => onSinglePlayerChange(v, i)}
              language={language}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>{printLabel("Rules", language)}</h2>

        <div className={styles.Row}>
          <h3>
            {printLabel("Victory Points", language)} (
            {gameSettings.maxPointsNeeded})
          </h3>
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
        <h2>{printLabel("Events", language)}</h2>
        <div className={styles.Row}>
          <h3>{printLabel("Frequency", language)}</h3>
          <TabSelect
            name="Frequency"
            options={[
              {
                label: printLabel("Low", language),
                value: EVENT_FREQUENCY_LOW,
              },
              {
                label: printLabel("Medium", language),
                value: EVENT_FREQUENCY_MEDIUM,
              },
              {
                label: printLabel("High", language),
                value: EVENT_FREQUENCY_HIGH,
              },
            ]}
            value={gameSettings.eventFrequency}
            onChange={(v) => settingsChange(v, "eventFrequency")}
          />
        </div>
        <div className={styles.Row}>
          <h3>
            {printLabel("Evilness", language)} ({gameSettings.evilLevel})
          </h3>
          <Slider
            name="Evilness Level"
            value={gameSettings.evilLevel}
            min={1}
            labelMin={printLabel("kind", language)}
            max={10}
            labelMax={printLabel("evil", language)}
            onChange={(v) => settingsChange(v, "evilLevel")}
          />
        </div>
        <div className={styles.Row}>
          <h3>
            {printLabel("Funkiness", language)} ({gameSettings.funkLevel})
          </h3>
          <Slider
            name="Funkiness Level"
            value={gameSettings.funkLevel}
            min={1}
            labelMin={printLabel("ordinary", language)}
            max={10}
            labelMax={printLabel("funky", language)}
            onChange={(v) => settingsChange(v, "funkLevel")}
          />
        </div>
      </section>

      <section>
        <div className={styles.Row}>
          <CardOverview
            airTableData={airTableData}
            language={language}
            filteredData={filteredData}
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
            <span>
              {printLabel("Cards", language)}: {filteredData.length}
            </span>
            <span>
              {printLabel("CardCheck", language)} {gameSettings.eventFrequency}s
            </span>
          </div>

          {airTableData.length <= 0 && <LoadingIndicator language={language} />}

          <Button
            className={styles.StartButton}
            disabled={
              players.filter((p) => p.isActive).length < 2 ||
              airTableData.length <= 0
            }
            onClick={onClickStart}
          >
            {printLabel("StartToPlay", language)}
          </Button>
        </div>
      </section>
    </div>
  );
};
export default GameScreenSetup;
