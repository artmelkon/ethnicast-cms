import AudioContainer from "@component/UI/AudiPlayer/AudioContainer";
import classes from "./index.module.scss";

const Footer: React.FC = () => {

  return (
    <div className={classes.footer__cnt}>
      <AudioContainer />
    </div>
  );
};

export default Footer;
