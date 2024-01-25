import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

import classes from "./index.module.scss";

const NavBar = () => {
    // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   `${process.env.CMS_URI}/api/globals/main-menu?depth=1`,
  //   fetcher
  // );
  // if (error) return <p>error</p>;
  // const globals = {
  //   mainMenu: data,
  // };

  const { data: session, status } = useSession();
  console.log('navbar status ', status)
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Ethnicast</div>
      </Link>
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
            <li style={{ color: "white", fontWeight: "600" }}>
              Hello, {session?.user?.user?.firstName}!
            </li>
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
    </header>
  );
};

export default NavBar;
