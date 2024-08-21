import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../context/Auth";

import { MediaProvider } from "../context/media-context";
import Layout from "../components/Layout";
import "../styles/globals.scss";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
