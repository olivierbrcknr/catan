import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie, setCookie } from "cookies-next";

import { type Language, printLabel } from "../../utils/language";
import TooltipLabel from "../TooltipLabel";

import styles from "./ZoomUI.module.scss";

interface ZoomUIProps {
  language: Language;
}

const ZOOM_SCALE = 0.1;
const BASE_REM = 10;

const ZoomUI = ({ language }: ZoomUIProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const zoomFromCookies = getCookie("zoom");

    if (typeof zoomFromCookies === "number") {
      setZoomLevel(zoomFromCookies);
    }
  }, []);

  useEffect(() => {
    document.querySelector("html").style.fontSize = zoomLevel * BASE_REM + "px";
  }, [zoomLevel]);

  const adjustZoomLevel = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
    setCookie("zoom", newZoomLevel);
  };

  return (
    <div className={styles.ZoomUI}>
      <div className={styles.BG}>
        <TooltipLabel label={printLabel("Zoom Out", language)}>
          <button
            className={styles.Button}
            onClick={() => adjustZoomLevel(zoomLevel - ZOOM_SCALE)}
          >
            <FontAwesomeIcon
              className={styles.Icon}
              icon="magnifying-glass-minus"
            />
          </button>
        </TooltipLabel>

        <TooltipLabel label={printLabel("Zoom In", language)}>
          <button
            className={styles.Button}
            onClick={() => adjustZoomLevel(zoomLevel + ZOOM_SCALE)}
          >
            <FontAwesomeIcon
              className={styles.Icon}
              icon="magnifying-glass-plus"
            />
          </button>
        </TooltipLabel>

        <TooltipLabel label={printLabel("Reset Zoom", language)}>
          <button className={styles.Button} onClick={() => adjustZoomLevel(1)}>
            <FontAwesomeIcon className={styles.Icon} icon="rotate-left" />
          </button>
        </TooltipLabel>
      </div>
    </div>
  );
};
export default ZoomUI;
