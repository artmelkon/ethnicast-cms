import Head from "next/head";
import { Fragment } from "react";

import PodcastList from "@component/PodcastsList";

import { Podcast as PodcastType } from "payload/generated-types";

interface PodsProps {
  pods: PodcastType[];
}

const Podcast: React.FC<PodsProps> = ({ pods }) => {
  return (
    <Fragment>
      <Head>
        <title>Ethnicast Podcast</title>
      </Head>
      <PodcastList pods={pods} />
    </Fragment>
  );
};

export default Podcast;
