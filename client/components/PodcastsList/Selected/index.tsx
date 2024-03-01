import { Fragment } from "react";
import Image from "next/image";

import classes from "./index.module.scss";

const SelectedPodcst = ({ parsedFeed }: any) => {
  const { title, image, description } = parsedFeed;
  console.log("arsed feed ", parsedFeed.items);
  const selectedPod = parsedFeed.items.map((item: string, i: number) => (
    <li key={i} className={classes.episodes__item}>
      <div className={classes.episodeCnt}>
        <div className={classes.episode}>
          <div className={classes.episode__img}>
            <img src={item.itunes.image} alt={item} />
          </div>
          <div className={classes.episode__text}>
            <h4 className={classes.episode__title}>{item.title}</h4>
            <div
              className={classes.episode__subText}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
          </div>
        </div>
      </div>
    </li>
  ));
  return (
    <div className={classes.podcaster}>
      <div className={classes.podcaster__box}>
        <div>
          <div className={classes.podcaster__card}>
            <div className={classes.podcaster__img}>
              <img src={image.url} alt={title} />
            </div>
            <div className={classes.podcaster__text}>
              <h6>Podcast</h6>
              <h2 className={classes.headingPrimary}>{title}</h2>
              <h5 className={classes.headingSecondary}>About</h5>
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
          </div>
          <ul className={classes.episode__list}>{parsedFeed && selectedPod}</ul>
          <div className={classes.podcast__footer}>Podcast Footer</div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPodcst;
