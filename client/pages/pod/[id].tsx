import React, {Fragment} from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { parseRss } from "../../lib/rss";

type Props = {
  parsedFeed: any
}

const FilterPods: React.FC<Props> = ({parsedFeed}) => {
  console.log(parsedFeed.items);

  const selectedPod = parsedFeed.items.map((item: string, i: number) => (<li key={i}>
    <img src={item.itunes.image} width="120" height="60" alt={item} />
  </li>))

  return <Fragment>
    <div>
      <ul>
        {parsedFeed && selectedPod}
      </ul>
    </div>
  </Fragment>;
};

export async function getStaticProps<GetStaticProps>(
  ctx: GetStaticPropsContext
) {
  const ctxId = ctx?.params?.id;
  const respond = await fetch(`${process.env.CMS_URI}/api/podcasts/${ctxId}`);
  const podcast = await respond.json();

  const parsedFeed = await parseRss(podcast.feedUrl)
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
    params: {
      id: pod.id,
    },
  }));

  return { paths, fallback: "blocking" };
}

export default FilterPods;
