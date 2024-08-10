import { useState,} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./profile-form.module.scss";

interface ResetInput {
  oldPassword: string;
  newPassword: string;
}

interface Props {
  onChangePassword: () => void;
}

const ProfileForm = ({ onChangePassword }) => {
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const errorMessages = {
    required: {
      value: true,
      message: "This field is required!",
    },
    minLength: {
      value: 4,
      message: "Password must be at least 8 character long!",
    },
    maxLength: {
      value: 36,
      message: "Passowd can't exid 36 character",
    },
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<ResetInput> = (data) => {

    if (data.newPassword.trim() === data.oldPassword.trim()) {
      return null;
    }
    onChangePassword(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          {...register("oldPassword", errorMessages)}
        />
      </div>
      {errors.oldPassword && <span>{errors.oldPassword.message}</span>}

      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          {...register("newPassword", errorMessages)}
        />
        {errors.newPassword && <span>{errors.newPassword.message}</span>}
      </div>
      <div className={classes.action}>
        <button
          onClick={() => {
            if (watch("newPassword") !== "" && watch("oldPassword") !== "") {
              if (watch("newPassword") === watch("oldPassword")) {
                return setIsPasswordSame(true);
              }
            }
            setIsPasswordSame(false)
          }}
        >
          Change Password
        </button>
      </div>
      {isPasswordSame && <h3>Passwords must be different!</h3>}
    </form>
  );
};

export default ProfileForm;
