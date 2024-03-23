import NavBar from "./navbar";
import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.scss";
import SearchForm from '@component/UI/Search';



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
      <SearchForm />
      <NavBar className={classes} />
    </>
  );
};

export default Header;
