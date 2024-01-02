import { createContext } from "react";
import { UserType } from "@root/pages/demo";

interface UserProps {
  user: UserType;
}

export const NavigationContext = createContext<UserProps | undefined>(
  undefined
);

// export const NavigationContextProvider = ({children}: any) => {
//   const
//   return(
//     <NavigationContext.Provider value={}>
//       {children}
//     </NavigationContext.Provider>
//   )
// }
