import { useContext, useState, useRef } from "react";
import { MdPlayArrow, MdOutlinePause, MdFilterList } from "react-icons/md";

import { MediaContext } from "../../../context/media-context";
import classes from "./index.module.scss";

const SelectedAudiobook = ({ data }: any) => {
  console.log("audobook data: ", data);

  // const { playMedia } = useContext(MediaContext);
  // const { author: {authorName, description},title, publisher_data: {boockCover: {url, alt}}, rawPlaylistTracks, description } = data;
  // console.log("parsed feed ", parsedFeed.language);

  // const selectedPod = parsedFeed.items.map((item: string, i: number) => (
  //   <li key={i} className={classes.episodes__item}>
  //     <div className={classes.episode}>
  //       <div className={classes.episode__img}>
  //         <img src={item.itunes.image} alt={item} />
  //       </div>
  //       <div className={classes.episode__text}>
  //         <h4 className={classes.episode__title}>{item.title}</h4>
  //         <div
  //           className={classes.episode__subText}
  //           dangerouslySetInnerHTML={{ __html: item.content }}
  //         ></div>
  //         <input
  //           type="radio"
  //           onClick={() => playMedia(item.enclosure.url)}
  //           className={classes.audioplay__btn}
  //           name="play"
  //         />
  //       </div>
  //     </div>
  //   </li>
  // ));
  // return (
  //   <div className={classes.audiocontent}>
  //     <div className={classes.audiocontent__box}>
  //       <div className={classes.audocontent__card}>
  //         <div className={classes.auidcontent__img}>
  //           <img src={image.url} alt={title} />
  //         </div>
  //         <div className={classes.podcaster__text}>
  //           <h6>Podcast</h6>
  //           <h2 className={classes.headingPrimary}>{title}</h2>
  //           <h5 className={classes.headingSecondary}>About</h5>
  //           <p dangerouslySetInnerHTML={{ __html: description }}></p>
  //         </div>
  //       </div>
  //       <ul className={classes.episodes__list}>{parsedFeed && selectedPod}</ul>
  //       <div className={classes.podcast__footer}>Podcast Footer</div>
  //     </div>
  //   </div>
  // );
  return <h2>Audio Player Tracks go here</h2>;
};

export default SelectedAudiobook;
