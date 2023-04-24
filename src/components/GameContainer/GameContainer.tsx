import React, { useState, useEffect } from "react";

import clsx from "clsx";

import { fetchAirTableData } from "../../utils/airtable";
import {
  CARD_VARIETY_MEDIUM,
  EVENT_FREQUENCY_MEDIUM,
  PLAYER_START_POINTS,
} from "../../utils/constants";
import GameMain from "../GameMain";
import GameScreenSetup from "../GameScreenSetup";

import filterData from "./filter";
import type {
  Player,
  GameSettings,
  CardID,
  CardFilter,
  AirtableData,
} from "./types";

import styles from "./GameContainer.module.scss";

export interface GameContainerProps {
  onChangeInGame: (v: boolean) => void;
}

const MAX_STEPS = 2;

const isDev = process.env.NODE_ENV === "development";

const GameContainer = ({ onChangeInGame }: GameContainerProps) => {
  const [airTableData, setAirTableData] = useState<AirtableData>({
    events: [],
    rules: [],
  });
  const [filteredData, setFilteredData] = useState<AirtableData>({
    events: [],
    rules: [],
  });

  const [gameIsRunning, setGameIsRunning] = useState(false);

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([
    {
      isActive: false,
      color: "red",
      points: PLAYER_START_POINTS,
    },
    {
      isActive: false,
      color: "orange",
      points: PLAYER_START_POINTS,
    },
    {
      isActive: false,
      color: "blue",
      points: PLAYER_START_POINTS,
    },
    {
      isActive: false,
      color: "white",
      points: PLAYER_START_POINTS,
    },
    // {
    //   isActive: false,
    //   color: "green",
    //   points: 2,
    // },
    // {
    //   isActive: false,
    //   color: "brown",
    //   points: 2,
    // },
  ]);

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    funkLevel: 5,
    evilLevel: 5,
    eventFrequency: EVENT_FREQUENCY_MEDIUM,
    cardVariety: CARD_VARIETY_MEDIUM,
    maxPointsNeeded: 10,
  });

  const [filter, setFilter] = useState<CardFilter>({
    expansionPacks: new Set([]),
  });

  const [cards, setCards] = useState<Set<CardID>>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAirTableData();
      setAirTableData(data as AirtableData);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setFilteredData(filterData(airTableData, filter, gameSettings));
  }, [airTableData, filter, gameSettings]);

  useEffect(() => {
    onChangeInGame(gameIsRunning);
  }, [gameIsRunning, onChangeInGame]);

  const handleEndGame = () => {
    setGameIsRunning(false);

    let allPlayers = currentPlayers.map((p) => ({
      ...p,
      points: PLAYER_START_POINTS,
    }));
    setCurrentPlayers([...allPlayers]);
  };

  return (
    <div className={styles.GameContainer}>
      {gameIsRunning ? (
        <GameMain
          hasShipExtension={filter.expansionPacks?.has("Cities and Knights")}
          players={currentPlayers}
          setPlayers={setCurrentPlayers}
          onClickCancelGame={handleEndGame}
          gameSettings={gameSettings}
          filteredData={filteredData}
        />
      ) : (
        <GameScreenSetup
          players={currentPlayers}
          onChangePlayers={setCurrentPlayers}
          onClickStart={() => setGameIsRunning(true)}
          gameSettings={gameSettings}
          onChangeSettings={setGameSettings}
          activeFilters={filter}
          onChangeFilters={setFilter}
          filteredData={filteredData}
        />
      )}

      {isDev && (
        <div className={styles.info}>
          Events: {filteredData.events.length}
          <br />
          Rules: {filteredData.rules.length}
          <br />
          <br />
          Funk: {gameSettings.funkLevel}
          <br />
          Evil: {gameSettings.evilLevel}
          <br />
          Variety: {gameSettings.cardVariety}
        </div>
      )}
    </div>
  );
};

export default GameContainer;
