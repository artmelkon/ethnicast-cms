import Header from "../Header";
import SideBar from "../SideBar";
import Footer from "../Footer";
import classes from "./index.module.scss";

const LayoutTemplate: React.FC<any> = ({ children }) => {
  return (
    <div className={classes.container}>
      <header className={classes.header}><Header /></header>
      <div className={classes.main}>
        <SideBar />
        <main className={classes.content}>{children}</main>
      </div>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutTemplate;
