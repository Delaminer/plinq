import Head from "next/head";
import Home from "./index";
import "../styles/globals.css";
import React from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Plinq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {typeof window === "undefined" ? null : <Home />}
    </React.Fragment>
  );
}
