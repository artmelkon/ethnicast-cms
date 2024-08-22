import { GetStaticProps } from "next";

import AudiobookList from "../components/AudiobookList";
import PodcastList from "../components/PodcastsList";

interface ContentType {
  podcasts: any;
  audiobooks: any;
}

const Page: React.FC<ContentType> = ({ podcasts: pods, audiobooks }) => {

  return (
    <div className="card-wrapper">
      <PodcastList data={pods} />
      <AudiobookList data={audiobooks} />
    </div>
  );
};

export async function getStaticProps<GetStaticProps>() {
  const podsReq = await fetch(`${process.env.CMS_URI}/api/podcasts?limit=3`);
  const podcasts = await podsReq.json();
  const audiobookReq = await fetch(
    `${process.env.CMS_URI}/api/audiobooks?limit`
  );
  const audiobooks = await audiobookReq.json();

  return {
    props: {
      podcasts: podcasts.docs,
      audiobooks: audiobooks.docs,
    },
  };
}

export default Page;
