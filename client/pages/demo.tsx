import React, { useState } from "react";
import NavBar from "@root/components/NavBar";
import Layout from "@root/components/RenderBlock";
import { NavigationContext } from "@root/providers/Globals/nav-context";

export interface UserType {
  isLoggedIn: boolean;
  name: string;
}

const Demo = () => {
  const [user] = useState<UserType>({
    isLoggedIn: true,
    name: "Arthur",
  });

  console.log(user);

  return (
    <NavigationContext.Provider value={user}>
      <Layout>
        <NavBar />
        <div>Hello</div>
      </Layout>
    </NavigationContext.Provider>
  );
};

export default Demo;
