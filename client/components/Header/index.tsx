import { useState, useEffect } from "react";
import NavBar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import _ from "lodash";

import classes from "./index.module.scss";
import SearchForm from "../UI/Search";

const Header = () => {
  const router = useRouter();
  const pathName = router.pathname;

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
      {/* {pathName !== "/" && <SearchForm />} */}
      <NavBar className={classes} />
    </>
  );
};

export default Header;
