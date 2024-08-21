import { useState, useEffect } from "react";
import { MdVolumeDown, MdVolumeUp, MdVolumeOff } from "react-icons/md";
import classes from "./AudioPlayer.module.scss";

const Volume = ({ audioRef }: {audioRef: any}) => {
  const [muteVolume, setMuteVolume] = useState(false);
  const [volume, setVolume] = useState(60);
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muteed = muteVolume;
    }
  }, [volume, muteVolume, audioRef]);

  return (
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
        onChange={(e: any) => setVolume(e.target.value)}
        style={{
          backgroundImage: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
        }}
        className={classes["controller__volume-input"]}
      />
    </div>
  );
};

export default Volume;
