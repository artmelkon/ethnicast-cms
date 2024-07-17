import { Fragment } from "react";

import Advertising from '../UI/Advertising';
import AudioContainer from "@component/UI/AudiPlayer/AudioContainer";
// import Volume from '@component/UI/AudiPlayer/Volulme';
import classes from "./index.module.scss";

const Footer: React.FC = () => {

  return (
    <div className={classes.footer__container}>
      <Advertising />
      <AudioContainer />
    </div>
  );
};

export default Footer;
