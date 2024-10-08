import { useState, useRef, Fragment } from "react";

import AudioPlayer from ".";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Volume from "./Volulme";
import classes from "./AudioPlayer.module.scss";

const AudioContainer = () => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <Fragment>
      <div className={classes.controllers}>
        <AudioPlayer {...{ audioRef, progressBarRef, setDuration }} />
        <Controls
          {...{ audioRef, duration, progressBarRef, setTimeProgress }}
        />
        <ProgressBar
          {...{ audioRef, duration, progressBarRef, timeProgress }}
        />
      </div>
      <div className={classes.controllers}>
        <Volume {...{ audioRef }} />
      </div>
    </Fragment>
  );
};

export default AudioContainer;
