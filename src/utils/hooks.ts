import { useEffect, useState } from "react";

import { MOBILE_WIDTH } from "./constants";

// Window
const getWindowDimensions = () => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    windowWidth: 0, // default value before init
    windowHeight: 0, // default value before init
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    setIsMobile(windowWidth <= MOBILE_WIDTH);
  }, [windowWidth]);

  return isMobile;
};

export const useIsDarkmode = () => {
  const [isDarkmode, setIsDarkmode] = useState(false);

  useEffect(() => {
    const checkIfDarkmode = () => {
      setIsDarkmode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    };

    checkIfDarkmode();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkIfDarkmode);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", checkIfDarkmode);
    };
  }, []);

  return isDarkmode;
};
