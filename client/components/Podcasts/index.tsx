import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import classes from './index.module.scss';
import { Podcast } from "payload/generated-types";
interface PodsProps {
  pods: Podcast[];
}
const PodcastList: React.FC<PodsProps> = ({ pods }) => {
  // console.log(pods);
  const podcast = pods.map((pod: any, i: number) => (
    <div key={i}>
      <Link href={`/pod/${pod.id}`}>
        <img
          src={pod.image.url}
          width="150"
          height="100"
          alt={pod.image.title}
        />
        <div>
          <h6>{pod.title}</h6>
        </div>
      </Link>
    </div>
  ));
  return (
    <Fragment>
      <h2>Home Podcast</h2>
      <div className="constainer">{pods && podcast}</div>
    </Fragment>
  );
};

export default PodcastList;
