import classes from "./AudioPlayer.module.scss";
const ProgressBar = ({
  audioRef,
  duration,
  progressBarRef,
  timeProgress,
}: any) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "0:00";
  }

  return (
    <div className={classes.progress}>
      <span
        className={`${classes.progress__time} ${classes.progress__current}`}
      >
        {formatTime(timeProgress)}
      </span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className={classes.progress__time}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
