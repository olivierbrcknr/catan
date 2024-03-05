import React, { useState } from "react";

import clsx from "clsx";
import Head from "next/head";

import GitHubButton from "react-github-btn";

import GameContainer from "../components/GameContainer";
import LanguageSelect from "../components/LanguageSelect";
import ZoomUI from "../components/ZoomUI";
import {
  type Language,
  type Label as LanguageLabel,
  printLabel,
} from "../utils/language";

import styles from "../styles/Home.module.scss";

const footerLinks: { url: string; title: LanguageLabel }[] = [
  {
    title: { en: "Suggest a New Card", de: "Regel Vorschlagen" },
    url: "https://airtable.com/shr5RxS1iU5lIEsb9",
  },
  // {
  //   title: { en: "GitHub", de: "GitHub" },
  //   url: "https://github.com/olivierbrcknr/catan",
  // },
];

function Home() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [language, setLanguage] = useState<Language>("de");

  return (
    <>
      <Head>
        <title>Fate of Catan</title>
        <meta
          name="description"
          content="A small virtual layer for your Catan board game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Fate of Catan" />
        <meta name="apple-mobile-web-app-title" content="Fate of Catan" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" href="/AppIcon.png" />
      </Head>
      <div className={clsx(styles.Wrapper, gameIsRunning && styles.isGame)}>
        <LanguageSelect onChange={setLanguage} />
        <ZoomUI language={language} />
        <main>
          {/* This is the main game container, it is wrapped to allow for more 'website' stuff around it */}
          <GameContainer
            language={language}
            onChangeInGame={setGameIsRunning}
          />
        </main>
        <footer>
          <span className="footer_bg">
            2023 &copy;{" "}
            <a target="_blank" href="http://felixlaarmann.de/">
              Felix Laarmann
            </a>{" "}
            {printLabel("and", language)}{" "}
            <a target="_blank" href="https://olivierbrueckner.de/">
              Olivier Brückner
            </a>
          </span>

          <ul className="footer_bg">
            {footerLinks.map((link, i) => (
              <li key={`footer-link-${i}`}>
                <a target="_blank" href={link.url}>
                  {link.title[language]}
                </a>
              </li>
            ))}
            <li>
              <GitHubButton
                href="https://github.com/olivierbrcknr/catan"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-size="large"
                data-show-count="true"
                aria-label="Star olivierbrcknr/catan on GitHub"
              >
                Star
              </GitHubButton>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Home;
