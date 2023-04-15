import React, { useState, useEffect } from "react";

import clsx from "clsx";

import { fetchAirTableData } from "../../utils/airtable";
import dummyData from "../../utils/dummyObject";
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
  const [activeData, setActiveData] = useState<AirtableData>({
    events: [],
    rules: [],
  });

  const [gameIsRunning, setGameIsRunning] = useState(false);

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([
    {
      isActive: false,
      color: "red",
    },
    {
      isActive: false,
      color: "orange",
    },
    {
      isActive: false,
      color: "blue",
    },
    {
      isActive: false,
      color: "white",
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
      const data = dummyData;
      // const data = await fetchAirTableData();
      setAirTableData(data as AirtableData);
      console.log(data);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setActiveData(filterData(airTableData, filter, gameSettings));
  }, [airTableData, filter, gameSettings]);

  useEffect(() => {
    console.log("filtered");
    console.log(activeData);
  }, [activeData]);

  if (isDev) {
    // console.log("players", currentPlayers);
    // console.log("settings", gameSettings);
    // console.log("filter", filter);
  }

  return (
    <div className={styles.GameContainer}>
      {gameIsRunning ? (
        <GameMain
          players={currentPlayers}
          onClickCancelGame={() => {
            setGameIsRunning(false);
          }}
          gameSettings={gameSettings}
          activeData={activeData}
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
          Events: {activeData.events.length}
          <br />
          Rules: {activeData.rules.length}
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
