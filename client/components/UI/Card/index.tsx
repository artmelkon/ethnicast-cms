import Link from "next/link";

import classes from "./index.module.scss";

const Card: React.FC<{
  slug: string;
  data: any;
  bgcolorSelector: string;
}> = ({ slug, data, bgcolorSelector }) => {
  console.log("card slug: ", slug);
  console.log("card data: ", data);
  console.log("card bgcolor: ", bgcolorSelector);

  return (
    <Link href={`/${slug}/${data.id ?? data._id}`} key={data.id}>
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
            <img
              src={data.publisher_data.bookCover.url}
              alt={data.publisher_data.bookCover.alt}
            />
          </div>
        )}
        <div className={classes.card__body}>
          <h3 className={classes.card__title}>{data.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
