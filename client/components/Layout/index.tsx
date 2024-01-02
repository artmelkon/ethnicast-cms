import React, { Fragment, useContext } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </Fragment>);
};

export default Layout;
