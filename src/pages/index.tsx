import React, { useState, useEffect } from "react";

import clsx from "clsx";
import Head from "next/head";

import GameContainer from "../components/GameContainer";

import styles from "../styles/Home.module.scss";

const footerLinks: { url: string; title: string }[] = [
  {
    title: "Suggest a new event",
    url: "https://airtable.com/shr5RxS1iU5lIEsb9",
  },
  {
    title: "Suggest a new rule",
    url: "https://airtable.com/shr6zFkPRJvNTujNr",
  },
];

function Home() {
  const [gameIsRunning, setGameIsRunning] = useState(false);

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
        <main>
          {/* This is the main game container, it is wrapped to allow for more 'website' stuff around it */}
          <GameContainer onChangeInGame={setGameIsRunning} />
        </main>
        <footer>
          <span className="footer_bg">
            2023 &copy;{" "}
            <a target="_blank" href="http://felixlaarmann.de/">
              Felix Laarmann
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://olivierbrueckner.de/">
              Olivier Brückner
            </a>
          </span>

          <ul className="footer_bg">
            {footerLinks.map((link, i) => (
              <li key={`footer-link-${i}`}>
                <a target="_blank" href={link.url}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Home;
