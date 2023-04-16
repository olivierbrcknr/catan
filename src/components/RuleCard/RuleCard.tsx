import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import type { InGameRule } from "../GameContainer/types";

import styles from "./RuleCard.module.scss";

export interface RuleCardProps {
  rule: InGameRule;
}

const isDev = process.env.NODE_ENV === "development";

const RuleCard = ({ rule }: RuleCardProps) => {
  return (
    <div className={clsx(styles.RuleCard)}>
      <div className={styles.Icon}>
        {/* @ts-ignore */}
        <FontAwesomeIcon icon={"fa-" + rule.icon} />
      </div>
      <div className={styles.Title}>{rule.name}</div>
      <div className={styles.Description}>{rule.description}</div>
    </div>
  );
};

export default RuleCard;
