import React from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";

import SelectedAudiobook from "@component/AudiobookList/Selected";

type Props = {
  audiobook: any;
};

const FilterPods: React.FC<Props> = ({ audiobook }) => {
  console.log("audio book req: ", audiobook);
  return <SelectedAudiobook data={audiobook} />;
};

export async function getStaticProps<GetStaticProps>(
  ctx: GetStaticPropsContext
) {
  const ctxId = ctx?.params?.audiobookId;
  console.log("podcast Id: ", ctxId);
  const respond = await fetch(
    `${process.env.CMS_URI}/api/audiobooks/${ctxId}?depth=1`
  );
  const audiobook = await respond.json();

  return {
    props: {
      audiobook,
    },
  };
}

export async function getStaticPaths<GetStaticPaths>() {
  const respond = await fetch(`${process.env.CMS_URI}/api/audiobooks`);
  const audiobooks = await respond.json();
  const paths = audiobooks.docs.map((audiobook: any) => ({
    params: { audiobookId: audiobook.id },
  }));

  return { paths, fallback: "blocking" };
}

export default FilterPods;
