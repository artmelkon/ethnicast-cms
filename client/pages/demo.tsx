import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Layout from "@/components/Layout";
import { NavigationContext } from "@/providers/Globals/nav-context";

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
