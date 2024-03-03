import classes from "./AudioPlayer.module.scss";

const AudioPlayer = ({
  audioRef,
  progressBarRef,
  setDuration,
}) => {
  const currentMedia =
    "https://anchor.fm/s/8b1ede4/podcast/play/83375768/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-1-29%2F667825f0-26f6-2e25-fe49-7e61af5cffb1.mp3";

  function onLoadedMetadata() {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <div className={classes.player}>
      <audio
        src={currentMedia}
        className={classes.player__audio}
        // type={rssType}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
};

export default AudioPlayer;
