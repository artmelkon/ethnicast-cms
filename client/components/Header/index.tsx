import NavBar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import { MdSearch } from "react-icons/md";

import classes from "./index.module.scss";

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
          <MdSearch className={classes.search__icon} />
        </button>
      </form>
      <NavBar className={classes} />
    </>
  );
};

export default Header;
