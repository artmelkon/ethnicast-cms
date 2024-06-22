import _ from "lodash";

import PodcastSubmit from "../../components/PodcastsList/Submit";

const FeedSubmit: React.FC<any> = (props) => {
  return <PodcastSubmit {...props} />;
};

export async function getStaticProps() {
  const languageReq = await fetch(
    `${process.env.CMS_URI}/api/categories?where[slug][equals]=language&depth=1`
  );
  const language = await languageReq.json();
  const languageList = await _.map(
    language.docs[0].subcategory,
    (item) => item
  );

  console.log(languageList);
  const genreReq = await fetch(
    `${process.env.CMS_URI}/api/categories?where[slug][equals]=genre&depth=1`
  );
  const genre = await genreReq.json();
  const genreList = _.map(genre.docs[0].subcategory, (item) => item);

  return {
    props: {
      languages: languageList,
      genres: genreList,
    },
  };
}

export default FeedSubmit;
