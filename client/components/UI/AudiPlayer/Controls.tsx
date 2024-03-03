import { useState, useEffect, useCallback, useRef } from "react";
import {
  MdPlayArrow,
  MdOutlinePause,
  MdOutlineReplay10,
  MdForward10,
  MdVolumeDown,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import classes from "./AudioPlayer.module.scss";

const Controls = ({ audioRef, duration, progressBarRef, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muteVolume, setMuteVolume] = useState(false);
  const [volume, setVolume] = useState(60);
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
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muteed = muteVolume;
    }
  }, [volume, muteVolume, audioRef]);
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
    <div className={classes.controls}>
      <div className={classes.controls__container}>
        <button onClick={playBack}>
          <MdOutlineReplay10 />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <MdOutlinePause /> : <MdPlayArrow />}
        </button>
        <button onClick={playForward}>
          <MdForward10 />
        </button>
      </div>
      <div className={classes.volume}>
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <MdVolumeOff />
          ) : volume < 40 ? (
            <MdVolumeDown />
          ) : (
            <MdVolumeUp />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
            width: "40px",
          }}
          className={classes.volume__input}
        />
      </div>
    </div>
  );
};

export default Controls;
