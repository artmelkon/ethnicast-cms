import { useContext, useState, useRef } from "react";
import { MdPlayArrow, MdOutlinePause, MdFilterList } from "react-icons/md";
import _ from "lodash";
import Image from "next/image";

import { MediaContext } from "../../../context/media-context";
import classes from "./index.module.scss";

const SelectedAudiobook = ({ data }: any) => {
  console.log("audobook data: ", data);

  const { playMedia } = useContext(MediaContext);
  const {
    author_data: { authorName, description },
    title,
    publisher_data: {
      bookCover: { url, alt },
    },
    rawPlaylistTracks,
  } = data;

  // console.log("parsed feed ", parsedFeed.language);

  const selectedPod = _.map(
    rawPlaylistTracks,
    ({ audiofile: { id, title, mimeType, url } }, i: number) => {
      console.log("track title: ", title);
      console.log("track mp3: ", url);
      // {id, title, mimeType, url}

      return (
        <li key={id} className={classes.track__item}>
          <div className={classes.track}>
            {/* <div className={classes.episode__img}>
             <img src={item.itunes.image} alt={item} />
           </div> */}
            <div className={classes.track__text}>
              <h4 className={classes.track__title}>{title}</h4>
              {/* <div
                className={classes.episode__subText}
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div> */}
              <input
                type="radio"
                onClick={() => playMedia(url)}
                className={classes.audioplay__btn}
                name="play"
              />
            </div>
          </div>
        </li>
      );
    }
  );
  return (
    <div className={classes.audiocontent}>
      <div className={classes.audiocontent__box}>
        <div className={classes.audocontent__card}>
          <div className={classes.auidcontent__img}>
            <Image width={100} height={100} src={url} alt={alt} />
          </div>
          <div className={classes.audiocontent__text}>
            <h2 className={classes.headingPrimary}>{title}</h2>
            <h5 className={classes.headingSecondary}>About</h5>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
        <ul className={classes.track__list}>{selectedPod}</ul>
        <div className={classes.podcast__footer}>Audobook Footer</div>
      </div>
    </div>
  );
  // return <h2>Audio Player Tracks go here</h2>;
};

export default SelectedAudiobook;
