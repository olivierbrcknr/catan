import clsx from "clsx";

import type { Player } from "../../game/types";
import { type Language, printLabel } from "../../utils/language";
import Button from "../Button";

import styles from "./GameWinnerPopover.module.scss";

export interface GameWinnerPopoverProps {
  winner: Player;
  onDone: () => void;
  language: Language;
}

const GameWinnerPopover = ({
  winner,
  onDone,
  language,
}: GameWinnerPopoverProps) => {
  return (
    <div className={clsx(styles.GameWinnerPopover, `color-${winner.color}`)}>
      <div className={styles.Name}>
        {winner.name} {printLabel("won", language)}
      </div>
      <Button onClick={onDone}>
        {printLabel("WinnerButtonLabel", language)}
      </Button>
    </div>
  );
};

export default GameWinnerPopover;
