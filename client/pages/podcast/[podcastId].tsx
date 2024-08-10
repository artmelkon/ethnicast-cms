import React, { Fragment } from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { parseRss } from "../../lib/rss";

import SelectedPodcst from "../../components/PodcastsList/Selected";

type Props = {
  parsedFeed: any;
};

const FilterPods: React.FC<Props> = ({ parsedFeed }) => {
  return <SelectedPodcst parsedFeed={parsedFeed} />;
};

export async function getStaticProps<GetStaticProps>(
  ctx: GetStaticPropsContext
) {
  const ctxId = ctx?.params?.podcastId;
  console.log("podcast Id: ", ctxId);
  const respond = await fetch(`${process.env.CMS_URI}/api/podcasts/${ctxId}`);
  const podcast = await respond.json();

  const parsedFeed = await parseRss(podcast.feedUrl);
  return {
    props: {
      parsedFeed,
    },
  };
}

export async function getStaticPaths<GetStaticPaths>() {
  const respond = await fetch(`${process.env.CMS_URI}/api/podcasts`);
  const podcasts = await respond.json();
  const paths = podcasts.docs.map((pod: any) => ({
    params: { podcastId: pod.id },
  }));

  return { paths, fallback: "blocking" };
}

export default FilterPods;
