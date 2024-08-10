import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UseAuth } from "../../context/Auth";

const NavBar = ({ className }: any) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { logout, user } = UseAuth();
  
  const logoutHandler = useCallback(async () => {
    try {
      await logout();
      router.push("/auth");
    } catch (_) {
      setError("You are already logged out!");
    }
  }, []);

  return (
    <div className={className.navbar}>
      {!user && (
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
      )}
      {user && (
        <>
          <div className={className.navbar__item}>
            <Link href="/profile" className={className.navbar__link}>
              Profile
            </Link>
          </div>
          <div className={className.navbar__item}>Hello, {user.firstName}</div>
          <div className={className.navbar__item}>
            <button onClick={logoutHandler} className={className.navbar__btn}>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
