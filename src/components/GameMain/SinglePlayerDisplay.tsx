import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import Button from "../Button";
import type { Player } from "../../game/types";

import styles from "./SinglePlayerDisplay.module.scss";

export interface SinglePlayerDisplayProps {
  player: Player;
  onChangePoints: (v: number) => void;
  maxPoints: number;
}

const SinglePlayerDisplay = ({
  player,
  onChangePoints,
  maxPoints,
}: SinglePlayerDisplayProps) => {
  if (!player.isActive) return null;

  const addPoint = () => {
    onChangePoints(player.points + 1);
  };
  const removePoint = () => {
    let p = player.points - 1;
    if (p <= 0) p = 0;
    onChangePoints(p);
  };

  return (
    <div className={clsx(styles.SinglePlayerDisplay, `color-${player.color}`)}>
      <div className={styles.Name}>{player.name}</div>
      <div className={styles.PointBarContainer}>
        <div
          className={styles.PointBar}
          style={{
            width: (player.points / maxPoints) * 100 + "%",
          }}
        >
          <div className={styles.PointCount}>{player.points}</div>
        </div>
        <div className={styles.MaxPoints}>{maxPoints}</div>
      </div>

      <div className={styles.PointButtonContainer}>
        <Button className={styles.PointButton} isSmall onClick={removePoint}>
          <>
            <FontAwesomeIcon className={styles.Button_Icon} icon="minus" />
          </>
        </Button>
        <Button className={styles.PointButton} isSmall onClick={addPoint}>
          <>
            <FontAwesomeIcon className={styles.Button_Icon} icon="plus" />
          </>
        </Button>
      </div>
    </div>
  );
};
export default React.memo(SinglePlayerDisplay);
