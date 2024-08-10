import Header from "../Header";
import SideBar from "../SideBar";
import Footer from "../Footer";
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
