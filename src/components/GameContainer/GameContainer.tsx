import React, { useState, useEffect } from "react";

import clsx from "clsx";

import { fetchAirTableData } from "../../utils/airtable";
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

export interface GameContainerProps {}

const MAX_STEPS = 2;

const isDev = process.env.NODE_ENV === "development";

const GameContainer = ({}: GameContainerProps) => {
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
      points: 2,
    },
    {
      isActive: false,
      color: "orange",
      points: 2,
    },
    {
      isActive: false,
      color: "blue",
      points: 2,
    },
    {
      isActive: false,
      color: "white",
      points: 2,
    },
    {
      isActive: false,
      color: "green",
      points: 2,
    },
    {
      isActive: false,
      color: "brown",
      points: 2,
    },
  ]);

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    funkLevel: 5,
    evilLevel: 5,
    eventFrequency: 2,
  });

  const [filter, setFilter] = useState<CardFilter>({});

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

  return (
    <div className={styles.GameContainer}>
      {gameIsRunning ? (
        <GameMain
          hasShipExtension={filter.expansionPacks?.has("Cities and Knights")}
          players={currentPlayers}
          setPlayers={setCurrentPlayers}
          onClickCancelGame={() => {
            setGameIsRunning(false);
          }}
          gameSettings={gameSettings}
          filteredData={filteredData}
        />
      ) : (
        <GameScreenSetup
          players={currentPlayers}
          onChangePlayers={setCurrentPlayers}
          onClickStart={() => {
            setGameIsRunning(true);
          }}
          gameSettings={gameSettings}
          onChangeSettings={setGameSettings}
          activeFilters={filter}
          onChangeFilters={setFilter}
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
        </div>
      )}
    </div>
  );
};

export default GameContainer;
