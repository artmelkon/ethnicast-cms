import React from "react";
import Link from "next/link";
import cn from "classnames";

import classes from "./index.module.scss";

const menuList = [
  { id: "1b", podcast: "PBD", episode: "EU Threatens Tucker Carlson" },
  { id: "2b", podcast: "Rearrange", episode: "#185 Սերգեյ Սարգսյան" },
  { id: "3b", podcast: "The Joe Rogan", episode: "#2099 - Aaron Rodgers" },
];

interface Menu {
  id: number;
  menu: string;
}

const footerMenuList = [
  { id: "1c", title: "Privacy Policy", url: "/us/privacy-policy" },
  { id: "2c", title: "Terms & Conditions", url: "/us/terms-n-conditions" },
];

interface FooterNav {
  id: number;
  title: string;
  url: string;
}
const SideBar: React.FC<Menu> = () => {
  const menu = menuList.map((item) => {
    return (
      <li key={item.id} className={classes.sidenav1__item}>
        <Link href="#" className={classes.sidenav1__link}>
          <h4>{item.podcast} /</h4> {item.episode}
        </Link>
      </li>
    );
  });

    const footerMenu = footerMenuList.map((item: any) => (
      <li key={item.id} className={classes.sidenav2__item}>
        <Link href={item.url} className={classes.sidenav2__link}>
          {item.title}
        </Link>
      </li>
    ));
  
  return (
    <section className={classes.sidebar}>
      <div className={cn(classes.sidenav1)}>
        <h3 className={classes.sidenav1__title}>My Selections</h3>
        <ul className={classes.sidenav1__list}>{menu}</ul>
      </div>
      <div className={classes.sidenav2}>
          <ul className={classes.sidenav2__list}>{footerMenu}</ul>
      </div>
    </section>
  );
};

export default SideBar;
