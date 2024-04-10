import Link from "next/link";

import classes from "./index.module.scss";

const Card = ({ slug, data }) => {
  function bgcolorSelector() {
    const bgColorList = [
      "#414833",
      "#FB5607",
      "#FF006E",
      "#8338EC",
      "#3A86FF",
      "#004fc1",
      "#386641",
      "#e63946",
      "#003566",
      "#3a0ca3",
    ];
    const rN = Math.floor(Math.random() * 10);
    return bgColorList[rN];
  }
  if(slug === 'q') {
    const card = data?.map((item) => {
      console.log('q data: ', item._id)
      const randomBgColor = bgcolorSelector();
      return (
        <Link href={`/podcast/${item._id}`} key={item._id}>
          <div
            className={classes.card}
            style={{ backgroundColor: randomBgColor }}
          >
            {item.image.url && (
              <div className={classes.card__image}>
                <img src={item.image.url} alt={item.image.title} />
              </div>
            )}
            <div className={classes.card__body}>
              <h3 className={classes.card__title}>{item.title}</h3>
            </div>
          </div>
        </Link>
      );
    });
    return <div className={classes.card__container}>{card}</div>;  }
  if (slug === "languageId") {
    const card = data?.map((item) => {
      console.log('language data: ', item)
      const randomBgColor = bgcolorSelector();
      return (
        <Link href={`/podcast/${item.id}`} key={item.id}>
          <div
            className={classes.card}
            style={{ backgroundColor: randomBgColor }}
          >
            {item.image.url && (
              <div className={classes.card__image}>
                <img src={item.image.url} alt={item.image.title} />
              </div>
            )}
            <div className={classes.card__body}>
              <h3 className={classes.card__title}>{item.title}</h3>
            </div>
          </div>
        </Link>
      );
    });
    return <div className={classes.card__container}>{card}</div>;
  }
  if (slug === "genreId") {
    const card = data?.map((item) => {
      console.log('genre data: ', item)
      const randomBgColor = bgcolorSelector();
      return (
        <Link href={`/podcast/${item.id}`} key={item.id}>
          <div
            className={classes.card}
            style={{ backgroundColor: randomBgColor }}
          >
            {item.image.url && (
              <div className={classes.card__image}>
                <img src={item.image.url} alt={item.image.title} />
              </div>
            )}
            <div className={classes.card__body}>
              <h3 className={classes.card__title}>{item.title}</h3>
            </div>
          </div>
        </Link>
      );
    });
    return <div className={classes.card__container}>{card}</div>;
  }

  const card = data?.map((item) =>
    item.subcategory.map(({ id, name }) => {
      const randomBgColor = bgcolorSelector();

      return (
        <Link href={`/search/${slug}/${id}`} key={id}>
          <div
            className={classes.card}
            style={{ backgroundColor: randomBgColor }}
          >
            {/*img && <img src="" alt="" /> */}
            <div className={classes.card__body}>
              <h3 className={classes.card__title}>{name}</h3>
              <p>Spice up your day</p>
            </div>
          </div>
        </Link>
      );
    })
  );

  return <div className={classes.card__container}>{card}</div>;
};

export default Card;
