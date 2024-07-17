import { useContext, useState, useEffect, useRef } from "react";
// import { MdPlayArrow, MdOutlinePause, MdFilterList } from "react-icons/md";
import _ from "lodash";
import Image from "next/image";

import { MediaContext } from "../../../context/media-context";
import classes from "./index.module.scss";

const SelectedAudiobook: React.FC<any> = ({ data }) => {
  console.log("selected audobook data: ", data);

  const { playMedia } = useContext(MediaContext);
  const {
    id,
    author_data: { description },
    title,
    publisher_data: {
      bookCover: { url, alt },
    },
    rawPlaylistTracks,
  } = data;
  console.log("audiobook id: ", id);
  // const fetcher = (url: string) =>
  //   fetch(url, {
  //     credentials: "include",
  //     headers: {
  //       "Contyent-Type": "application/json",
  //       Authorization: `JWT ${token}`,
  //     },
  //   }).then((res) => res.json());
  // const result = useSWR(
  //   `${process.env.CMS_URI}/api/audiobooks/${dataId}`,
  //   fetcher
  // );
  // console.log("audiobook daata: ", data);
  // const {
  //   author_data: { authorName, description },
  //   title,
  //   publisher_data: {
  //     bookCover: { url, alt },
  //   },
  //   rawPlaylistTracks,
  // } = data;
  // console.log("selected audiobood data: ", data);

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
};

export default SelectedAudiobook;
