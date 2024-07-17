import Head from "next/head";
import { Fragment } from "react";

import AudiobookList from "@component/AudiobookList";

const AudioBookPage = ({ audiobooks }: { audiobooks: any }) => {
  return (
    <Fragment>
      <Head>
        <title>Ethnicast Audiobooks</title>
      </Head>
      <AudiobookList data={audiobooks} />
    </Fragment>
  );
};

export async function getStaticProps<GetStaticProps>() {
  const aubioBooksReq = await fetch(
    `${process.env.CMS_URI}/api/audiobooks?depth=1`
  );
  const audiobooks = await aubioBooksReq.json();

  return {
    props: {
      audiobooks: audiobooks.docs,
    },
  };
}

export default AudioBookPage;
