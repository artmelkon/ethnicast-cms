import Link from "next/link";

import classes from "./index.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={classes.audioplayer}>
      <audio controls autoPlay>
        <source
          src="https://anchor.fm/s/8b1ede4/podcast/play/83036226/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2024-1-22%2F14248e63-a1e9-8900-f16a-ca02c965e4bb.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default Footer;
