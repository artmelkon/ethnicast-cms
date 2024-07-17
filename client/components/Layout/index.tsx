import React, { Fragment } from "react";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";

// import NavBar from "@component/NavBar";
import Header from "@component/Header";
import SideBar from "@component/SideBar";
import Footer from "@component/Footer";
import classes from "./index.module.scss";

const LayoutTemplate: React.FC<any> = ({ children }) => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.main}>
        <SideBar />
        <div className={classes.content}>{children}</div>
      </main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutTemplate;
