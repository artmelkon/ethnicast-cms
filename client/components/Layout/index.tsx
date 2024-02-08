import React, { Fragment } from "react";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import Head from "next/head";

// import NavBar from "@component/NavBar";
import Header from "@component/Header";
import Footer from "@component/Footer";

const LayoutTemplate: React.FC<any> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default LayoutTemplate;
