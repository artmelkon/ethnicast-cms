import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { User } from "payload/generated-types";

type Login = (args: (email: string, password: string) => void) => Promise<void>;
type Logout = () => Promise<void>;
type AuthContext = {
  user?: User | null;
  setUser: (user: User | null) => void;
  login: Login;
  logout: Logout;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();

  const login = useCallback<Login>(async (args) => {
    const res = await fetch(`${process.env.CMS_URI}/api/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!res.ok) throw new Error("Invalid login!");
    const json = await res.json();
    setUser(json);
  }, []);

  const logout = useCallback<Logout>(async () => {
    const res = await fetch(`${process.env.CMS_URI}/api/users/logout`, {
      method: "POST",
      // This line is a warning from Payload docs "Make sure to include cookies with fetch"
      credentials: "include",
    });

    if (!res.ok) throw new Error("There was a problem while logging out.");
    setUser(null);
  }, []);

  // On mount, get user and fetch user self
  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.CMS_URI}/api/users/me`, {
        credentials: "include",
      });
      // if (!res.ok)
      //   throw new Error("Something went wrong. Can't authenticate the user");
      const json = await res.json();
      setUser(json.user || null);
    })();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, login, logout }}>
      {children}
    </Context.Provider>
  );
};

type UseAuth<T = User> = () => AuthContext;
export const useAuth: UseAuth = () => useContext(Context);
