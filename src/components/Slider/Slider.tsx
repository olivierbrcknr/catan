import React from "react";

import * as RadixSlider from "@radix-ui/react-slider";
import clsx from "clsx";

import styles from "./Slider.module.scss";

interface SliderProps {
  onChange: (v: number) => void;
  value: number;
  min: number;
  max: number;
  labelMin?: string;
  labelMax?: string;
  name?: string;
  disabled?: boolean;
}

const Slider = ({
  onChange,
  value,
  min,
  max,
  labelMin,
  labelMax,
  name = "Slider",
  disabled = false,
}: SliderProps) => {
  const handleChange = (val: number[]) => {
    onChange(val[0]);
  };

  return (
    <div className={clsx(styles.Slider, disabled && styles.isDisabled)}>
      <div className={styles.Label}>{labelMin ?? min}</div>

      <RadixSlider.Root
        className={styles.SliderContainer}
        value={[value]}
        onValueChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
      >
        <RadixSlider.Track className={styles.Track}>
          <RadixSlider.Range className={styles.Range} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={styles.Thumb} aria-label={name} />
      </RadixSlider.Root>

      <div className={styles.Label}>{labelMax ?? max}</div>
    </div>
  );
};
export default Slider;
