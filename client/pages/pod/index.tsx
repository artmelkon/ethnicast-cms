import Head from "next/head";
import { Fragment } from "react";

import Podcasts from "@components/Podcast";

import { Podcast } from "payload/generated-types";

interface PodsProps {
  pods: Podcast[];
}

const Pod: React.FC<PodsProps> = ({ pods }) => {
  return (
    <Fragment>
      <Head>
        <title>Ethnicast Podcast</title>
      </Head>
      <Podcasts pods={pods} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const feedsReq = await fetch(`${process.env.CMS_URI}/api/podcasts`);
  const pods = await feedsReq.json();

  return {
    props: {
      pods: pods.docs,
    },
  };
}

export default Pod;
