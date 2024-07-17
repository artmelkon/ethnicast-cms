import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = ({ className }: any) => {
  const { data: session, status } = useSession();

  return (
    <div className={className.navbar}>
      {!session && status !== "loading" ? (
        <>
          <div className={className.navbar__item}>
            <Link href="/about" className={className.navbar__link}>
              About
            </Link>
          </div>
          <div className={className.navbar__item}>
            <Link href="/auth" className={className.navbar__link}>
              Sign In
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={className.navbar__item}>
            <Link href="/profile" className={className.navbar__link}>
              Profile
            </Link>
          </div>
          <div className={className.navbar__item}>
            Hello, {session?.user?.user?.firstName}!
          </div>
          <div className={className.navbar__item}>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className={className.navbar__btn}
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
