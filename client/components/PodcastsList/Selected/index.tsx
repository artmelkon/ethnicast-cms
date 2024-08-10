import { useContext, useState, useRef } from "react";
import { MdPlayArrow, MdOutlinePause, MdFilterList } from "react-icons/md";

import { MediaContext } from "../../../context/media-context";
import classes from "./index.module.scss";

const SelectedPodcst = ({ parsedFeed }: any) => {
  const { playMedia } = useContext(MediaContext);
  const { title, image, description } = parsedFeed;
  console.log("parsed feed ", parsedFeed.language);

  const selectedPod = parsedFeed.items.map((item: string, i: number) => (
    <li key={i} className={classes.episodes__item}>
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
          <input
            type="radio"
            onClick={() => playMedia(item.enclosure.url)}
            className={classes.audioplay__btn}
            name="play"
          />
        </div>
      </div>
    </li>
  ));
  return (
    <div className={classes.podcaster}>
      <div className={classes.podcaster__box}>
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
        <ul className={classes.episodes__list}>{parsedFeed && selectedPod}</ul>
        <div className={classes.podcast__footer}>Podcast Footer</div>
      </div>
    </div>
  );
};

export default SelectedPodcst;
