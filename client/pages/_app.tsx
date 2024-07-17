import React, { Fragment, useState } from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { MediaProvider } from "../context/media-context";
import Layout from "@component/Layout";
import "../styles/globals.scss";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session} baseUrl={process.env.NEXTAUTH_URL}>
      <MediaProvider>
        <Layout>
          <Head>
            <title>Ethnicast</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-wdith"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </MediaProvider>
    </SessionProvider>
  );
};

export default App;
