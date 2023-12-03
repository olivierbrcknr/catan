import React, { useState, useLayoutEffect } from "react";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

import styles from "./TooltipLabel.module.scss";

export interface TooltipLabelProps {
  children: JSX.Element;
  label: string | JSX.Element;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
}

const TooltipLabel = ({
  children,
  label,
  side = "bottom",
  align = "center",
  sideOffset = 2,
  delayDuration = 0,
}: TooltipLabelProps) => {
  // const [floatingLayer, setFloatingLayer] = useState<HTMLElement | undefined>();

  // useLayoutEffect(() => {
  //   setFloatingLayer(document.querySelector("#floating") as HTMLElement);
  // }, []);

  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      disableHoverableContent
    >
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild className={styles.Trigger}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal /*container={floatingLayer}*/>
          <RadixTooltip.Content
            className={styles.Content}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={-10}
            collisionPadding={8}
          >
            <div className={styles.Label}>{label}</div>
            <RadixTooltip.Arrow
              className={styles.Arrow}
              height={9}
              width={15}
            />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default React.memo(TooltipLabel);
