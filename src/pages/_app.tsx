// import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../styles/variables.scss";
import "../styles/globals.scss";
import clsx from "clsx";
import type { AppProps } from "next/app";

import { useIsDarkmode } from "../utils/hooks";
import useKeyboardFocus from "../utils/useKeyboardFocus";

const { library, config } = require("@fortawesome/fontawesome-svg-core");

library.add(far, fas, faTwitter, faFontAwesome);

export default function App({ Component, pageProps }: AppProps) {
  const isDark = useIsDarkmode();
  const keyboardFocus = useKeyboardFocus();

  return (
    <div
      className={clsx(
        isDark && "is-dark-mode",
        keyboardFocus && "keyboard-focus"
      )}
    >
      <Component {...pageProps} />
    </div>
  );
}
