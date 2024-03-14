import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import {
  MdPlayArrow,
  MdOutlinePause,
  MdOutlineReplay10,
  MdForward10,
} from "react-icons/md";
import classes from "./AudioPlayer.module.scss";

const Controls = ({ audioRef, duration, progressBarRef, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);
  }
  function playBack() {
    audioRef.current.currentTime -= 10;
  }
  function playForward() {
    audioRef.current.currentTime += 10;
  }
  return (
    <div className={classes.controllers__wrapper}>
      <div className={classes.controler}>
        <button onClick={playBack}>
          <MdOutlineReplay10 />
        </button>
      </div>
      <div className={classes.controler}>
        <button onClick={togglePlayPause}>
          {isPlaying ? <MdOutlinePause /> : <MdPlayArrow />}
        </button>
      </div>
      <div className={classes.controler}>
        <button onClick={playForward}>
          <MdForward10 />
        </button>
      </div>
    </div>
  );
};

export default Controls;
