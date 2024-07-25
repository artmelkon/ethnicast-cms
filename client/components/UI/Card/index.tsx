import Link from "next/link";

import classes from "./index.module.scss";

const Card: React.FC<{
  slug: string;
  data: any;
  bgcolorSelector: string;
}> = ({ slug, data, bgcolorSelector }) => {
  // console.log("card slug: ", slug);
  // console.log("card data: ", data);
  console.log("card data: ", data);
  console.log("card title: ", data.title);
  console.log("card bgcolor: ", bgcolorSelector);
  console.log(
    "Book Cover: ",
    `${process.env.CMS_URI}/media/${data?.bookCoverData?.[0].filename}`
  );
  console.log("Book Cover Alt: ", data?.bookCoverData?.[0].alt);

  const id = data.id ?? data._id;
  const audiobookImgUrl =
    data?.publisher_data?.bookCover?.url ??
    `${process.env.CMS_URI}/media/${data?.bookCoverData?.[0].filename}`;
  const audiobookAlt =
    data?.publisher_data?.bookCover?.alt ?? data?.bookCoverData?.[0].alt;

  return (
    <Link href={`/${slug}/${id}`} key={id}>
      <div
        className={classes.card}
        style={{ backgroundColor: bgcolorSelector }}
      >
        {slug === "podcast" && (
          <div className={classes.card__image}>
            <img src={data.image.url} alt={data.image.title} />
          </div>
        )}
        {slug === "audiobook" && (
          <div className={classes.card__image}>
            <img src={audiobookImgUrl} alt={audiobookAlt} />
          </div>
        )}
        <div className={classes.card__body}>
          <h3 className={classes.card__title}>{data.title}</h3>
        </div>
      </div>
    </Link>
  );
  return <h1>Card</h1>;
};

export default Card;
