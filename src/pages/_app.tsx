// import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../styles/variables.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

const { library, config } = require("@fortawesome/fontawesome-svg-core");

library.add(far, fas, faTwitter, faFontAwesome);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
