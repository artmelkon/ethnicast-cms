import {GetStaticProps, GetStaticPropsContext} from 'next';

import Podcast from './podcast'

const Page = (props: any) => {
  return <Podcast {...props} />
}


export async function getStaticProps() {
  const feedsReq = await fetch(`${process.env.CMS_URI}/api/podcasts`);
  const pods = await feedsReq.json();

  return {
    props: {
      pods: pods.docs,
    },
  };
}

export default Page;

