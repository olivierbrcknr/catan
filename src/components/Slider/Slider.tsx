import React, { useState, useEffect } from "react";

import clsx from "clsx";

import styles from "./Slider.module.scss";

interface SliderProps {
  onChange: (v: number) => void;
  value: number;
  min: number;
  max: number;
  labelMin?: string;
  labelMax?: string;
}

const Slider = ({
  onChange,
  value,
  min,
  max,
  labelMin,
  labelMax,
}: SliderProps) => {
  const handleChange = (evt) => {
    onChange(parseInt(evt.target.value));
  };

  return (
    <div className={styles.Slider}>
      <div className={styles.Label}>{labelMin ?? min}</div>

      <div className={styles.SliderContainer}>
        <div className={styles.Track} />

        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
        />
      </div>

      <div className={styles.Label}>{labelMax ?? max}</div>
    </div>
  );
};
export default Slider;
