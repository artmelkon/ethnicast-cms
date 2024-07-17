import { useContext } from "react";
import { MediaContext } from "../../../context/media-context";

interface CurrentMedia {
  currentMedia: string;
}

const AudioPlayer: React.FC<any> = ({
  audioRef,
  progressBarRef,
  setDuration,
}) => {
  const { currentMedia } = useContext<CurrentMedia>(MediaContext);

  function onLoadedMetadata() {
    console.log("audio ref ", audioRef.current.src);

    const seconds: number = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <audio
      src={currentMedia}
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
    />
  );
};

export default AudioPlayer;
