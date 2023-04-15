import React, { useState, useEffect } from "react";

import clsx from "clsx";

import type { Event } from "../GameContainer/types";

import styles from "./EventCard.module.scss";

export interface EventCardProps {
  event: Event;
}

const isDev = process.env.NODE_ENV === "development";

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div
      className={clsx(
        styles.EventCard,
        event.Type === "Temporary Event" && styles.typeTemporary,
        event.Type === "Until barbarian ship" && styles.typeBarbarianShip,
        event.Type === "One time event" && styles.typeOneTime
      )}
    >
      <div className={styles.Title}>{event.Name}</div>
      <div className={styles.Description}>{event.Description}</div>
    </div>
  );
};

export default EventCard;
