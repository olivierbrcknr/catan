import clsx from "clsx";

import Button from "../Button";
import type { Player } from "../GameContainer/types";

import styles from "./GameWinnerPopover.module.scss";

export interface GameWinnerPopoverProps {
  winner: Player;
  onDone: () => void;
}

const GameWinnerPopover = ({ winner, onDone }: GameWinnerPopoverProps) => {
  return (
    <div className={clsx(styles.GameWinnerPopover, `color-${winner.color}`)}>
      <div className={styles.Name}>{winner.name} won!</div>
      <Button onClick={onDone}>Done</Button>
    </div>
  );
};

export default GameWinnerPopover;
