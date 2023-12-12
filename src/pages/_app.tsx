import "@fontsource-variable/inter";
import { faFontAwesome, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import type { AppProps } from "next/app";

import { useIsDarkmode } from "../utils/hooks";
import useKeyboardFocus from "../utils/useKeyboardFocus";

import "../styles/globals.scss";
import "../styles/variables.scss";

// eslint-disable-next-line
const { library } = require("@fortawesome/fontawesome-svg-core");

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
