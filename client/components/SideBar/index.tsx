import React from "react";
import Link from "next/link";
import cn from "classnames";
import { ImPodcast } from "react-icons/im";
import { ImBook } from "react-icons/im";

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
      <li key={item.id} className={classes.sidenavMyList__item}>
        <Link href="#" className={classes.sidenavMyList__link}>
          <h4>{item.podcast} /</h4> {item.episode}
        </Link>
      </li>
    );
  });

  const footerMenu = footerMenuList.map((item: any) => (
    <li key={item.id} className={classes.sidenavFooter__item}>
      <Link href={item.url} className={classes.sidenavFooter__link}>
        {item.title}
      </Link>
    </li>
  ));

  return (
    <section className={classes.sidebar}>
      <div className={classes.sidenavMenu}>
        <Link href="/podcast">
          <div className={classes.sidenavMenu__item}>
            <ImPodcast />
            <div className={classes.sidenavMenu__title}>podcast</div>
          </div>
        </Link>
        <Link href="/audiobook">
          <div className={classes.sidenavMenu__item}>
            <ImBook />
            <div className={classes.sidenavMenu__title}>audiobook </div>
          </div>
        </Link>
      </div>
      <div className={cn(classes.sidenavMyList)}>
        <h3 className={classes.sidenavMyList__title}>My Selections</h3>
        <ul className={classes.sidenavMyList__list}>{menu}</ul>
      </div>
      <div className={classes.sidenavFooter}>
        <ul className={classes.sidenavFooter__list}>{footerMenu}</ul>
      </div>
    </section>
  );
};

export default SideBar;
