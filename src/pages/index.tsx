import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function Home() {
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
        <div>Hello</div>
      </main>
    </>
  );
}
