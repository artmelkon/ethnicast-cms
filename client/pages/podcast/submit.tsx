import _ from "lodash";

import PodcastSubmit from "../_components/PodcastsList/Submit";

const FeedSubmit: React.FC<any> = (props) => {
  return <PodcastSubmit {...props} />;
};

export async function getStaticProps() {
  const languageReq = await fetch(`${process.env.CMS_URI}/api/languages`);
  const languages = await languageReq.json();

  const genreReq = await fetch(`${process.env.CMS_URI}/api/podcast-genres`);
  const genres = await genreReq.json();

  return {
    props: {
      languages: languages.docs,
      genres: genres.docs,
    },
  };
}

export default FeedSubmit;
