import React, {Fragment} from "react";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import { CloseModalOnRouteChange } from "@component/CloseModalOnRouteChange";
import Head from "next/head";

import { Header } from "@component/Header";
import NavBar from "@component/NavBar";
import Footer from "@component/Footer";

const LayoutTemplate: React.FC<any> = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Ethnicast</title>
      </Head>
      <NavBar />
      <main>{children}</main>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default LayoutTemplate;
