import { useContext } from "react";
import { NavigationContext } from "@/providers/Globals/nav-context";

const NavBar = () => {
  const user = useContext(NavigationContext);
  console.log(user);

  return (
    <div>
      <ul>
        <li>Home</li>
        <li>Sign-In</li>
        <li>{user.name}</li>
      </ul>
    </div>
  );
};

export default NavBar;
