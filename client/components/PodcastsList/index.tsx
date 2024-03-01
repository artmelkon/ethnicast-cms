import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.scss";
import { Podcast } from "payload/generated-types";
interface PodsProps {
  pods: Podcast[];
}
const PodcastList: React.FC<PodsProps> = ({ pods }) => {
  // console.log(pods);
  const podcast = pods.map((pod: any, i: number) => (
    <li key={i} className={classes.podcast__item}>
      <Link href={`/podcast/${pod.id}`} className={classes.card__item}>
        <figure className={classes.podcast__figure}>
          <img
            src={pod.image.url}
            alt={pod.image.title}
            className={classes.podcast__img}
          />
          <figcaption className={classes.podcast__title}>{pod.title}</figcaption>
        </figure>
      </Link>
    </li>
  ));
  return (
    <div className={classes.podcast}>
      <h2 className={classes.podcast__heading}>Home Podcast</h2>
      <ul className={classes.podcast__list}>{pods && podcast}</ul>
    </div>
  );
};

export default PodcastList;
