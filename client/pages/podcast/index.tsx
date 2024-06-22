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
      <PodcastList data={pods} />
    </Fragment>
  );
};

export async function getStaticProps<GetStaticProps>() {
  const feedsReq = await fetch(`${process.env.CMS_URI}/api/podcasts`);
  const pods = await feedsReq.json();

  return {
    props: {
      pods: pods.docs,
    },
  };
}

export default Podcast;
