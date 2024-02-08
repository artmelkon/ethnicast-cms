import NavBar from './navbar';
import classes from './index.module.scss';

const Header = () => {
  return <header className={classes.header}>
    <NavBar />
  </header>
}

export default Header;
