import NavBar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import classes from "./index.module.scss";
import Icon from "../../utilities/icon";

const Header = () => {
  return (
    <>
      <Link href="/">
        <Image
          src={`/logo-hq.png`}
          alt="Eethnicast Logo"
          width={50}
          height={50}
          className={classes.logo}
        />
      </Link>
      <form className={classes.search}>
        <input
          type="search"
          name="search"
          color="#000"
          className={classes.search__input}
          placeholder="Search podcast"
        />
        <button className={classes.search__btn}>
          <Icon
            icon="magnifying-glass"
            className={classes.search__icon}
          />
        </button>
      </form>
      <NavBar className={classes} />
    </>
  );
};

export default Header;
