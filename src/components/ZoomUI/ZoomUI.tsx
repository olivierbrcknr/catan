import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

import Button from "../Button";

import styles from "./ZoomUI.module.scss";

interface ZoomUIProps {}

const ZOOM_SCALE = 0.1;
const BASE_REM = 10;

const ZoomUI = ({}: ZoomUIProps) => {
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

  // // we can use it anywhere
  // getCookies();
  // getCookie('key');
  // setCookie('key', 'value');
  // deleteCookie('key');

  return (
    <div className={styles.ZoomUI}>
      <Button onClick={() => adjustZoomLevel(zoomLevel + ZOOM_SCALE)}>
        Zoom In
      </Button>
      <Button onClick={() => adjustZoomLevel(zoomLevel - ZOOM_SCALE)}>
        Zoom Out
      </Button>
      <Button onClick={() => adjustZoomLevel(1)}>Reset Zoom</Button>
    </div>
  );
};
export default ZoomUI;
