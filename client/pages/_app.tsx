import React, { Fragment, useState } from "react";
import { AppProps, AppContext } from "next/app";
import useSWR from "swr";

import { GlobalsProvider } from "../providers/Globals";
import { Header } from "@/components/Header";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import { CloseModalOnRouteChange } from "../components/CloseModalOnRouteChange";
import Layout from "@/components/Layout";
import { MainMenu } from "payload/generate-types";

import "../css/app.scss";

export interface IGlobals {
  mainMenu: MainMenu;
}

const EthnicasApp = ({ Component, pageProps }: AppProps) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.CMS_URI}/api/globals/main-menu?depth=1`,
    fetcher
  );
  if (error) return <p>error</p>;
  const globals = {
    mainMenu: data,
  };
  return (
    <Fragment>
      <GlobalsProvider {...globals}>
        <ModalProvider
          classPrefix="form"
          transTime={0}
          zIndex="var(--modal-z-index)"
        >
          <CloseModalOnRouteChange />
          <Header />
          <Component {...pageProps} />
          <ModalContainer />
        </ModalProvider>
      </GlobalsProvider>
    </Fragment>
  );
};

export default EthnicasApp;
