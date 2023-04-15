import Head from "next/head";

import GameContainer from "../components/GameContainer";

import styles from "../styles/Home.module.scss";

function Home() {
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
      </Head>
      <main>
        {/* This is the main game container, it is wrapped to allow for more 'website' stuff around it */}
        <GameContainer />
      </main>
    </>
  );
}

export default Home;
