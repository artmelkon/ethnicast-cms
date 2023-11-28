import React, { Fragment } from "react";
import { AppProps } from "next/app";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import { Header } from "../components/Header";
import { GlobalsProvider } from "../providers/Globals";
import { CloseModalOnRouteChange } from "../components/CloseModalOnRouteChange";
import { MainMenu } from "payload/generate-types";

import "../css/app.scss";

export interface IGlobals {
  mainMenu: MainMenu;
}

export const getAllGlobals = async (): Promise<IGlobals> => {
  const result = await fetch(
    `${process.env.CMS_URI}/api/globals/main-menu?depth=1`
  );
  const mainMenu = await result.json();
  return {
    mainMenu,
  };
};

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Fragment>
      <Component {...pageProps} />
      {/* <GlobalsProvider {...globals}>
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
      </GlobalsProvider> */}
    </Fragment>
  );
};

// const PayloadApp = (
//   appProps: AppProps & {
//     globals: IGlobals;
//   }
// ): React.ReactElement => {
//   const { Component, pageProps, globals } = appProps;

//   return (
//     <React.Fragment>
//       <GlobalsProvider {...globals}>
//         <ModalProvider
//           classPrefix="form"
//           transTime={0}
//           zIndex="var(--modal-z-index)"
//         >
//           <CloseModalOnRouteChange />
//           <Header />
//           <Component {...pageProps} />
//           <ModalContainer />
//         </ModalProvider>
//       </GlobalsProvider>
//     </React.Fragment>
//   );
// };

// export const getStaticProps = async () => {
//   // const appProps = await App.getInitialProps(appContext);

//   const globals = await getAllGlobals();

//   console.log("globals ", globals);

//   return {
//     props: {
//       globals,
//     },
//   };
// };

// PayloadApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);

//   const globals = await getAllGlobals();

//   return {
//     ...appProps,
//     globals,
//   };
// };

export default App;
