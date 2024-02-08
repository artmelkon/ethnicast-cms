import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import classes from "./navbar.module.scss";
import Logo from "../../public/logo.svg";

const NavBar = () => {
  const { data: session, status } = useSession();
  console.log("navbar status ", status);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbar__col}>
        <Link href="/" className={classes.logo}>
          <Image
            src={`/logo-hq.png`}
            alt="Eethnicast Logo"
            width={50}
            height={50}
          />
          <span className={classes.logo__text}>ethnicast</span>
        </Link>
      </div>
      <div className={classes.navbar__col}>
        <form className={classes.form}>
          <input type="search" className={classes.searchbar} />
        </form>
      </div>
      <div className={classes.navbar__col}>
        <ul>
          {!session && status !== "loading" ? (
            <>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/auth">Sign In</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>Hello, {session?.user?.user?.firstName}!</li>
              <li>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
